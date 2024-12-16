import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CompleteTripUseCase } from 'src/application/trip/complete/completeTrip.useCase';
import { CompleteTripUseCaseRequestDto } from 'src/application/trip/complete/completeTrip.useCase.request.dto';
import { CompleteTripUseCaseResponseDto } from 'src/application/trip/complete/completeTrip.useCase.response.dto';
import { CreateTripUseCase } from 'src/application/trip/create/createTrip.useCase';
import { CreateTripUseCaseRequestDto } from 'src/application/trip/create/createTrip.useCase.request.dto';
import { CreateTripUseCaseResponseDto } from 'src/application/trip/create/createTrip.useCase.response.dto';
import { GetTripInProgressUseCase } from 'src/application/trip/getInProgress/getTripInProgress.useCase';
import { GetTripInProgressUseCaseResponseDto } from 'src/application/trip/getInProgress/getTripInProgress.useCase.response.dto';

@Controller('trips')
export class TripController {
  constructor(
    private createTripUseCase: CreateTripUseCase,
    private completeTripUseCase: CompleteTripUseCase,
    private getTripInProgress: GetTripInProgressUseCase,
  ) {}

  @Get('inProgress')
  @ApiOperation({
    summary: 'Get trip in progress',
    description: 'Retrieve the details of the current trip in progress.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the trip in progress',
    type: GetTripInProgressUseCaseResponseDto,
  })
  async getInProgress(): Promise<GetTripInProgressUseCaseResponseDto> {
    return await this.getTripInProgress.execute();
  }

  @Post()
  @HttpCode(202)
  @ApiOperation({
    summary: 'Create a new trip',
    description: 'Creates a new trip with the provided details.',
  })
  @ApiBody({
    description: 'Details of the trip to be created',
    type: CreateTripUseCaseRequestDto,
  })
  @ApiResponse({
    status: 202,
    description: 'Trip created successfully',
    type: CreateTripUseCaseResponseDto,
  })
  async create(
    @Body() requestDto: CreateTripUseCaseRequestDto,
  ): Promise<CreateTripUseCaseResponseDto> {
    return await this.createTripUseCase.execute(requestDto);
  }

  @Put(':id/complete')
  @ApiOperation({
    summary: 'Complete a trip',
    description: 'Marks a trip as completed based on the provided trip ID.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the trip',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    description: 'Details required to complete the trip',
    type: CompleteTripUseCaseRequestDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Trip completed successfully',
    type: CompleteTripUseCaseResponseDto,
  })
  async complete(
    @Param() requestDto: CompleteTripUseCaseRequestDto,
  ): Promise<CompleteTripUseCaseResponseDto> {
    return await this.completeTripUseCase.execute(requestDto);
  }
}
