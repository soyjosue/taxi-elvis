import { Driver } from '../../../../src/domain/entities/Driver';
import { Person } from '../../../../src/domain/entities/Person';
import { DriverStatus } from '../../../../src/domain/enums/driverStatus.enum';

describe('Driver.Entity', () => {
  let driver: Driver;

  beforeEach(() => {
    driver = Driver.create({
      status: DriverStatus.Available,
      person: new Person({
        firstName: 'Elvis',
        lastName: 'Inoa',
        latitude: 18.489,
        longitude: -69.929,
      }),
    });
  });

  describe('create', () => {
    it('should create a driver with the provider status and person', () => {
      expect(driver.toValue().status).toBe(DriverStatus.Available);
      expect(driver.toValue().person).toBeDefined();
      expect(driver.toValue().trips.length).toBe(0);
    });
  });

  describe('markAsUnavailable', () => {
    it('should mark the driver as unavailable', () => {
      driver.markAsUnavailable();
      expect(driver.toValue().status).toBe(DriverStatus.Unavailable);
    });
  });

  describe('markAsAvailable', () => {
    it('should mark the driver as available', () => {
      driver.markAsAvailable();
      expect(driver.toValue().status).toBe(DriverStatus.Available);
    });
  });

  describe('isAvailable', () => {
    it('should return true if the driver is available', () => {
      expect(driver.isAvailable()).toBeTruthy();
    });

    it('should return false if the driver is unavailable', () => {
      driver.markAsUnavailable();
      expect(driver.isAvailable()).toBeFalsy();
    });
  });
});
