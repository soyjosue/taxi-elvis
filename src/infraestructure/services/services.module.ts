import { Module } from '@nestjs/common';
import { DistanceService } from 'src/domain/services/distance.service';
import { HaversineDistanceService } from './haversineDistance.service';

const services = [
  { provide: DistanceService, useClass: HaversineDistanceService },
];

@Module({
  providers: [...services],
  exports: [...services],
})
export class ServicesModule {}
