export class PrimitivePerson {
  id?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  secondLastName?: string;
  latitude: number;
  longitude: number;
}

export class Person {
  constructor(private attributes: PrimitivePerson) {}

  static create(createPerson: {
    firstName: string;
    middleName?: string;
    lastName: string;
    secondLastName?: string;
    latitude: number;
    longitude: number;
  }): Person {
    return new Person({
      firstName: createPerson.firstName,
      middleName: createPerson.middleName,
      lastName: createPerson.lastName,
      secondLastName: createPerson.secondLastName,
      latitude: createPerson.latitude,
      longitude: createPerson.longitude,
    });
  }

  toValue(): PrimitivePerson {
    return this.attributes;
  }
}
