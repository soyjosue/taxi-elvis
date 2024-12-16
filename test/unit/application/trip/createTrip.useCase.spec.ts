import { Test, TestingModule } from '@nestjs/testing';
import { TripRepository } from '../../../../src/domain/repositories/trip.repository';
import { CreateTripUseCase } from '../../../../src/application/trip/create/createTrip.useCase';
import { CreateTripUseCaseRequestDto } from '../../../../src/application/trip/create/createTrip.useCase.request.dto';
import { PassengerNotFoundException } from '../../../../src/domain/exceptions/passenger/passengerNotFoundException';
import { PassengerRepository } from '../../../../src/domain/repositories/passenger.repository';
import { DriverRepository } from '../../../../src/domain/repositories/driver.repository';
import { DistanceService } from '../../../../src/domain/services/distance.service';
import { PassengerAlreadyInAnotherTripException } from '../../../../src/domain/exceptions/passenger/passengerAlreadyInAnotherTripException';
import { DriverNotFoundException } from '../../../../src/domain/exceptions/driver/driverNotFoundException';
import { DriverUnavailableException } from '../../../../src/domain/exceptions/driver/driverUnavailableException';
import { DriverStatus } from '../../../../src/domain/enums/driverStatus.enum';
import { ZeroDistanceTripException } from '../../../../src/domain/exceptions/trip/ZeroDistanceTripException';

class MockTripRepository {
  getByIdAsync = jest.fn();
  completeAsync = jest.fn();
  createAsync = jest.fn();
}

class MockPassengerRepository {
  getByIdAsync = jest.fn();
  isOnATripAsync = jest.fn();
}

class MockDriverRepository {
  getByIdAsync = jest.fn();
}

class MockDistanceService {
  calculateDistance = jest.fn();
}

describe('CompleteTripUseCase', () => {
  let completeTripUseCase: CreateTripUseCase;
  let tripRepository: TripRepository;
  let passengerRepository: PassengerRepository;
  let driverRepository: DriverRepository;
  let distanceService: DistanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTripUseCase,
        { provide: TripRepository, useClass: MockTripRepository },
        { provide: PassengerRepository, useClass: MockPassengerRepository },
        { provide: DriverRepository, useClass: MockDriverRepository },
        { provide: DistanceService, useClass: MockDistanceService },
      ],
    }).compile();

    completeTripUseCase = module.get<CreateTripUseCase>(CreateTripUseCase);
    tripRepository = module.get<TripRepository>(TripRepository);
    passengerRepository = module.get<PassengerRepository>(PassengerRepository);
    driverRepository = module.get<DriverRepository>(DriverRepository);
    distanceService = module.get<DistanceService>(DistanceService);
  });

  it('should throw PassengerNotFoundException if passenger is not found', async () => {
    (passengerRepository.getByIdAsync as jest.Mock).mockResolvedValue(null);

    const dto: CreateTripUseCaseRequestDto = {
      passengerId: '6ee55452-8b8a-4964-a891-bab9858623bc',
      driverId: '338a0a41-01e8-4473-a6f0-7de64b47420f',
      destinationLatitude: 18.4569095,
      destinationLongitude: -69.9663811,
    };

    await expect(completeTripUseCase.execute(dto)).rejects.toThrow(
      new PassengerNotFoundException(dto.passengerId),
    );
  });

  it('should throw PassengerAlreadyInAnotherTripException if passenger is on a trip', async () => {
    (passengerRepository.getByIdAsync as jest.Mock).mockResolvedValue({
      id: 'a8013c4a-5443-43df-80ac-0c0419a97903',
      person: {
        firstName: 'Miguel',
        lastName: 'Acevedo',
        latitude: '18.499159',
        longitude: '-69.865670',
        middleName: null,
        secondLastName: null,
      },
    });
    (passengerRepository.isOnATripAsync as jest.Mock).mockResolvedValue(true);

    const dto: CreateTripUseCaseRequestDto = {
      passengerId: '6ee55452-8b8a-4964-a891-bab9858623bc',
      driverId: '338a0a41-01e8-4473-a6f0-7de64b47420f',
      destinationLatitude: 18.4569095,
      destinationLongitude: -69.9663811,
    };

    await expect(completeTripUseCase.execute(dto)).rejects.toThrow(
      new PassengerAlreadyInAnotherTripException(dto.passengerId),
    );
  });

  it('should throw DriverNotFoundException if driver is not found', async () => {
    (passengerRepository.getByIdAsync as jest.Mock).mockResolvedValue({
      id: 'a8013c4a-5443-43df-80ac-0c0419a97903',
      person: {
        firstName: 'Miguel',
        lastName: 'Acevedo',
        latitude: '18.499159',
        longitude: '-69.865670',
        middleName: null,
        secondLastName: null,
      },
    });
    (passengerRepository.isOnATripAsync as jest.Mock).mockResolvedValue(false);
    (driverRepository.getByIdAsync as jest.Mock).mockResolvedValue(null);

    const dto: CreateTripUseCaseRequestDto = {
      passengerId: '6ee55452-8b8a-4964-a891-bab9858623bc',
      driverId: '338a0a41-01e8-4473-a6f0-7de64b47420f',
      destinationLatitude: 18.4569095,
      destinationLongitude: -69.9663811,
    };

    await expect(completeTripUseCase.execute(dto)).rejects.toThrow(
      new DriverNotFoundException(dto.driverId),
    );
  });

  it('should throw DriverUnavailableException if driver is not available', async () => {
    (passengerRepository.getByIdAsync as jest.Mock).mockResolvedValue({
      id: 'a8013c4a-5443-43df-80ac-0c0419a97903',
      person: {
        firstName: 'Miguel',
        lastName: 'Acevedo',
        latitude: '18.499159',
        longitude: '-69.865670',
        middleName: null,
        secondLastName: null,
      },
    });
    (passengerRepository.isOnATripAsync as jest.Mock).mockResolvedValue(false);

    const mockDriver = {
      id: 'e0edd65a-0a33-477a-8ab3-59d2f826c4b6',
      isAvailable: jest.fn().mockReturnValue(false),
      status: DriverStatus.Unavailable,
      person: {
        firstName: 'Juan',
        lastName: 'Perez',
        latitude: '18.488000',
        longitude: '-69.930000',
        middleName: 'A.',
        secondLastName: 'Diaz',
      },
    };
    (driverRepository.getByIdAsync as jest.Mock).mockResolvedValue(mockDriver);

    const dto: CreateTripUseCaseRequestDto = {
      passengerId: '6ee55452-8b8a-4964-a891-bab9858623bc',
      driverId: '338a0a41-01e8-4473-a6f0-7de64b47420f',
      destinationLatitude: 18.4569095,
      destinationLongitude: -69.9663811,
    };

    await expect(completeTripUseCase.execute(dto)).rejects.toThrow(
      new DriverUnavailableException(dto.driverId),
    );
  });

  it('should throw ZeroDistanceTripException if distance is zero', async () => {
    (passengerRepository.getByIdAsync as jest.Mock).mockResolvedValue({
      toValue: () => ({
        id: 'a8013c4a-5443-43df-80ac-0c0419a97903',
        person: {
          firstName: 'Miguel',
          lastName: 'Acevedo',
          latitude: '18.499159',
          longitude: '-69.865670',
          middleName: null,
          secondLastName: null,
        },
      }),
    });
    (passengerRepository.isOnATripAsync as jest.Mock).mockResolvedValue(false);

    const mockDriver = {
      isAvailable: jest.fn().mockReturnValue(true),
      toValue: () => ({
        id: 'e0edd65a-0a33-477a-8ab3-59d2f826c4b6',
        status: DriverStatus.Available,
        person: {
          firstName: 'Juan',
          lastName: 'Perez',
          latitude: '18.488000',
          longitude: '-69.930000',
          middleName: 'A.',
          secondLastName: 'Diaz',
        },
      }),
    };
    (driverRepository.getByIdAsync as jest.Mock).mockResolvedValue(mockDriver);
    (distanceService.calculateDistance as jest.Mock).mockReturnValue(0);

    const dto: CreateTripUseCaseRequestDto = {
      passengerId: '6ee55452-8b8a-4964-a891-bab9858623bc',
      driverId: '338a0a41-01e8-4473-a6f0-7de64b47420f',
      destinationLatitude: 18.4569095,
      destinationLongitude: -69.9663811,
    };

    await expect(completeTripUseCase.execute(dto)).rejects.toThrow(
      new ZeroDistanceTripException(),
    );
  });

  it('should create the trip and return formatted data', async () => {
    (passengerRepository.getByIdAsync as jest.Mock).mockResolvedValue({
      toValue: () => ({
        id: 'a8013c4a-5443-43df-80ac-0c0419a97903',
        person: {
          firstName: 'Miguel',
          lastName: 'Acevedo',
          latitude: '18.499159',
          longitude: '-69.865670',
          middleName: null,
          secondLastName: null,
        },
      }),
    });
    (passengerRepository.isOnATripAsync as jest.Mock).mockResolvedValue(false);

    const mockDriver = {
      isAvailable: jest.fn().mockReturnValue(true),
      markAsUnavailable: jest.fn(),
      toValue: () => ({
        id: 'e0edd65a-0a33-477a-8ab3-59d2f826c4b6',
        status: DriverStatus.Available,
        person: {
          firstName: 'Juan',
          lastName: 'Perez',
          latitude: '18.488000',
          longitude: '-69.930000',
          middleName: 'A.',
          secondLastName: 'Diaz',
        },
      }),
    };
    (driverRepository.getByIdAsync as jest.Mock).mockResolvedValue(mockDriver);
    (distanceService.calculateDistance as jest.Mock).mockReturnValue(1);

    (tripRepository.createAsync as jest.Mock).mockResolvedValue({
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
        endPositionLatitude: '18.4569095',
        endPositionLongitude: '-69.9663811',
        startDate: '2024-12-16T07:03:10.098Z',
        startPositionLatitude: '18.525588',
        startPositionLongitude: '-69.776349',
        status: 'InProgress',
      }),
    });

    const dto: CreateTripUseCaseRequestDto = {
      passengerId: '6ee55452-8b8a-4964-a891-bab9858623bc',
      driverId: '338a0a41-01e8-4473-a6f0-7de64b47420f',
      destinationLatitude: 18.4569095,
      destinationLongitude: -69.9663811,
    };

    const result = await completeTripUseCase.execute(dto);

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
    expect(result.trip).toHaveProperty('status', 'InProgress');
  });
});
