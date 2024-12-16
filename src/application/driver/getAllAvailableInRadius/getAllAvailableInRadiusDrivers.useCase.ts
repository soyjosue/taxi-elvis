import { Injectable } from '../../../shared/injectable';
import { DriverRepository } from '../../../domain/repositories/driver.repository';

import { GetAllAvailableInRadiusDriversUseCaseResponseDto } from './getAllAvailableInRadiusDrivers.useCase.response.dto';
import { GetAllAvailableInRadiusDriversUseCaseRequestDto } from './getAllAvailableInRadiusDrivers.useCase.request.dto';

@Injectable()
export class GetAllAvailableDriversInRadiusUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(
    dto: GetAllAvailableInRadiusDriversUseCaseRequestDto,
  ): Promise<GetAllAvailableInRadiusDriversUseCaseResponseDto> {
    const drivers = await this.driverRepository.getAvailableInRadiusAsync(
      dto.latitude,
      dto.longitude,
      3,
    );

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
