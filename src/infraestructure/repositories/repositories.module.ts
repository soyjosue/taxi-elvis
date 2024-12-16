import { Module } from '@nestjs/common';
import { DriverRepository } from 'src/domain/repositories/driver.repository';
import { DriverDBRepository } from './driver.repository';
import { ServicesModule } from '../services/services.module';
import { ConfigsModule } from '../configs/configs.module';
import { PassengerRepository } from 'src/domain/repositories/passenger.repository';
import { PassengerDbRepository } from './passenger.repository';
import { TripRepository } from 'src/domain/repositories/trip.repository';
import { TripDbRepository } from './trip.repository';

const repositories = [
  { provide: DriverRepository, useClass: DriverDBRepository },
  { provide: PassengerRepository, useClass: PassengerDbRepository },
  { provide: TripRepository, useClass: TripDbRepository },
];

@Module({
  imports: [ServicesModule, ConfigsModule],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule {}
