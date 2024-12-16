import { IsUUID } from 'class-validator';

export class GetClosestDriversUseCaseRequestDto {
  @IsUUID()
  passengerId: string;
}
