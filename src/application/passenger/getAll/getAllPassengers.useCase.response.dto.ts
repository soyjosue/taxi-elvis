import { ApiProperty } from '@nestjs/swagger';

class Person {
  @ApiProperty({
    description: 'First name of the passenger',
    type: String,
  })
  firstName: string;

  @ApiProperty({
    description: 'Middle name of the passenger (optional)',
    type: String,
    required: false,
  })
  middleName?: string;

  @ApiProperty({
    description: 'Last name of the passenger',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    description: 'Second last name of the passenger (optional)',
    type: String,
    required: false,
  })
  secondLastName?: string;

  @ApiProperty({
    description: "Latitude of the passenger's location",
    type: Number,
  })
  latitude: number;

  @ApiProperty({
    description: "Longitude of the passenger's location",
    type: Number,
  })
  longitude: number;
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

export class GetAllPassengersUseCaseResponseDto {
  @ApiProperty({
    description: 'List of passengers',
    type: [Passenger],
  })
  passengers: Passenger[];
}
