import { Trip } from '../entities/Trip';

export abstract class TripRepository {
  abstract getByIdAsync(id: string): Promise<Trip>;
  abstract getInProgressAsync(): Promise<Trip[]>;
  abstract createAsync(trip: Trip): Promise<Trip>;
  abstract completeAsync(id: string): Promise<Trip>;
}
