import { ErrorCodeEnum } from 'src/domain/enums/errorCode.enum';

export class CustomError extends Error {
  code: ErrorCodeEnum;
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
