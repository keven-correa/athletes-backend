import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { PriorityLevel } from '../enums/enum.appointment';

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

  @IsEnum(PriorityLevel)
  @IsNotEmpty()
  @ApiProperty()
  priority: PriorityLevel;

  @IsInt()
  @ApiProperty()
  athlete: number;

  @IsInt()
  @ApiProperty()
  assigned_to: number;
}
