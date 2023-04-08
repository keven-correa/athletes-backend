import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { Status } from '../enums/enum.therapy';

export class UpdateTherapyDto {
  @IsOptional()
  @ApiProperty()
  @MaxLength(255)
  remarks?: string;

  @IsOptional()
  @ApiProperty()
  end_time: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  therapist: number;

  @ApiProperty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  athlete: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  evaluation: number;
}
