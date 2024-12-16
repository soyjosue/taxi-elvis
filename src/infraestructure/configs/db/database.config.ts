import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import environmentConfig from '../environment.config';
import { DriverEntity } from '../../entities/driver.entity';
import { PersonEntity } from '../../entities/person.entity';
import { PassengerEntity } from '../../entities/passenger.entity';
import { TripEntity } from '../../entities/trip.entity';
import { InvoiceEntity } from '../../entities/Invoice.entity';

export const getDatabaseConfig = async (
  configService: ConfigType<typeof environmentConfig>,
): Promise<TypeOrmModuleOptions> => {
  const { host, port, user, password, db } = configService.database;

  return {
    type: 'postgres',
    host,
    port,
    username: user,
    password,
    database: db,
    entities: [
      PersonEntity,
      DriverEntity,
      PassengerEntity,
      TripEntity,
      InvoiceEntity,
    ],
  };
};
