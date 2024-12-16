import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonEntity } from './person.entity';
import { PrimitiveDriver } from '../../domain/entities/Driver';
import { DriverStatus } from '../../domain/enums/driverStatus.enum';

@Entity({ name: 'drivers' })
export class DriverEntity extends PrimitiveDriver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: DriverStatus,
    default: DriverStatus.Available,
  })
  status: DriverStatus;

  @OneToOne(() => PersonEntity, (person) => person.driver, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  person: PersonEntity;
}
