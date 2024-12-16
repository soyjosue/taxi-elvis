import { ErrorCodeEnum } from '../../enums/errorCode.enum';
import { CustomError } from '../../../shared/customError';

export class PassengerNotFoundException extends CustomError {
  constructor(id: string) {
    super(`Passenger with id ${id} not found`, ErrorCodeEnum.PassengerNotFound);
    this.name = 'NotFoundPassengerException';
  }
}
