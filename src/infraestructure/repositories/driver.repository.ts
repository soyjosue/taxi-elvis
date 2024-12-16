import { InjectRepository } from '@nestjs/typeorm';
import { DriverRepository } from 'src/domain/repositories/driver.repository';
import { In, Repository } from 'typeorm';
import { DriverEntity } from '../entities/driver.entity';
import { Driver } from 'src/domain/entities/Driver';
import { Injectable } from '@nestjs/common';
import { DriverStatus } from 'src/domain/enums/driverStatus.enum';
import { DistanceService } from 'src/domain/services/distance.service';
import { DriverNotFoundException } from 'src/domain/exceptions/driver/driverNotFoundException';

@Injectable()
export class DriverDBRepository implements DriverRepository {
  constructor(
    @InjectRepository(DriverEntity)
    private driverRepository: Repository<DriverEntity>,
    private distanceService: DistanceService,
  ) {}
  async getByIdAsync(id: string): Promise<Driver> {
    const driver = await this.driverRepository.findOne({
      where: {
        id: id,
      },
      relations: ['person'],
    });

    if (!driver) {
      throw new DriverNotFoundException(id);
    }

    return new Driver(driver);
  }

  async getAvailableInRadiusAsync(
    latitude: number,
    longitude: number,
    radiusInKm: number,
  ): Promise<Driver[]> {
    const drivers = await this.driverRepository.find({
      where: {
        status: DriverStatus.Available,
      },
      relations: ['person'],
      select: {
        id: true,
        person: {
          latitude: true,
          longitude: true,
        },
      },
    });

    const driversAvailableInRadius = drivers.filter(
      (i) =>
        this.distanceService.calculateDistance(
          { lat: i.person.latitude, lng: i.person.longitude },
          { lat: latitude, lng: longitude },
        ) <= radiusInKm,
    );

    return (
      await this.driverRepository.find({
        where: {
          id: In([...driversAvailableInRadius.map((i) => i.id)]),
        },
        relations: ['person'],
      })
    ).map((i) => new Driver(i));
  }

  async getAllAsync(): Promise<Driver[]> {
    return (
      await this.driverRepository.find({
        relations: ['person'],
      })
    ).map((i) => new Driver(i));
  }

  async getByStatusAsync(status: DriverStatus): Promise<Driver[]> {
    return (
      await this.driverRepository.find({
        where: {
          status: status,
        },
        relations: ['person'],
      })
    ).map((i) => new Driver(i));
  }
}
