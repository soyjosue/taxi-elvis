import { PassengerRepository } from '../../../domain/repositories/passenger.repository';

import { GetClosestDriversUseCaseRequestDto as RequestDto } from './getClosestDriversByPassenger.useCase.request.dto';
import { GetClosestDriversUseCaseResponseDto as ResponseDto } from './getClosestDriversByPassenger.useCase.response.dto';
import { Injectable } from '../../../shared/injectable';

@Injectable()
export class GetClosestDriversByPassengerUseCase {
  constructor(private passengerRepository: PassengerRepository) {}

  async execute(dto: RequestDto): Promise<ResponseDto> {
    const drivers = await this.passengerRepository.getClosestDriversAsync(
      dto.passengerId,
      3,
    );

    return {
      drivers: drivers.map((driver) => {
        const {
          id,
          person: {
            firstName,
            middleName,
            lastName,
            secondLastName,
            latitude,
            longitude,
          },
        } = driver.driver.toValue();
        return {
          id: id,
          person: {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            secondLastName: secondLastName,
            latitude: latitude,
            longitude: longitude,
          },
          distanceInKm: driver.distance,
        };
      }),
    };
  }
}
