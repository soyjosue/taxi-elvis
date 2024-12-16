import { Driver } from '../entities/Driver';
import { DriverStatus } from '../enums/driverStatus.enum';

export abstract class DriverRepository {
  abstract getAllAsync(): Promise<Driver[]>;
  abstract getByStatusAsync(status: DriverStatus): Promise<Driver[]>;
  abstract getAvailableInRadiusAsync(
    latitude: number,
    longitude: number,
    radiusInKm: number,
  ): Promise<Driver[]>;
  abstract getByIdAsync(id: string): Promise<Driver>;
}
