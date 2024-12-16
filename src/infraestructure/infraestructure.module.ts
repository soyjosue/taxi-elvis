import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { GetByIdDriverUseCase } from 'src/application/driver/getById/getDriverById.useCase';
import { GetAllDriversUseCase } from 'src/application/driver/getAll/getAllDrivers.useCase';
import { GetAllAvailableDriversUseCase } from 'src/application/driver/getAllAvailable/getAllAvailableDrivers.useCase';
import { GetAllAvailableDriversInRadiusUseCase } from 'src/application/driver/getAllAvailableInRadius/getAllAvailableInRadiusDrivers.useCase';

import { DriverController } from './controllers/driver.controller';
import { RepositoriesModule } from './repositories/repositories.module';
import { GetAllPassengersUseCase } from 'src/application/passenger/getAll/getAllPassengers.useCase';
import { PassengerController } from './controllers/passenger.controller';
import { GetByIdPassengerUseCase } from 'src/application/passenger/getById/getByIdPassenger.useCase';
import { GetClosestDriversByPassengerUseCase } from 'src/application/passenger/getClosestDriversByPassenger/getClosestDriversByPassenger.useCase';
import { CreateTripUseCase } from 'src/application/trip/create/createTrip.useCase';
import { TripController } from './controllers/trip.controller';
import { CompleteTripUseCase } from 'src/application/trip/complete/completeTrip.useCase';
import { GetTripInProgressUseCase } from 'src/application/trip/getInProgress/getTripInProgress.useCase';
import { ServicesModule } from './services/services.module';

const useCases = [
  GetAllDriversUseCase,
  GetAllAvailableDriversUseCase,
  GetAllAvailableDriversInRadiusUseCase,
  GetByIdDriverUseCase,
  GetAllPassengersUseCase,
  GetByIdPassengerUseCase,
  GetClosestDriversByPassengerUseCase,
  CreateTripUseCase,
  CompleteTripUseCase,
  GetTripInProgressUseCase,
];
const classSerializerInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass: ClassSerializerInterceptor,
};

@Module({
  controllers: [DriverController, PassengerController, TripController],
  imports: [RepositoriesModule, ServicesModule],
  exports: [RepositoriesModule],
  providers: [...useCases, classSerializerInterceptor],
})
export class InfraestructureModule {}
