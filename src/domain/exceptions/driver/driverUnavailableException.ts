import { ErrorCodeEnum } from '../../enums/errorCode.enum';
import { CustomError } from '../../../shared/customError';

export class DriverUnavailableException extends CustomError {
  constructor(id: string) {
    super(
      `Driver with id ${id} is unavailable`,
      ErrorCodeEnum.DriverUnavailable,
    );
    this.name = 'DriverUnavailableException';
  }
}
