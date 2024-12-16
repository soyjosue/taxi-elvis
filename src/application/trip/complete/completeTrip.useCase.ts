import { TripRepository } from '../../../domain/repositories/trip.repository';
import { CompleteTripUseCaseRequestDto as RequestDto } from './completeTrip.useCase.request.dto';
import { CompleteTripUseCaseResponseDto as ResponseDto } from './completeTrip.useCase.response.dto';
import { Trip } from '../../../domain/entities/Trip';
import { TripNotFoundException } from '../../../domain/exceptions/trip/tripNotFoundException';
import { TripAlreadyCompletedException } from '../../../domain/exceptions/trip/tripAlreadyCompletedException';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompleteTripUseCase {
  constructor(private tripRepository: TripRepository) {}

  async execute(dto: RequestDto): Promise<ResponseDto> {
    const trip: Trip = await this.tripRepository.getByIdAsync(dto.id);

    if (!trip) throw new TripNotFoundException(dto.id);

    if (trip.isCompleted()) throw new TripAlreadyCompletedException(dto.id);

    const tripCompleted = (
      await this.tripRepository.completeAsync(dto.id)
    ).toValue();

    return {
      trip: {
        id: tripCompleted.id,
        driver: {
          id: tripCompleted.driver.id,
          person: {
            firstName: tripCompleted.driver.person.firstName,
            middleName: tripCompleted.driver.person.middleName,
            lastName: tripCompleted.driver.person.lastName,
            secondLastName: tripCompleted.driver.person.secondLastName,
          },
        },
        passenger: {
          id: tripCompleted.passenger.id,
          person: {
            firstName: tripCompleted.passenger.person.firstName,
            middleName: tripCompleted.passenger.person.middleName,
            lastName: tripCompleted.passenger.person.lastName,
            secondLastName: tripCompleted.passenger.person.secondLastName,
          },
        },
        endPositionLatitude: tripCompleted.endPositionLatitude,
        endPositionLongitude: tripCompleted.endPositionLongitude,
        startDate: tripCompleted.startDate,
        endDate: tripCompleted.endDate,
        startPositionLatitude: tripCompleted.startPositionLatitude,
        startPositionLongitude: tripCompleted.startPositionLongitude,
        status: tripCompleted.status,
      },
    };
  }
}
