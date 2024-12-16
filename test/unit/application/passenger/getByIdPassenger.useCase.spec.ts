import { Test, TestingModule } from '@nestjs/testing';
import { PassengerRepository } from '../../../../src/domain/repositories/passenger.repository';
import { Passenger } from '../../../../src/domain/entities/Passenger';
import { GetByIdPassengerUseCase } from '../../../../src/application/passenger/getById/getByIdPassenger.useCase';
import { GetByIdPassengerUseCaseResponseDto } from '../../../../src/application/passenger/getById/getByIdPassenger.useCase.response.dto';

class MockPassengerRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getByIdAsync(id: string) {
    return [];
  }
}

describe('GetByIdPassengerUseCase', () => {
  let getByIdPassengerUseCase: GetByIdPassengerUseCase;
  let passengerRepository: PassengerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetByIdPassengerUseCase,
        { provide: PassengerRepository, useClass: MockPassengerRepository },
      ],
    }).compile();

    getByIdPassengerUseCase = module.get<GetByIdPassengerUseCase>(
      GetByIdPassengerUseCase,
    );
    passengerRepository = module.get<PassengerRepository>(PassengerRepository);
  });

  it('should call passengerRepository.getByIdAsync() and return formatted data', async () => {
    const spy = jest
      .spyOn(passengerRepository, 'getByIdAsync')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementation((id: string) =>
        Promise.resolve(
          new Passenger({
            id: '592ed77e-f1b3-4f33-a00a-71d7f41518d0',
            person: {
              firstName: 'Gabriel',
              lastName: 'Mora',
              latitude: 18.4935,
              longitude: -69.9315,
            },
            trips: [],
          }),
        ),
      );
    const result: GetByIdPassengerUseCaseResponseDto =
      await getByIdPassengerUseCase.execute({
        id: '592ed77e-f1b3-4f33-a00a-71d7f41518d0',
      });

    expect(spy).toHaveBeenCalled();

    expect(result.passenger.person).toHaveProperty('firstName', 'Gabriel');
    expect(result.passenger.person).toHaveProperty('lastName', 'Mora');
    expect(result.passenger.person).toHaveProperty('latitude', 18.4935);
    expect(result.passenger.person).toHaveProperty('longitude', -69.9315);
  });
});
