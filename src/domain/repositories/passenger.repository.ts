import { Driver } from '../entities/Driver';
import { Passenger } from '../entities/Passenger';

export abstract class PassengerRepository {
  abstract getAllAsync(): Promise<Passenger[]>;
  abstract getByIdAsync(id: string): Promise<Passenger>;
  abstract getClosestDriversAsync(
    id: string,
    driverCount: number,
  ): Promise<{ driver: Driver; distance: number }[]>;
  abstract isOnATripAsync(id: string): Promise<boolean>;
}
