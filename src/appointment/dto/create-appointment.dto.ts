import { IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

//TODO: create a dto class for each user type (Secretary | Admin | Physician | Physiotherapist)
export class CreateAppointmentDto {
  @IsNotEmpty()
  @MaxLength(200)
  reason: string;

  @IsNotEmpty()
  @MaxLength(200)
  diagnostic: string;

  @IsNotEmpty()
  @MaxLength(200)
  @IsOptional()
  notes?: string;

  @IsInt()
  athlete: number;

  @IsInt()
  doctor: number;
}
