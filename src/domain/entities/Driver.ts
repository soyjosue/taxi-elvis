import { DriverStatus } from '../enums/driverStatus.enum';
import { Person, PrimitivePerson } from './Person';
import { PrimitiveTrip } from './Trip';

export class PrimitiveDriver {
  id?: string;
  status: DriverStatus;
  person?: PrimitivePerson;
  trips: PrimitiveTrip[];
}

export class Driver {
  constructor(private attributes: PrimitiveDriver) {}

  static create(createDriver: {
    status: DriverStatus;
    person: Person;
  }): Driver {
    return new Driver({
      status: createDriver.status,
      person: createDriver.person.toValue(),
      trips: [],
    });
  }

  markAsUnavailable(): void {
    this.attributes.status = DriverStatus.Unavailable;
  }

  markAsAvailable(): void {
    this.attributes.status = DriverStatus.Available;
  }

  isAvailable(): boolean {
    return this.attributes.status == DriverStatus.Available;
  }

  toValue(): PrimitiveDriver {
    return this.attributes;
  }
}
