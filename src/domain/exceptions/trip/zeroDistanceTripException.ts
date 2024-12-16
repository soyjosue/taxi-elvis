import { ErrorCodeEnum } from '../../enums/errorCode.enum';
import { CustomError } from '../../../shared/customError';

export class ZeroDistanceTripException extends CustomError {
  constructor() {
    super(
      `The trip has a distance of 0, which is invalid.`,
      ErrorCodeEnum.ZeroDistanceTrip,
    );
    this.name = 'ZeroDistanceTripException';
  }
}
