import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { PersonEntity } from '../../entities/person.entity';
import { DriverEntity } from '../../entities/driver.entity';
import { PassengerEntity } from '../../entities/passenger.entity';
import { TripEntity } from '../../entities/trip.entity';
import { InvoiceEntity } from '../../entities/Invoice.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    PersonEntity,
    DriverEntity,
    PassengerEntity,
    TripEntity,
    InvoiceEntity,
  ],
  migrations: ['src/infraestructure/configs/db/migrations/*.ts'],
});
