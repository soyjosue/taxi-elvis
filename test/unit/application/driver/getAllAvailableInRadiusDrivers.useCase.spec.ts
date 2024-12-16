/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetAllAvailableDriversInRadiusUseCase } from '../../../../src/application/driver/getAllAvailableInRadius/getAllAvailableInRadiusDrivers.useCase';
import { DriverStatus } from '../../../../src/domain/enums/driverStatus.enum';
import { Test, TestingModule } from '@nestjs/testing';
import { DriverRepository } from '../../../../src/domain/repositories/driver.repository';
import { GetAllAvailableInRadiusDriversUseCaseRequestDto } from '../../../../src/application/driver/getAllAvailableInRadius/getAllAvailableInRadiusDrivers.useCase.request.dto';
import { GetAllAvailableInRadiusDriversUseCaseResponseDto } from '../../../../src/application/driver/getAllAvailableInRadius/getAllAvailableInRadiusDrivers.useCase.response.dto';

class MockDriverRepository {
  getAvailableInRadiusAsync(
    latitude: number,
    longitude: number,
    radius: number,
  ) {
    return [
      {
        toValue: () => ({
          id: 'fb19d138-a320-476e-8680-78e0e3492ff3',
          status: DriverStatus.Available,
          person: {
            firstName: 'Lucia',
            lastName: 'Garcia',
            latitude: 18.525588,
            longitude: -69.776349,
          },
        }),
      },
    ];
  }
}

describe('GetAllAvailableDriversInRadiusUseCase', () => {
  let getAllAvailableDriversInRadiusUseCase: GetAllAvailableDriversInRadiusUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllAvailableDriversInRadiusUseCase,
        { provide: DriverRepository, useClass: MockDriverRepository },
      ],
    }).compile();

    getAllAvailableDriversInRadiusUseCase =
      module.get<GetAllAvailableDriversInRadiusUseCase>(
        GetAllAvailableDriversInRadiusUseCase,
      );
  });

  it('should return drivers in the correct format', async () => {
    const dto: GetAllAvailableInRadiusDriversUseCaseRequestDto = {
      latitude: 18.5255876,
      longitude: -69.776349,
    };

    const result: GetAllAvailableInRadiusDriversUseCaseResponseDto =
      await getAllAvailableDriversInRadiusUseCase.execute(dto);

    expect(result.drivers[0]).toHaveProperty(
      'id',
      'fb19d138-a320-476e-8680-78e0e3492ff3',
    );
    expect(result.drivers[0].status).toBe(DriverStatus.Available);
    expect(result.drivers[0].person).toHaveProperty('firstName', 'Lucia');
    expect(result.drivers[0].person).toHaveProperty('lastName', 'Garcia');
    expect(result.drivers[0].person).toHaveProperty('latitude', 18.525588);
    expect(result.drivers[0].person).toHaveProperty('longitude', -69.776349);
  });
});
