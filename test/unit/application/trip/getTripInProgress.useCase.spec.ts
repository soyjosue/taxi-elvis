import { Test, TestingModule } from '@nestjs/testing';
import { GetTripInProgressUseCase } from '../../../../src/application/trip/getInProgress/getTripInProgress.useCase';
import { TripRepository } from '../../../../src/domain/repositories/trip.repository';

class MockTripRepository {
  getInProgressAsync = jest.fn();
}

describe('GetTripInProgressUseCase', () => {
  let tripRepository: TripRepository;
  let getTripInProgressUseCase: GetTripInProgressUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetTripInProgressUseCase,
        { provide: TripRepository, useClass: MockTripRepository },
      ],
    }).compile();

    tripRepository = module.get<TripRepository>(TripRepository);
    getTripInProgressUseCase = module.get<GetTripInProgressUseCase>(
      GetTripInProgressUseCase,
    );
  });

  it('should call tripRepository.getInProgressAsync() and return formatted data', async () => {
    (tripRepository.getInProgressAsync as jest.Mock).mockResolvedValue([
      {
        toValue: () => ({
          id: '155ec573-8bcb-4de9-b24d-f436287e3c78',
          driver: {
            id: '338a0a41-01e8-4473-a6f0-7de64b47420f',
            person: {
              firstName: 'Maria',
              middleName: 'B.',
              lastName: 'Lopez',
              secondLastName: null,
            },
          },
          passenger: {
            id: '6ee55452-8b8a-4964-a891-bab9858623bc',
            person: {
              firstName: 'Luis',
              middleName: 'A.',
              lastName: 'Torres',
              secondLastName: null,
            },
          },
          endPositionLatitude: '18.456910',
          endPositionLongitude: '-69.966381',
          startDate: '2024-12-16T07:03:10.098Z',
          startPositionLatitude: '18.525588',
          startPositionLongitude: '-69.776349',
          status: 'InProgress',
        }),
      },
    ]);

    const result = await getTripInProgressUseCase.execute();

    expect(result.trips.length).toBe(1);
    expect(result).toMatchObject({
      trips: [
        {
          id: '155ec573-8bcb-4de9-b24d-f436287e3c78',
          driver: {
            id: '338a0a41-01e8-4473-a6f0-7de64b47420f',
            person: {
              firstName: 'Maria',
              middleName: 'B.',
              lastName: 'Lopez',
              secondLastName: null,
            },
          },
          passenger: {
            id: '6ee55452-8b8a-4964-a891-bab9858623bc',
            person: {
              firstName: 'Luis',
              middleName: 'A.',
              lastName: 'Torres',
              secondLastName: null,
            },
          },
          endPositionLatitude: '18.456910',
          endPositionLongitude: '-69.966381',
          startDate: '2024-12-16T07:03:10.098Z',
          startPositionLatitude: '18.525588',
          startPositionLongitude: '-69.776349',
          status: 'InProgress',
        },
      ],
    });
  });
});
