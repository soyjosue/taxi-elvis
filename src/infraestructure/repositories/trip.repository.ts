import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from 'src/domain/entities/Trip';
import { TripRepository } from 'src/domain/repositories/trip.repository';
import { TripEntity } from '../entities/trip.entity';
import { Repository } from 'typeorm';
import { TripNotFoundException } from 'src/domain/exceptions/trip/tripNotFoundException';
import { DriverEntity } from '../entities/driver.entity';
import { DriverStatus } from 'src/domain/enums/driverStatus.enum';
import { TripStatus } from 'src/domain/enums/TripStatus.enum';
import { PersonEntity } from '../entities/person.entity';
import { Invoice } from 'src/domain/entities/Invoice';
import { DistanceService } from 'src/domain/services/distance.service';
import { InvoiceEntity } from '../entities/Invoice.entity';

export class TripDbRepository implements TripRepository {
  constructor(
    @InjectRepository(TripEntity)
    private tripRepository: Repository<TripEntity>,
    private distanceService: DistanceService,
  ) {}

  async getInProgressAsync(): Promise<Trip[]> {
    const trips = await this.tripRepository.find({
      where: {
        status: TripStatus.InProgress,
      },
      relations: ['driver', 'driver.person', 'passenger', 'passenger.person'],
    });

    return trips.map((i) => new Trip(i));
  }

  async completeAsync(id: string): Promise<Trip> {
    const queryRunner =
      this.tripRepository.manager.connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      const entityManager = queryRunner.manager;

      const driverRepository = entityManager.getRepository(DriverEntity);
      const personRepository = entityManager.getRepository(PersonEntity);
      const tripRepository = entityManager.getRepository(TripEntity);

      const trip: TripEntity = await entityManager
        .getRepository(TripEntity)
        .findOne({
          where: {
            id: id,
          },
          relations: [
            'driver',
            'driver.person',
            'passenger',
            'passenger.person',
          ],
        });

      const invoice = Invoice.create({
        trip: new Trip(trip),
        distance: this.distanceService.calculateDistance(
          { lat: trip.startPositionLatitude, lng: trip.startPositionLongitude },
          { lat: trip.endPositionLatitude, lng: trip.endPositionLongitude },
        ),
      });

      driverRepository.merge(trip.driver, {
        status: DriverStatus.Available,
      });
      personRepository.merge(trip.driver.person, {
        latitude: trip.endPositionLatitude,
        longitude: trip.endPositionLongitude,
      });

      personRepository.merge(trip.passenger.person, {
        latitude: trip.endPositionLatitude,
        longitude: trip.endPositionLongitude,
      });

      tripRepository.merge(trip, {
        endDate: new Date(),
        status: TripStatus.Completed,
      });

      await entityManager.save(DriverEntity, trip.driver);
      await entityManager.save(PersonEntity, trip.driver.person);
      await entityManager.save(PersonEntity, trip.passenger.person);
      await entityManager.save(TripEntity, trip);
      await entityManager.save(InvoiceEntity, invoice.toValue());

      await queryRunner.commitTransaction();

      return new Trip(await this.tripRepository.save(trip));
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async createAsync(data: Trip): Promise<Trip> {
    const queryRunner =
      this.tripRepository.manager.connection.createQueryRunner();

    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(DriverEntity, data.toValue().driver);

      const trip = await queryRunner.manager.save(TripEntity, data.toValue());

      await queryRunner.commitTransaction();

      return new Trip(await this.tripRepository.save(trip));
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getByIdAsync(id: string): Promise<Trip> {
    const trip = await this.tripRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!trip) throw new TripNotFoundException(id);

    return new Trip(trip);
  }
}
