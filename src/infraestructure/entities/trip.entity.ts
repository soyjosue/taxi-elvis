import { PrimitiveTrip } from '../../domain/entities/Trip';
import { TripStatus } from '../../domain/enums/TripStatus.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DriverEntity } from './driver.entity';
import { PassengerEntity } from './passenger.entity';
import { InvoiceEntity } from './Invoice.entity';

@Entity({
  name: 'trips',
})
export class TripEntity extends PrimitiveTrip {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'timestamptz',
  })
  startDate: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  endDate?: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
  })
  startPositionLatitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
  })
  startPositionLongitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
  })
  endPositionLatitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 6,
  })
  endPositionLongitude: number;

  @Column({
    type: 'enum',
    enum: TripStatus,
    default: TripStatus.InProgress,
  })
  status: TripStatus;

  @ManyToOne(() => DriverEntity, (driver) => driver.trips, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  driver: DriverEntity;

  @ManyToOne(() => PassengerEntity, (passenger) => passenger.trips, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  passenger: PassengerEntity;

  @OneToOne(() => InvoiceEntity, (invoice) => invoice.trip)
  invoice: InvoiceEntity;
}
