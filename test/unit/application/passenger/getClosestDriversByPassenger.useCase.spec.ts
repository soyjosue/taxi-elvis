import { Test, TestingModule } from '@nestjs/testing';
import { PassengerRepository } from '../../../../src/domain/repositories/passenger.repository';
import { GetClosestDriversByPassengerUseCase } from '../../../../src/application/passenger/getClosestDriversByPassenger/getClosestDriversByPassenger.useCase';
import { Driver } from '../../../../src/domain/entities/Driver';
import { DriverStatus } from '../../../../src/domain/enums/driverStatus.enum';
import { GetClosestDriversUseCaseResponseDto } from '../../../../src/application/passenger/getClosestDriversByPassenger/getClosestDriversByPassenger.useCase.response.dto';

class MockPassengerRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getClosestDriversAsync(id: string) {
    return [];
  }
}

describe('GetClosestDriversByPassengerUseCase', () => {
  let getClosestDriversByPassengerUseCase: GetClosestDriversByPassengerUseCase;
  let passengerRepository: PassengerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetClosestDriversByPassengerUseCase,
        { provide: PassengerRepository, useClass: MockPassengerRepository },
      ],
    }).compile();

    getClosestDriversByPassengerUseCase =
      module.get<GetClosestDriversByPassengerUseCase>(
        GetClosestDriversByPassengerUseCase,
      );
    passengerRepository = module.get<PassengerRepository>(PassengerRepository);
  });

  it('should call passengerRepository.getClosestDriversAsync() and return formatted data', async () => {
    const spy = jest
      .spyOn(passengerRepository, 'getClosestDriversAsync')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementation((id: string, driverCount: number) =>
        Promise.resolve([
          {
            driver: new Driver({
              id: '592ed77e-f1b3-4f33-a00a-71d7f41518d0',
              person: {
                firstName: 'Gabriel',
                lastName: 'Mora',
                latitude: 18.4935,
                longitude: -69.9315,
              },
              status: DriverStatus.Available,
              trips: [],
            }),
            distance: 10,
          },
        ]),
      );
    const result: GetClosestDriversUseCaseResponseDto =
      await getClosestDriversByPassengerUseCase.execute({
        passengerId: '592ed77e-f1b3-4f33-a00a-71d7f41518d0',
      });

    expect(spy).toHaveBeenCalled();

    expect(result).toHaveProperty('drivers');
    expect(result.drivers.length).toBe(1);
    expect(result.drivers[0]).toHaveProperty(
      'id',
      '592ed77e-f1b3-4f33-a00a-71d7f41518d0',
    );
    expect(result.drivers[0].person).toHaveProperty('firstName', 'Gabriel');
    expect(result.drivers[0].person).toHaveProperty('lastName', 'Mora');
    expect(result.drivers[0].person).toHaveProperty('latitude', 18.4935);
    expect(result.drivers[0].person).toHaveProperty('longitude', -69.9315);
  });
});
