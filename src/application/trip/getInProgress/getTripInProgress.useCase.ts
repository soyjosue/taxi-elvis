import { TripRepository } from '../../../domain/repositories/trip.repository';
import { GetTripInProgressUseCaseResponseDto } from './getTripInProgress.useCase.response.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetTripInProgressUseCase {
  constructor(private tripRepository: TripRepository) {}

  async execute(): Promise<GetTripInProgressUseCaseResponseDto> {
    const trips = await this.tripRepository.getInProgressAsync();

    return {
      trips: trips.map((i) => {
        const trip = i.toValue();

        return {
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
        };
      }),
    };
  }
}
