import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorCodeEnum } from 'src/domain/enums/errorCode.enum';
import { DriverUnavailableException } from 'src/domain/exceptions/driver/driverUnavailableException';
import { DriverNotFoundException } from 'src/domain/exceptions/driver/driverNotFoundException';
import { PassengerAlreadyInAnotherTripException } from 'src/domain/exceptions/passenger/passengerAlreadyInAnotherTripException';
import { CustomError } from 'src/shared/customError';
import { PassengerNotFoundException } from 'src/domain/exceptions/passenger/passengerNotFoundException';
import { TripNotFoundException } from 'src/domain/exceptions/trip/tripNotFoundException';
import { TripAlreadyCompletedException } from 'src/domain/exceptions/trip/tripAlreadyCompletedException';
import { ZeroDistanceTripException } from 'src/domain/exceptions/trip/ZeroDistanceTripException';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.error(exception);
    const response = host.switchToHttp().getResponse();

    if (exception instanceof BadRequestException) {
      response.status(exception.getStatus()).json(exception.getResponse());
      return;
    }

    const status = this.getHttpStatus(exception);
    const message =
      status != HttpStatus.INTERNAL_SERVER_ERROR
        ? exception.message
        : 'An unexpected error occurred on the server.';
    let errorCode = ErrorCodeEnum.UnknownError;
    if (exception instanceof CustomError) errorCode = exception.code;

    response.status(status).json({
      httpStatus: status,
      errorCode: errorCode,
      message: message,
    });
  }

  private getHttpStatus(exception: any): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }

    switch (exception.constructor) {
      case PassengerAlreadyInAnotherTripException:
      case DriverUnavailableException:
      case PassengerAlreadyInAnotherTripException:
      case TripAlreadyCompletedException:
      case ZeroDistanceTripException:
        return HttpStatus.BAD_REQUEST;
      case DriverNotFoundException:
      case PassengerNotFoundException:
      case TripNotFoundException:
        return HttpStatus.NOT_FOUND;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
