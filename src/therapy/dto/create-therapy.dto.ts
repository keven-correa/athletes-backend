import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateTherapyDto {
  @ApiProperty()
  @IsOptional()
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
  @IsNotEmpty()
  @IsInt()
  athlete: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  evaluation: number;
}
