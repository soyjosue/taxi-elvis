import { ErrorCodeEnum } from '../../enums/errorCode.enum';
import { CustomError } from '../../../shared/customError';

export class PassengerAlreadyInAnotherTripException extends CustomError {
  constructor(id: string) {
    super(
      `Passenger with ID ${id} is already assigned to another trip.`,
      ErrorCodeEnum.PassengerAlreadyInAnotherTrip,
    );
    this.name = 'PassengerAlreadyInAnotherTripException';
  }
}
