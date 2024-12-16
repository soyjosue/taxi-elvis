import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAllPassengersUseCase } from 'src/application/passenger/getAll/getAllPassengers.useCase';
import { GetAllPassengersUseCaseResponseDto } from 'src/application/passenger/getAll/getAllPassengers.useCase.response.dto';
import { GetByIdPassengerUseCase } from 'src/application/passenger/getById/getByIdPassenger.useCase';
import { GetByIdPassengerUseCaseResponseDto } from 'src/application/passenger/getById/getByIdPassenger.useCase.response.dto';
import { GetClosestDriversByPassengerUseCase } from 'src/application/passenger/getClosestDriversByPassenger/getClosestDriversByPassenger.useCase';
import { GetClosestDriversUseCaseResponseDto } from 'src/application/passenger/getClosestDriversByPassenger/getClosestDriversByPassenger.useCase.response.dto';
import { PassengerNotFoundException } from 'src/domain/exceptions/passenger/passengerNotFoundException';

@ApiTags('Passengers')
@Controller('passengers')
export class PassengerController {
  constructor(
    private getAllPassengersUseCase: GetAllPassengersUseCase,
    private getByIdPassengerUseCase: GetByIdPassengerUseCase,
    private getClosestDriversByPassenger: GetClosestDriversByPassengerUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all passengers',
    description: 'Fetches a list of all passengers and their details.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all passengers',
    type: GetAllPassengersUseCaseResponseDto,
  })
  async getAll(): Promise<GetAllPassengersUseCaseResponseDto> {
    return this.getAllPassengersUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a passenger by ID',
    description: 'Fetches the details of a specific passenger using their ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the passenger',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved passenger details',
    type: GetByIdPassengerUseCaseResponseDto,
  })
  async getById(
    @Param('id') id: string,
  ): Promise<GetByIdPassengerUseCaseResponseDto> {
    try {
      return this.getByIdPassengerUseCase.execute({ id: id });
    } catch (error) {
      if (error instanceof PassengerNotFoundException)
        throw new NotFoundException(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id/closestDrivers')
  @ApiOperation({
    summary: 'Retrieve closest drivers for a passenger',
    description:
      'Fetches a list of drivers closest to the given passenger by their ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the passenger',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved closest drivers',
    type: GetClosestDriversUseCaseResponseDto,
  })
  async getClosestDrivers(
    @Param('id') id: string,
  ): Promise<GetClosestDriversUseCaseResponseDto> {
    try {
      return await this.getClosestDriversByPassenger.execute({
        passengerId: id,
      });
    } catch (error) {
      if (error instanceof PassengerNotFoundException)
        throw new NotFoundException(error.message);

      throw new InternalServerErrorException(error.message);
    }
  }
}
