import { Injectable } from '../../../shared/injectable';
import { DriverRepository } from '../../../domain/repositories/driver.repository';
import { GetAllAvailableDriversUseCaseResponseDto } from './getAllAvailableDrivers.useCase.response.dto';
import { DriverStatus } from '../../../domain/enums/driverStatus.enum';

@Injectable()
export class GetAllAvailableDriversUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(): Promise<GetAllAvailableDriversUseCaseResponseDto> {
    const drivers = await this.driverRepository.getByStatusAsync(
      DriverStatus.Available,
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
