import { PassengerRepository } from '../../../domain/repositories/passenger.repository';
import { GetAllPassengersUseCaseResponseDto } from './getAllPassengers.useCase.response.dto';
import { Injectable } from '../../../shared/injectable';

@Injectable()
export class GetAllPassengersUseCase {
  constructor(private passengerRepository: PassengerRepository) {}

  async execute(): Promise<GetAllPassengersUseCaseResponseDto> {
    const passengers = await this.passengerRepository.getAllAsync();

    return {
      passengers: passengers.map((i) => {
        const passenger = i.toValue();

        return {
          id: passenger.id,
          person: {
            firstName: passenger.person.firstName,
            lastName: passenger.person.lastName,
            latitude: passenger.person.latitude,
            longitude: passenger.person.longitude,
            middleName: passenger.person.middleName,
            secondLastName: passenger.person.secondLastName,
          },
        };
      }),
    };
  }
}
