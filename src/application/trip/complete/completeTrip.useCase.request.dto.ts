import { IsUUID } from 'class-validator';

export class CompleteTripUseCaseRequestDto {
  @IsUUID()
  id: string;
}
