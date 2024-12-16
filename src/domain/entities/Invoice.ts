import { PrimitiveTrip, Trip } from './Trip';

export class PrimitiveInvoice {
  id?: string;
  trip: PrimitiveTrip;
  distanceInKilometer: number;
  issueDate: Date;
}

export class Invoice {
  constructor(private attributes: PrimitiveInvoice) {}

  static create(createInvoice: { trip: Trip; distance: number }): Invoice {
    return new Invoice({
      trip: createInvoice.trip.toValue(),
      distanceInKilometer: createInvoice.distance,
      issueDate: new Date(),
    });
  }

  toValue(): PrimitiveInvoice {
    return this.attributes;
  }
}
