import { Test, TestingModule } from '@nestjs/testing';
import { CompleteTripUseCase } from '../../../../src/application/trip/complete/completeTrip.useCase';
import { CompleteTripUseCaseRequestDto } from '../../../../src/application/trip/complete/completeTrip.useCase.request.dto';
import { TripNotFoundException } from '../../../../src/domain/exceptions/trip/tripNotFoundException';
import { TripRepository } from '../../../../src/domain/repositories/trip.repository';
import { TripAlreadyCompletedException } from '../../../../src/domain/exceptions/trip/tripAlreadyCompletedException';
import { CompleteTripUseCaseResponseDto } from 'src/application/trip/complete/completeTrip.useCase.response.dto';

class MockTripRepository {
  getByIdAsync = jest.fn();
  completeAsync = jest.fn();
}

describe('CompleteTripUseCase', () => {
  let completeTripUseCase: CompleteTripUseCase;
  let tripRepository: TripRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompleteTripUseCase,
        { provide: TripRepository, useClass: MockTripRepository },
      ],
    }).compile();

    completeTripUseCase = module.get<CompleteTripUseCase>(CompleteTripUseCase);
    tripRepository = module.get<TripRepository>(TripRepository);
  });

  it('should throw TripNotFoundException if trip is not found', async () => {
    (tripRepository.getByIdAsync as jest.Mock).mockResolvedValue(null);

    const dto: CompleteTripUseCaseRequestDto = {
      id: 'a8013c4a-5443-43df-80ac-0c0419a97903',
    };

    await expect(completeTripUseCase.execute(dto)).rejects.toThrow(
      new TripNotFoundException(dto.id),
    );
  });

  it('should throw TripAlreadyCompletedException if trip is already completed', async () => {
    const mockTrip = {
      isCompleted: jest.fn().mockReturnValue(true),
    };

    (tripRepository.getByIdAsync as jest.Mock).mockResolvedValue(mockTrip);

    const dto: CompleteTripUseCaseRequestDto = {
      id: 'a8013c4a-5443-43df-80ac-0c0419a97903',
    };

    await expect(completeTripUseCase.execute(dto)).rejects.toThrow(
      new TripAlreadyCompletedException(dto.id),
    );
  });

  it('should complete the trip and return formatted data', async () => {
    const mockTrip = {
      isCompleted: jest.fn().mockReturnValue(false),
      toValue: jest.fn().mockReturnValue({
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
        endDate: '2024-12-16T07:03:35.399Z',
        startPositionLatitude: '18.525588',
        startPositionLongitude: '-69.776349',
        status: 'Completed',
      }),
    };

    (tripRepository.getByIdAsync as jest.Mock).mockResolvedValue(mockTrip);
    (tripRepository.completeAsync as jest.Mock).mockResolvedValue(mockTrip);

    const dto: CompleteTripUseCaseRequestDto = {
      id: 'a8013c4a-5443-43df-80ac-0c0419a97903',
    };

    const result: CompleteTripUseCaseResponseDto =
      await completeTripUseCase.execute(dto);

    expect(tripRepository.getByIdAsync).toHaveBeenCalledWith(dto.id);
    expect(tripRepository.completeAsync).toHaveBeenCalledWith(dto.id);

    expect(result).toHaveProperty('trip');
    expect(result.trip).toHaveProperty(
      'id',
      '155ec573-8bcb-4de9-b24d-f436287e3c78',
    );
    expect(result.trip.driver).toHaveProperty(
      'id',
      '338a0a41-01e8-4473-a6f0-7de64b47420f',
    );
    expect(result.trip.passenger).toHaveProperty(
      'id',
      '6ee55452-8b8a-4964-a891-bab9858623bc',
    );
    expect(result.trip).toHaveProperty('status', 'Completed');
  });
});
