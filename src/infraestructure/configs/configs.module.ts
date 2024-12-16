import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from '../entities/driver.entity';
import { ConfigModule, ConfigType } from '@nestjs/config';
import environmentConfig from './environment.config';
import { getDatabaseConfig } from './db/database.config';
import { PassengerEntity } from '../entities/passenger.entity';
import { TripEntity } from '../entities/trip.entity';

const typeOrmModuleRoot = TypeOrmModule.forRootAsync({
  useFactory: async (configService: ConfigType<typeof environmentConfig>) =>
    await getDatabaseConfig(configService),
  inject: [environmentConfig.KEY],
});

const typeOrmModuleFeature = TypeOrmModule.forFeature([
  DriverEntity,
  PassengerEntity,
  TripEntity,
]);

const environmentVariableConfigModule = ConfigModule.forRoot({
  envFilePath: '.env',
  load: [environmentConfig],
  isGlobal: true,
});

@Module({
  imports: [
    typeOrmModuleRoot,
    typeOrmModuleFeature,
    environmentVariableConfigModule,
  ],
  exports: [typeOrmModuleFeature],
})
export class ConfigsModule {}
