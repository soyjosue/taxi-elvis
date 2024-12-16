import { ApiProperty } from '@nestjs/swagger';

class Person {
  @ApiProperty({
    description: 'First name of the driver',
    type: String,
  })
  firstName: string;

  @ApiProperty({
    description: 'Middle name of the driver (optional)',
    type: String,
    required: false,
  })
  middleName?: string;

  @ApiProperty({
    description: 'Last name of the driver',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    description: 'Second last name of the driver (optional)',
    type: String,
    required: false,
  })
  secondLastName?: string;

  @ApiProperty({
    description: "Latitude of the driver's location",
    type: Number,
  })
  latitude: number;

  @ApiProperty({
    description: "Longitude of the driver's location",
    type: Number,
  })
  longitude: number;
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

  @ApiProperty({
    description: 'Distance from the passenger in kilometers',
    type: Number,
  })
  distanceInKm: number;
}

export class GetClosestDriversUseCaseResponseDto {
  @ApiProperty({
    description: 'List of closest drivers',
    type: [Driver],
  })
  drivers: Driver[];
}
