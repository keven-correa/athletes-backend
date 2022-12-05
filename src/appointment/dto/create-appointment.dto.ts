import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  @MaxLength(200)
  @ApiProperty()
  reason: string;

  @IsNotEmpty()
  @MaxLength(200)
  @ApiProperty()
  diagnostic: string;

  @IsNotEmpty()
  @MaxLength(200)
  @IsOptional()
  @ApiProperty()
  notes?: string;

  @IsInt()
  @ApiProperty()
  athlete: number;

  @IsInt()
  @ApiProperty()
  assigned_to: number;
}
