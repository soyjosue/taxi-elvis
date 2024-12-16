import { Driver } from '../../../../src/domain/entities/Driver';
import {
  Invoice,
  PrimitiveInvoice,
} from '../../../../src/domain/entities/Invoice';
import { Passenger } from '../../../../src/domain/entities/Passenger';
import { Person } from '../../../../src/domain/entities/Person';
import { Trip } from '../../../../src/domain/entities/Trip';
import { DriverStatus } from '../../../../src/domain/enums/driverStatus.enum';

describe('Invoice', () => {
  let trip: Trip;

  beforeEach(() => {
    trip = Trip.create({
      id: 'bbf53f28-29cb-44be-81dc-33d79bf54cc8',
      driver: Driver.create({
        status: DriverStatus.Available,
        person: Person.create({
          firstName: 'Driver',
          lastName: 'Driver LastName',
          latitude: 18.489,
          longitude: 18.489,
        }),
      }),
      endPositionLatitude: 18.489,
      endPositionLongitude: -69.929,
      passenger: Passenger.create({
        person: Person.create({
          firstName: 'passenger',
          lastName: 'passenger LastName',
          latitude: 18.4935,
          longitude: -69.9315,
        }),
      }),
      startPositionLatitude: 18.4935,
      startPositionLongitude: -69.9315,
      endDate: new Date(),
    });
  });

  describe('create', () => {
    it('should create an invoice with the provided trip and distance', () => {
      const invoice = Invoice.create({
        trip,
        distance: 100,
      });

      const invoiceData = invoice.toValue();

      expect(invoiceData.trip.id).toBe(trip.toValue().id);
      expect(invoiceData.distanceInKilometer).toBe(100);
      expect(invoiceData.issueDate).toBeInstanceOf(Date);
    });
  });

  describe('toValue', () => {
    it('should return the invoice attributes', () => {
      const invoice = Invoice.create({
        trip,
        distance: 100,
      });

      const invoiceData: PrimitiveInvoice = invoice.toValue();

      expect(invoiceData.trip.id).toBe(trip.toValue().id);
      expect(invoiceData.distanceInKilometer).toBe(100);
      expect(invoiceData.issueDate).toBeInstanceOf(Date);
    });
  });
});
