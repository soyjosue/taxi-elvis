import { TripStatus } from '../../../../src/domain/enums/TripStatus.enum';

describe('TripStatus Enum', () => {
  it('should have correct values', () => {
    expect(TripStatus.InProgress).toBe('InProgress');
    expect(TripStatus.Completed).toBe('Completed');
  });
});
