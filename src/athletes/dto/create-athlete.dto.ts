import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
  Max,
  MaxLength,
} from 'class-validator';
import {
  BloodType,
  Gender,
  LevelOfSchooling,
  MaritalStatus,
  
} from '../enums/enum';

export class CreateAthleteDto {
  @IsNotEmpty()
  @MaxLength(35)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @MaxLength(35)
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @Length(11)
  @ApiProperty()
  document: string;

  @IsNotEmpty()
  @ApiProperty()
  age: number;

  @IsDate()
  @ApiProperty()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsEnum(MaritalStatus)
  @ApiProperty()
  maritalStatus: MaritalStatus;

  // @IsEnum(PatientType)
  // @ApiProperty()
  // patientType: PatientType;

  @IsEnum(LevelOfSchooling)
  @ApiProperty()
  levelOfSchooling: LevelOfSchooling;

  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsMobilePhone()
  @ApiProperty()
  cell: string;

  @ApiProperty()
  @IsPhoneNumber('DO')
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(BloodType)
  bloodType: BloodType;

  @IsNotEmpty()
  @ApiProperty()
  weight: number;

  @IsNotEmpty()
  @ApiProperty()
  height: number;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  isActive: boolean;

  @IsNotEmpty()
  @ApiProperty()
  disciplineId: number;

  birthPlace: string;

  @IsOptional()
  @IsEnum(Gender)
  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  @IsOptional()
  modality: string;

  @IsOptional()
  @ApiProperty()
  sportAge: string;

  @ApiProperty()
  @IsOptional()
  practiceHours: string;

  @IsOptional()
  @ApiProperty()
  practiceDays: string;

  @IsOptional()
  @ApiProperty()
  medicalInsurance: string;

  @IsOptional()
  @ApiProperty()
  studyHours: string;

  @IsOptional()
  @ApiProperty()
  studyDays: string;

  @IsOptional()
  @ApiProperty()
  TA: string;

  @IsOptional()
  @ApiProperty()
  FC: string;

  @IsOptional()
  @ApiProperty()
  FR: string;

  @IsOptional()
  @ApiProperty()
  temperature: string;
}
