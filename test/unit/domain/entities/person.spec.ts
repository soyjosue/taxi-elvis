import { Person, PrimitivePerson } from '../../../../src/domain/entities/Person';

describe('person', () => {
  let data: PrimitivePerson;

  beforeEach(() => {
    data = {
      firstName: 'Elvis',
      lastName: 'Inoa',
      latitude: 18.489,
      longitude: 18.489,
    };
  });

  describe('create', () => {
    it('should create a person with the provided attributes', () => {
      const person = Person.create(data);

      const {
        firstName,
        lastName,
        latitude,
        longitude,
        middleName,
        secondLastName,
      } = person.toValue();

      expect(firstName).toBe(data.firstName);
      expect(lastName).toBe(data.lastName);
      expect(latitude).toBe(data.latitude);
      expect(longitude).toBe(data.longitude);
      expect(middleName).toBe(data.middleName);
      expect(secondLastName).toBe(data.secondLastName);
    });

    it('should create a person with optional attributes if provided', () => {
      const personWithOptionalAttributes = Person.create({
        ...data,
        middleName: 'Josue',
        secondLastName: 'Santiago',
      });

      const {
        firstName,
        lastName,
        latitude,
        longitude,
        middleName,
        secondLastName,
      } = personWithOptionalAttributes.toValue();

      expect(firstName).toBe(data.firstName);
      expect(lastName).toBe(data.lastName);
      expect(latitude).toBe(data.latitude);
      expect(longitude).toBe(data.longitude);
      expect(middleName).toBe('Josue');
      expect(secondLastName).toBe('Santiago');
    });
  });

  describe('toValue', () => {
    it('should return the person attributes', () => {
      const person = Person.create(data);

      const {
        firstName,
        lastName,
        latitude,
        longitude,
        middleName,
        secondLastName,
      }: PrimitivePerson = person.toValue();

      expect(firstName).toBe(data.firstName);
      expect(lastName).toBe(data.lastName);
      expect(latitude).toBe(data.latitude);
      expect(longitude).toBe(data.longitude);
      expect(middleName).toBeUndefined();
      expect(secondLastName).toBeUndefined();
    });
  });
});
