import { PassengerRepository } from '../../../domain/repositories/passenger.repository';
import { GetByIdPassengerUseCaseResponseDto } from './getByIdPassenger.useCase.response.dto';
import { GetByIdPassengerUseCaseRequestDto } from './getByIdPassenger.useCase.request.dto';
import { Injectable } from '../../../shared/injectable';

@Injectable()
export class GetByIdPassengerUseCase {
  constructor(private passengerRepository: PassengerRepository) {}

  async execute(
    dto: GetByIdPassengerUseCaseRequestDto,
  ): Promise<GetByIdPassengerUseCaseResponseDto> {
    const passenger = await this.passengerRepository.getByIdAsync(dto.id);

    const primitivePassenger = passenger.toValue();

    return {
      passenger: {
        id: primitivePassenger.id,
        person: {
          firstName: primitivePassenger.person.firstName,
          lastName: primitivePassenger.person.lastName,
          latitude: primitivePassenger.person.latitude,
          longitude: primitivePassenger.person.longitude,
          middleName: primitivePassenger.person.middleName,
          secondLastName: primitivePassenger.person.secondLastName,
        },
      },
    };
  }
}
