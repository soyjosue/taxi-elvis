import { IsLatitude } from 'class-validator';

export class GetAllAvailableInRadiusDriversUseCaseRequestDto {
  @IsLatitude()
  latitude: number;

  @IsLatitude()
  longitude: number;
}
