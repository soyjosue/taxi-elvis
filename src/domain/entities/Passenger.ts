import { Person, PrimitivePerson } from './Person';
import { PrimitiveTrip } from './Trip';

export class PrimitivePassenger {
  id?: string;
  person: PrimitivePerson;
  trips: PrimitiveTrip[];
}

export class Passenger {
  constructor(private attributes: PrimitivePassenger) {}

  static create(createDriver: { person: Person }): Passenger {
    return new Passenger({
      person: createDriver.person.toValue(),
      trips: [],
    });
  }

  toValue(): PrimitivePassenger {
    return this.attributes;
  }
}
