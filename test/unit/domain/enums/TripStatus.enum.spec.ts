import { DriverStatus } from '../../../../src/domain/enums/driverStatus.enum';

describe('DriverStatus Enum', () => {
  it('should have correct values', () => {
    expect(DriverStatus.Available).toBe('Available');
    expect(DriverStatus.Unavailable).toBe('Unavailable');
  });
});
