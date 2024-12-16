import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetAllDriversUseCase } from 'src/application/driver/getAll/getAllDrivers.useCase';
import { GetAllDriversUseCaseResponseDto } from 'src/application/driver/getAll/getAllDrivers.useCase.response.dto';
import { GetAllAvailableDriversUseCase } from 'src/application/driver/getAllAvailable/getAllAvailableDrivers.useCase';
import { GetAllAvailableDriversUseCaseResponseDto } from 'src/application/driver/getAllAvailable/getAllAvailableDrivers.useCase.response.dto';
import { GetAllAvailableDriversInRadiusUseCase } from 'src/application/driver/getAllAvailableInRadius/getAllAvailableInRadiusDrivers.useCase';
import { GetAllAvailableInRadiusDriversUseCaseResponseDto } from 'src/application/driver/getAllAvailableInRadius/getAllAvailableInRadiusDrivers.useCase.response.dto';
import { GetByIdDriverUseCase } from 'src/application/driver/getById/getDriverById.useCase';
import { getByIdDriverUseCaseResponseDto } from 'src/application/driver/getById/getDriverById.useCase.response.dto';

@ApiTags('Drivers')
@Controller('drivers')
export class DriverController {
  constructor(
    private readonly getAllDriversUseCase: GetAllDriversUseCase,
    private readonly getAllAvailableDrivers: GetAllAvailableDriversUseCase,
    private readonly getAllAvailableDriversInRadiusUseCase: GetAllAvailableDriversInRadiusUseCase,
    private readonly getByIdDriverUseCase: GetByIdDriverUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all drivers',
    description:
      'Fetches a list of all drivers with their status and personal details.',
  })
  async getAll(): Promise<GetAllDriversUseCaseResponseDto> {
    return await this.getAllDriversUseCase.execute();
  }

  @Get('available')
  @ApiOperation({
    summary: 'Retrieve all available drivers',
    description: 'Fetches a list of all currently available drivers.',
  })
  async getAllAvailable(): Promise<GetAllAvailableDriversUseCaseResponseDto> {
    return await this.getAllAvailableDrivers.execute();
  }

  @Get('available/radius/:latitude/:longitude')
  @ApiOperation({
    summary: 'Retrieve available drivers within a radius',
    description:
      'Fetches a list of all currently available drivers within a specific geographic radius based on latitude and longitude.',
  })
  @ApiParam({
    name: 'latitude',
    description: 'Latitude of the search area',
    example: 18.4655,
  })
  @ApiParam({
    name: 'longitude',
    description: 'Longitude of the search area',
    example: -66.1057,
  })
  async getAllAvaiableInRadius(
    @Param('latitude') latitude,
    @Param('longitude') longitude,
  ): Promise<GetAllAvailableInRadiusDriversUseCaseResponseDto> {
    return await this.getAllAvailableDriversInRadiusUseCase.execute({
      latitude,
      longitude,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve driver by ID',
    description: 'Fetches the details of a specific driver using their ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the driver',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  async getById(
    @Param('id') id: string,
  ): Promise<getByIdDriverUseCaseResponseDto> {
    return await this.getByIdDriverUseCase.execute({ id: id });
  }
}
