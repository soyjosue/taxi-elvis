import { Test, TestingModule } from '@nestjs/testing';
import { GetAllAvailableDriversUseCase } from './../../../../src/application/driver/getAllAvailable/getAllAvailableDrivers.useCase';
import { DriverStatus } from './../../../../src/domain/enums/driverStatus.enum';
import { DriverRepository } from './../../../../src/domain/repositories/driver.repository';

class MockDriverRepository {
  getByStatusAsync(status: DriverStatus) {
    return [
      {
        toValue: () => ({
          id: 'bfb7a311-8d26-456a-b03c-9dd418d26df6',
          status: DriverStatus.Available,
          person: {
            firstName: 'Carlos',
            middleName: null,
            lastName: 'Gomez',
            secondLastName: 'Santos',
            latitude: '18.490000',
            longitude: '-69.940000',
          },
        }),
      },
      {
        toValue: () => ({
          id: '371533af-1a52-4cd7-ae0a-2bce3f822e3d',
          status: DriverStatus.Available,
          person: {
            firstName: 'Ana',
            middleName: 'Cecilia',
            lastName: 'Fernandez',
            secondLastName: null,
            latitude: '18.493000',
            longitude: '-69.925000',
          },
        }),
      },
      {
        toValue: () => ({
          id: '9b88a09c-c8c7-4c39-af6e-4b706f2a60af',
          status: DriverStatus.Unavailable,
          person: {
            firstName: 'Pedro',
            middleName: null,
            lastName: 'Martinez',
            secondLastName: 'Rojas',
            latitude: '18.482000',
            longitude: '-69.920000',
          },
        }),
      },
    ].filter((i) => i.toValue().status == status);
  }
}

describe('GetAllAvailableDriversUseCase', () => {
  let getAllAvailableDriversUseCase: GetAllAvailableDriversUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllAvailableDriversUseCase,
        { provide: DriverRepository, useClass: MockDriverRepository },
      ],
    }).compile();

    getAllAvailableDriversUseCase = module.get<GetAllAvailableDriversUseCase>(
      GetAllAvailableDriversUseCase,
    );
  });

  it('should call driverRepository.getByStatusAsync() with DriverStatus Available and return formatted data', async () => {
    const result = await getAllAvailableDriversUseCase.execute();

    expect(result).toHaveProperty('drivers');
    expect(result.drivers.length).toBe(2);
    expect(result.drivers[0]).toHaveProperty(
      'id',
      'bfb7a311-8d26-456a-b03c-9dd418d26df6',
    );
    expect(result.drivers[1]).toHaveProperty(
      'id',
      '371533af-1a52-4cd7-ae0a-2bce3f822e3d',
    );
    expect(result.drivers[0].status).toBe(DriverStatus.Available);
    expect(result.drivers[1].status).toBe(DriverStatus.Available);

    expect(result.drivers[0].person).toHaveProperty('firstName', 'Carlos');
    expect(result.drivers[0].person).toHaveProperty('lastName', 'Gomez');
    expect(result.drivers[1].person).toHaveProperty('firstName', 'Ana');
    expect(result.drivers[1].person).toHaveProperty('lastName', 'Fernandez');
  });
});
