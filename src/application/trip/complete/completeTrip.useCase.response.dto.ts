import { TripStatus } from 'src/domain/enums/TripStatus.enum';
import { ApiProperty } from '@nestjs/swagger';

class Person {
  @ApiProperty({
    description: 'First name of the person',
    type: String,
  })
  firstName: string;

  @ApiProperty({
    description: 'Middle name of the person (optional)',
    type: String,
    required: false,
  })
  middleName?: string;

  @ApiProperty({
    description: 'Last name of the person',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    description: 'Second last name of the person (optional)',
    type: String,
    required: false,
  })
  secondLastName?: string;
}

class Passenger {
  @ApiProperty({
    description: 'Passenger ID',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Passenger person details',
    type: Person,
  })
  person: Person;
}

class Driver {
  @ApiProperty({
    description: 'Driver ID',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Driver person details',
    type: Person,
  })
  person: Person;
}

class Trip {
  @ApiProperty({
    description: 'Trip ID',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Passenger details',
    type: Passenger,
  })
  passenger: Passenger;

  @ApiProperty({
    description: 'Driver details',
    type: Driver,
  })
  driver: Driver;

  @ApiProperty({
    description: 'Start date of the trip',
    type: Date,
  })
  startDate: Date;

  @ApiProperty({
    description: 'End date of the trip',
    type: Date,
  })
  endDate: Date;

  @ApiProperty({
    description: 'Latitude of the trip start position',
    type: Number,
  })
  startPositionLatitude: number;

  @ApiProperty({
    description: 'Longitude of the trip start position',
    type: Number,
  })
  startPositionLongitude: number;

  @ApiProperty({
    description: 'Latitude of the trip end position',
    type: Number,
  })
  endPositionLatitude: number;

  @ApiProperty({
    description: 'Longitude of the trip end position',
    type: Number,
  })
  endPositionLongitude: number;

  @ApiProperty({
    description: 'Current status of the trip',
    enum: TripStatus,
  })
  status: TripStatus;
}

export class CompleteTripUseCaseResponseDto {
  @ApiProperty({
    description: 'Completed trip details',
    type: Trip,
  })
  trip: Trip;
}
