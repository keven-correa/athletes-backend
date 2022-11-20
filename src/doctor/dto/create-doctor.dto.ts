import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { doctorsTypes } from '../enums/enums';

export class CreateDoctorDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('DO')
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @ApiProperty()
  doctorType: doctorsTypes;
}
