import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsUUID } from 'class-validator';

export class CreateTripUseCaseRequestDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID of the passenger requesting the trip',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  passengerId: string;

  @IsUUID()
  @ApiProperty({
    description: 'ID of the driver assigned to the trip',
    example: '987e6543-e21b-45d3-b678-123456789abc',
  })
  driverId: string;

  @IsLatitude()
  @ApiProperty({
    description: 'Latitude of the destination location',
    example: 18.4655,
  })
  destinationLatitude: number;

  @IsLongitude()
  @ApiProperty({
    description: 'Longitude of the destination location',
    example: -66.1057,
  })
  destinationLongitude: number;
}
