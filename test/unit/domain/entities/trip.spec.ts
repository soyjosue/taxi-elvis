import { Driver } from '../../../../src/domain/entities/Driver';
import { Passenger } from '../../../../src/domain/entities/Passenger';
import { Person } from '../../../../src/domain/entities/Person';
import { PrimitiveTrip, Trip } from '../../../../src/domain/entities/Trip';
import { DriverStatus } from '../../../../src/domain/enums/driverStatus.enum';
import { TripStatus } from '../../../../src/domain/enums/TripStatus.enum';

describe('trip', () => {
  let passenger: Passenger;
  let driver: Driver;
  let data;

  beforeEach(() => {
    passenger = Passenger.create({
      person: Person.create({
        firstName: 'Laura',
        lastName: 'Soto',
        latitude: 18.4825,
        longitude: -69.9175,
        secondLastName: 'Alvarez',
      }),
    });

    driver = Driver.create({
      person: Person.create({
        firstName: 'Paola',
        lastName: 'Ramos',
        latitude: 18.4795,
        longitude: -69.9295,
      }),
      status: DriverStatus.Available,
    });

    data = {
      startPositionLatitude: 18.4795,
      startPositionLongitude: -69.9295,
      endPositionLatitude: 18.486,
      endPositionLongitude: -69.9325,
    };
  });

  describe('create', () => {
    it('should create a trip with the provided passenger, driver, and coordinates', () => {
      const trip = Trip.create({
        driver,
        passenger,
        endPositionLatitude: data.endPositionLatitude,
        endPositionLongitude: data.endPositionLongitude,
        startPositionLatitude: data.startPositionLatitude,
        startPositionLongitude: data.startPositionLongitude,
      });

      const tripData: PrimitiveTrip = trip.toValue();

      expect(tripData.passenger).toBeDefined();
      expect(tripData.driver).toBeDefined();
      expect(tripData.startPositionLatitude).toBe(data.startPositionLatitude);
      expect(tripData.startPositionLongitude).toBe(data.startPositionLongitude);
      expect(tripData.endPositionLatitude).toBe(data.endPositionLatitude);
      expect(tripData.endPositionLongitude).toBe(data.endPositionLongitude);
      expect(tripData.status).toBe(TripStatus.InProgress);
      expect(tripData.startDate).toBeInstanceOf(Date);
    });
  });

  describe('isCompleted', () => {
    it('should return false if the trip status is not completed', () => {
      const trip = Trip.create({
        passenger,
        driver,
        endPositionLatitude: data.endPositionLatitude,
        endPositionLongitude: data.endPositionLongitude,
        startPositionLatitude: data.startPositionLatitude,
        startPositionLongitude: data.startPositionLongitude,
      });

      expect(trip.isCompleted()).toBe(false);
    });

    it('should return true if the trip status is completed', () => {
      const trip = Trip.create({
        passenger,
        driver,
        endPositionLatitude: data.endPositionLatitude,
        endPositionLongitude: data.endPositionLongitude,
        startPositionLatitude: data.startPositionLatitude,
        startPositionLongitude: data.startPositionLongitude,
      });

      trip.toValue().status = TripStatus.Completed;

      expect(trip.isCompleted()).toBe(true);
    });
  });

  describe('toValue', () => {
    it('should return the trip attributes', () => {
      const trip = Trip.create({
        passenger,
        driver,
        endPositionLatitude: data.endPositionLatitude,
        endPositionLongitude: data.endPositionLongitude,
        startPositionLatitude: data.startPositionLatitude,
        startPositionLongitude: data.startPositionLongitude,
      });

      const tripData: PrimitiveTrip = trip.toValue();

      expect(tripData.passenger).toBeDefined();
      expect(tripData.driver).toBeDefined();
      expect(tripData.startPositionLatitude).toBe(data.startPositionLatitude);
      expect(tripData.startPositionLongitude).toBe(data.startPositionLongitude);
      expect(tripData.endPositionLatitude).toBe(data.endPositionLatitude);
      expect(tripData.endPositionLongitude).toBe(data.endPositionLongitude);
      expect(tripData.status).toBe(TripStatus.InProgress);
    });
  });
});
