import { ErrorCodeEnum } from '../../enums/errorCode.enum';
import { CustomError } from '../../../shared/customError';

export class TripNotFoundException extends CustomError {
  constructor(id: string) {
    super(`Trip with id ${id} not found`, ErrorCodeEnum.TripNotFound);
    this.name = 'TripNotFoundExceiption';
  }
}
