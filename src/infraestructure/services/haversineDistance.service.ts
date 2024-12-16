import { DistanceService } from 'src/domain/services/distance.service';

export class HaversineDistanceService extends DistanceService {
  calculateDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number },
  ): number {
    if (point1 == point2) return 0;

    const earthRadius = 6371e3;
    const lat1InRadians = (point1.lat * Math.PI) / 180;
    const lat2InRadians = (point2.lat * Math.PI) / 180;
    const deltaLatitude = ((point2.lat - point1.lat) * Math.PI) / 180;
    const deltaLongitude = ((point2.lng - point1.lng) * Math.PI) / 180;

    const a =
      Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
      Math.cos(lat1InRadians) *
        Math.cos(lat2InRadians) *
        Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance / 1000;
  }
}
