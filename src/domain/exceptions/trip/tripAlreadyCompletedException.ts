import { ErrorCodeEnum } from '../../enums/errorCode.enum';
import { CustomError } from '../../../shared/customError';

export class TripAlreadyCompletedException extends CustomError {
  constructor(id: string) {
    super(
      `Trip with id ${id} has already been completed.`,
      ErrorCodeEnum.TripAlreadyCompleted,
    );
    this.name = 'TripAlreadyCompletedException';
  }
}
