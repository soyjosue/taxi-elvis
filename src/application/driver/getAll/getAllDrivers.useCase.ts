import { Injectable } from '../../../shared/injectable';
import { GetAllDriversUseCaseResponseDto } from './getAllDrivers.useCase.response.dto';
import { DriverRepository } from '../../../domain/repositories/driver.repository';

@Injectable()
export class GetAllDriversUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(): Promise<GetAllDriversUseCaseResponseDto> {
    const drivers = await this.driverRepository.getAllAsync();

    return {
      drivers: drivers.map((i) => {
        const value = i.toValue();

        return {
          id: value.id,
          status: value.status,
          person: {
            firstName: value.person.firstName,
            middleName: value.person.middleName,
            lastName: value.person.lastName,
            secondLastName: value.person.secondLastName,
            latitude: value.person.latitude,
            longitude: value.person.longitude,
          },
        };
      }),
    };
  }
}
