import { DriverStatus } from 'src/domain/enums/driverStatus.enum';

export class getByIdDriverUseCaseResponseDto {
  driver: {
    id?: string;
    status: DriverStatus;
    person?: {
      firstName: string;
      middleName?: string;
      lastName: string;
      secondLastName?: string;
      latitude: number;
      longitude: number;
    };
  };
}
