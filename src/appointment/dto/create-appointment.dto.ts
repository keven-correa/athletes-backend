import { IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

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
  assigned_to: number;
}
