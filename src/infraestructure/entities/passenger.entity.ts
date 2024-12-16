import { PrimitivePassenger } from '../../domain/entities/Passenger';
import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonEntity } from './person.entity';
import { TripEntity } from './trip.entity';

@Entity({
  name: 'passengers',
})
export class PassengerEntity extends PrimitivePassenger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => PersonEntity, (person) => person.passenger, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  person: PersonEntity;

  @OneToMany(() => TripEntity, (trip) => trip.passenger)
  trips: TripEntity[];
}
