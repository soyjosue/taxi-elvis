import { DriverRepository } from 'src/domain/repositories/driver.repository';
import { GetByIdDriverUseCaseRequestDto } from './getDriverById.useCase.request.dto';
import { getByIdDriverUseCaseResponseDto } from './getDriverById.useCase.response.dto';
import { Injectable } from 'src/shared/injectable';

@Injectable()
export class GetByIdDriverUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(
    dto: GetByIdDriverUseCaseRequestDto,
  ): Promise<getByIdDriverUseCaseResponseDto> {
    const driver = await this.driverRepository.getByIdAsync(dto.id);

    const primitiveDriver = driver.toValue();

    return {
      driver: {
        id: primitiveDriver.id,
        status: primitiveDriver.status,
        person: {
          firstName: primitiveDriver.person.firstName,
          lastName: primitiveDriver.person.lastName,
          latitude: primitiveDriver.person.latitude,
          longitude: primitiveDriver.person.longitude,
          middleName: primitiveDriver.person.middleName,
          secondLastName: primitiveDriver.person.secondLastName,
        },
      },
    };
  }
}
