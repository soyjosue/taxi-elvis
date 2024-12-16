import { Test, TestingModule } from '@nestjs/testing';
import { GetAllPassengersUseCase } from '../../../../src/application/passenger/getAll/getAllPassengers.useCase';
import { GetAllPassengersUseCaseResponseDto } from '../../../../src/application/passenger/getAll/getAllPassengers.useCase.response.dto';
import { PassengerRepository } from '../../../../src/domain/repositories/passenger.repository';
import { Passenger } from '../../../../src/domain/entities/Passenger';

class MockPassengerRepository {
  getAllAsync() {
    return [];
  }
}

describe('GetAllPassengersUseCase', () => {
  let getAllPassengersUseCase: GetAllPassengersUseCase;
  let passengerRepository: PassengerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllPassengersUseCase,
        { provide: PassengerRepository, useClass: MockPassengerRepository },
      ],
    }).compile();

    getAllPassengersUseCase = module.get<GetAllPassengersUseCase>(
      GetAllPassengersUseCase,
    );
    passengerRepository = module.get<PassengerRepository>(PassengerRepository);
  });

  it('should call passengerRepository.getAllAsync() and return formatted data', async () => {
    const spy = jest
      .spyOn(passengerRepository, 'getAllAsync')
      .mockImplementation(() =>
        Promise.resolve([
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
          new Passenger({
            id: 'e26593a7-e8cc-4e7a-b85a-605a24129a03',
            person: {
              firstName: 'Paola',
              lastName: 'Ramos',
              latitude: 18.4795,
              longitude: -69.9295,
            },
            trips: [],
          }),
        ]),
      );
    const result: GetAllPassengersUseCaseResponseDto =
      await getAllPassengersUseCase.execute();

    expect(spy).toHaveBeenCalled();

    expect(result).toHaveProperty('passengers');
    expect(result.passengers.length).toBe(2);
    expect(result.passengers[0]).toHaveProperty(
      'id',
      '592ed77e-f1b3-4f33-a00a-71d7f41518d0',
    );
    expect(result.passengers[0].person).toHaveProperty('firstName', 'Gabriel');
    expect(result.passengers[0].person).toHaveProperty('lastName', 'Mora');
    expect(result.passengers[0].person).toHaveProperty('latitude', 18.4935);
    expect(result.passengers[0].person).toHaveProperty('longitude', -69.9315);
  });
});
