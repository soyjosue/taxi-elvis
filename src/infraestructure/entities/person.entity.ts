import { PrimitivePerson } from '../../domain/entities/Person';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DriverEntity } from './driver.entity';
import { PassengerEntity } from './passenger.entity';

@Entity({ name: 'people' })
export class PersonEntity extends PrimitivePerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  middleName?: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  secondLastName?: string;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @OneToOne(() => DriverEntity, (driver) => driver.person)
  driver: DriverEntity;

  @OneToOne(() => PassengerEntity, (passenger) => passenger.person)
  passenger: PassengerEntity;
}
