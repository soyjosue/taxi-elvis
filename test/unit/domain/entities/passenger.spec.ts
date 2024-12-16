import {
  Passenger,
  PrimitivePassenger,
} from '../../../../src/domain/entities/Passenger';
import { Person } from '../../../../src/domain/entities/Person';

describe('passenger', () => {
  let person: Person;

  beforeEach(() => {
    person = Person.create({
      firstName: 'Miguel',
      lastName: 'Acevedo',
      latitude: 18.489,
      longitude: 18.489,
    });
  });

  describe('create', () => {
    it('should create a passenger with the provided person', () => {
      const passenger = Passenger.create({ person });

      const passengerData = passenger.toValue();

      expect(passengerData.person).toBeDefined();
      expect(passengerData.person.firstName).toBe(person.toValue().firstName);
      expect(passengerData.person.lastName).toBe(person.toValue().lastName);
      expect(passengerData.person.latitude).toBe(person.toValue().latitude);
      expect(passengerData.person.longitude).toBe(person.toValue().longitude);
      expect(passengerData.trips.length).toBe(0);
    });
  });

  describe('toValue', () => {
    it('should return the passenger attributes', () => {
      const passenger = Passenger.create({ person });

      const passengerData: PrimitivePassenger = passenger.toValue();

      expect(passengerData.person).toBeDefined();
      expect(passengerData.person.firstName).toBe(person.toValue().firstName);
      expect(passengerData.person.lastName).toBe(person.toValue().lastName);
      expect(passengerData.person.latitude).toBe(person.toValue().latitude);
      expect(passengerData.person.longitude).toBe(person.toValue().longitude);
    });
  });
});
