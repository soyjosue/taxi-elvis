import { IsUUID } from 'class-validator';

export class GetByIdPassengerUseCaseRequestDto {
  @IsUUID()
  id: string;
}
