import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsMobilePhone, IsNotEmpty, IsPhoneNumber, Length, Max, MaxLength } from "class-validator";
import { BloodType, LevelOfSchooling, MaritalStatus, PatientType } from "../enums/enum";

export class CreateAthleteDto {
    
  @IsNotEmpty()
  @MaxLength(35)
  name: string;

  @IsNotEmpty()
  @MaxLength(35)
  lastName: string;

  @IsNotEmpty()
  @Length(11)
  document: string;

  @IsNotEmpty()
  age: number;

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsEnum(MaritalStatus)
  maritalStatus: MaritalStatus;

  @IsEnum(PatientType)
  patientType: PatientType;

  @IsEnum(LevelOfSchooling)
  levelOfSchooling: LevelOfSchooling;

  @IsNotEmpty()
  address: string;

  @IsMobilePhone()
  cell: string;

  @IsPhoneNumber('DO')
  phone: string;

  @IsNotEmpty()
  @IsEnum(BloodType)
  bloodType: BloodType;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  height: number

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean

  @IsNotEmpty()
  disciplineId: number;
}
