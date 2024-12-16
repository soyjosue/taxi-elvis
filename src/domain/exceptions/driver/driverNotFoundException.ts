import { ErrorCodeEnum } from '../../enums/errorCode.enum';
import { CustomError } from '../../../shared/customError';

export class DriverNotFoundException extends CustomError {
  constructor(id: string) {
    super(`Driver with id ${id} not found`, ErrorCodeEnum.DriverNotFound);
    this.name = 'DriverNotFoundException';
  }
}
