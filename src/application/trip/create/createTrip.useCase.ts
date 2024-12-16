import { TripRepository } from '../../../domain/repositories/trip.repository';

import { CreateTripUseCaseRequestDto as RequestDto } from './createTrip.useCase.request.dto';
import { CreateTripUseCaseResponseDto as ResponseDto } from './createTrip.useCase.response.dto';
import { PassengerRepository } from '../../../domain/repositories/passenger.repository';
import { DriverRepository } from '../../../domain/repositories/driver.repository';
import { PassengerNotFoundException } from '../../../domain/exceptions/passenger/passengerNotFoundException';
import { DriverNotFoundException } from '../../../domain/exceptions/driver/driverNotFoundException';
import { DriverUnavailableException } from '../../../domain/exceptions/driver/driverUnavailableException';
import { Trip } from '../../../domain/entities/Trip';
import { Passenger } from '../../../domain/entities/Passenger';
import { Driver } from '../../../domain/entities/Driver';
import { Injectable } from '../../../shared/injectable';
import { PassengerAlreadyInAnotherTripException } from '../../../domain/exceptions/passenger/passengerAlreadyInAnotherTripException';
import { PrimitivePerson } from '../../../domain/entities/Person';
import { DistanceService } from '../../../domain/services/distance.service';
import { ZeroDistanceTripException } from '../../../domain/exceptions/trip/ZeroDistanceTripException';

@Injectable()
export class CreateTripUseCase {
  constructor(
    private tripRepository: TripRepository,
    private passengerRepository: PassengerRepository,
    private driverRepository: DriverRepository,
    private distanceService: DistanceService,
  ) {}

  async execute(dto: RequestDto): Promise<ResponseDto> {
    const passenger: Passenger = await this.passengerRepository.getByIdAsync(
      dto.passengerId,
    );

    if (!passenger) throw new PassengerNotFoundException(dto.passengerId);

    if (await this.passengerRepository.isOnATripAsync(dto.passengerId))
      throw new PassengerAlreadyInAnotherTripException(dto.passengerId);

    const driver: Driver = await this.driverRepository.getByIdAsync(
      dto.driverId,
    );

    if (!driver) throw new DriverNotFoundException(dto.driverId);

    if (!driver.isAvailable())
      throw new DriverUnavailableException(dto.driverId);

    if (
      this.calculateDistance(
        passenger.toValue().person,
        dto.destinationLatitude,
        dto.destinationLongitude,
      ) == 0
    )
      throw new ZeroDistanceTripException();

    const newTrip: Trip = Trip.create({
      passenger: passenger,
      driver: driver,
      endPositionLatitude: dto.destinationLatitude,
      endPositionLongitude: dto.destinationLongitude,
      startPositionLatitude: passenger.toValue().person.latitude,
      startPositionLongitude: passenger.toValue().person.longitude,
    });

    driver.markAsUnavailable();

    const trip = (await this.tripRepository.createAsync(newTrip)).toValue();
    return {
      trip: {
        id: trip.id,
        driver: {
          id: trip.driver.id,
          person: {
            firstName: trip.driver.person.firstName,
            middleName: trip.driver.person.middleName,
            lastName: trip.driver.person.lastName,
            secondLastName: trip.driver.person.secondLastName,
          },
        },
        passenger: {
          id: trip.passenger.id,
          person: {
            firstName: trip.passenger.person.firstName,
            middleName: trip.passenger.person.middleName,
            lastName: trip.passenger.person.lastName,
            secondLastName: trip.passenger.person.secondLastName,
          },
        },
        endPositionLatitude: trip.endPositionLatitude,
        endPositionLongitude: trip.endPositionLongitude,
        startDate: trip.startDate,
        startPositionLatitude: trip.startPositionLatitude,
        startPositionLongitude: trip.startPositionLongitude,
        status: trip.status,
      },
    };
  }

  private calculateDistance(
    person: PrimitivePerson,
    destinationLatitude: number,
    destinationLongitude: number,
  ): number {
    return this.distanceService.calculateDistance(
      { lat: person.latitude, lng: person.longitude },
      { lat: destinationLatitude, lng: destinationLongitude },
    );
  }
}
