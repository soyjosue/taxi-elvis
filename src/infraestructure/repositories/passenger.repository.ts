import { InjectRepository } from '@nestjs/typeorm';
import { Passenger } from 'src/domain/entities/Passenger';
import { PassengerRepository } from 'src/domain/repositories/passenger.repository';
import { PassengerEntity } from '../entities/passenger.entity';
import { In, Repository } from 'typeorm';
import { PassengerNotFoundException } from 'src/domain/exceptions/passenger/passengerNotFoundException';
import { DistanceService } from 'src/domain/services/distance.service';
import { DriverEntity } from '../entities/driver.entity';
import { DriverStatus } from 'src/domain/enums/driverStatus.enum';
import { Driver } from 'src/domain/entities/Driver';
import { TripStatus } from 'src/domain/enums/TripStatus.enum';

export class PassengerDbRepository implements PassengerRepository {
  constructor(
    @InjectRepository(PassengerEntity)
    private passengerRepository: Repository<PassengerEntity>,
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    private distanceService: DistanceService,
  ) {}

  async isOnATripAsync(id: string): Promise<boolean> {
    const passenger = await this.passengerRepository.findOne({
      where: {
        id: id,
      },
      relations: ['trips'],
      select: {
        trips: {
          status: true,
        },
      },
    });

    if (!passenger) throw new PassengerNotFoundException(id);

    const inProgressTrips = passenger.trips.filter(
      (i) => i.status == TripStatus.InProgress,
    );

    return inProgressTrips.length > 0;
  }

  async getClosestDriversAsync(
    id: string,
    driverCount: number,
  ): Promise<{ driver: Driver; distance: number }[]> {
    const passenger = await this.passengerRepository.findOne({
      where: {
        id: id,
      },
      relations: ['person'],
      select: {
        person: {
          latitude: true,
          longitude: true,
        },
      },
    });

    if (!passenger) {
      throw new PassengerNotFoundException(id);
    }

    const drivers = await this.driverRepository.find({
      where: {
        status: DriverStatus.Available,
      },
      relations: ['person'],
      select: {
        id: true,
        person: {
          latitude: true,
          longitude: true,
        },
      },
    });

    const driversDistance: {
      id: string;
      distance: number;
    }[] = drivers.map((i) => {
      return {
        id: i.id,
        distance: this.distanceService.calculateDistance(
          {
            lat: passenger.person.latitude,
            lng: passenger.person.longitude,
          },
          {
            lat: i.person.latitude,
            lng: i.person.longitude,
          },
        ),
      };
    });

    const closestDrivers = driversDistance
      .sort((a, b) => {
        return a.distance - b.distance;
      })
      .slice(0, driverCount);

    const closestDriversDb = await this.driverRepository.find({
      where: {
        id: In(closestDrivers.map((i) => i.id)),
      },
      relations: ['person'],
    });

    return closestDriversDb.map((driver) => ({
      driver: new Driver(driver),
      distance: closestDrivers.filter((i) => i.id == driver.id)[0].distance,
    }));
  }

  async getAllAsync(): Promise<Passenger[]> {
    return (
      await this.passengerRepository.find({
        relations: ['person'],
      })
    ).map((i) => new Passenger(i));
  }

  async getByIdAsync(id: string): Promise<Passenger> {
    const passenger = await this.passengerRepository.findOne({
      where: {
        id: id,
      },
      relations: ['person'],
    });

    if (!passenger) {
      throw new PassengerNotFoundException(id);
    }

    return new Passenger(passenger);
  }
}
