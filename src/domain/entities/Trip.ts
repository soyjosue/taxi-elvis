import { TripStatus } from '../enums/TripStatus.enum';
import { Driver, PrimitiveDriver } from './Driver';
import { Passenger, PrimitivePassenger } from './Passenger';

export class PrimitiveTrip {
  id?: string;
  passenger: PrimitivePassenger;
  driver: PrimitiveDriver;
  startDate: Date;
  endDate?: Date;
  startPositionLatitude: number;
  startPositionLongitude: number;
  endPositionLatitude: number;
  endPositionLongitude: number;
  status: TripStatus;
}

export class Trip {
  constructor(private attributes: PrimitiveTrip) {}

  static create(createTrip: {
    id?: string;
    passenger: Passenger;
    driver: Driver;
    endDate?: Date;
    startPositionLatitude: number;
    startPositionLongitude: number;
    endPositionLatitude: number;
    endPositionLongitude: number;
  }): Trip {
    return new Trip({
      id: createTrip.id,
      passenger: createTrip.passenger.toValue(),
      driver: createTrip.driver.toValue(),
      startDate: new Date(),
      endDate: createTrip.endDate,
      startPositionLatitude: createTrip.startPositionLatitude,
      startPositionLongitude: createTrip.startPositionLongitude,
      endPositionLatitude: createTrip.endPositionLatitude,
      endPositionLongitude: createTrip.endPositionLongitude,
      status: TripStatus.InProgress,
    });
  }

  isCompleted() {
    return this.attributes.status == TripStatus.Completed;
  }

  toValue(): PrimitiveTrip {
    return this.attributes;
  }
}
