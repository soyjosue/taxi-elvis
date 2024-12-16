import { PrimitiveInvoice } from '../../domain/entities/Invoice';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TripEntity } from './trip.entity';

@Entity('invoices')
export class InvoiceEntity extends PrimitiveInvoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  distanceInKilometer: number;

  @Column({ type: 'timestamptz' })
  issueDate: Date;

  @OneToOne(() => TripEntity, (trip) => trip.invoice, { onDelete: 'RESTRICT' })
  @JoinColumn()
  trip: TripEntity;
}
