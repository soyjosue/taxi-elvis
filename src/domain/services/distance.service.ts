export abstract class DistanceService {
  abstract calculateDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number },
  ): number;
}
