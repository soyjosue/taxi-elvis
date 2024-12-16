import { DriverStatus } from 'src/domain/enums/driverStatus.enum';
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
    description: 'Driver ID (optional)',
    type: String,
    required: false,
  })
  id?: string;

  @ApiProperty({
    description: 'Driver status',
    enum: DriverStatus,
  })
  status: DriverStatus;

  @ApiProperty({
    description: 'Driver person details (optional)',
    type: Person,
    required: false,
  })
  person?: Person;
}

export class GetAllDriversUseCaseResponseDto {
  @ApiProperty({
    description: 'List of drivers',
    type: [Driver],
  })
  drivers: Driver[];
}
