import { IsUUID } from 'class-validator';

export class GetByIdDriverUseCaseRequestDto {
  @IsUUID()
  id: string;
}
