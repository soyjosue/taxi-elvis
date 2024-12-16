import { Test, TestingModule } from '@nestjs/testing';
import { GetAllDriversUseCase } from '../../../../src/application/driver/getAll/getAllDrivers.useCase';
import { GetAllDriversUseCaseResponseDto } from '../../../../src/application/driver/getAll/getAllDrivers.useCase.response.dto';
import { DriverRepository } from '../../../../src/domain/repositories/driver.repository';

class MockDriverRepository {
  getAllAsync() {
    return [
      {
        toValue: () => ({
          id: 'fb19d138-a320-476e-8680-78e0e3492ff3',
          status: 'Available',
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

describe('GetAllDriversUseCase', () => {
  let getAllDriversUseCase: GetAllDriversUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllDriversUseCase,
        { provide: DriverRepository, useClass: MockDriverRepository },
      ],
    }).compile();

    getAllDriversUseCase =
      module.get<GetAllDriversUseCase>(GetAllDriversUseCase);
  });

  it('should call driverRepository.getAllAsync() and return formatted data', async () => {
    const result: GetAllDriversUseCaseResponseDto =
      await getAllDriversUseCase.execute();

    expect(result).toHaveProperty('drivers');
    expect(result.drivers.length).toBeGreaterThan(0);
    expect(result.drivers[0]).toHaveProperty(
      'id',
      'fb19d138-a320-476e-8680-78e0e3492ff3',
    );
    expect(result.drivers[0]).toHaveProperty('status', 'Available');
    expect(result.drivers[0].person).toHaveProperty('firstName', 'Lucia');
    expect(result.drivers[0].person).toHaveProperty('lastName', 'Garcia');
    expect(result.drivers[0].person).toHaveProperty('latitude', 18.525588);
    expect(result.drivers[0].person).toHaveProperty('longitude', -69.776349);
  });
});
