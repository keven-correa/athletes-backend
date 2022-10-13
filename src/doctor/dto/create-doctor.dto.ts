import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { doctorsTypes } from "../enums/enums";

export class CreateDoctorDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber('DO')
    phone: string;

    @IsNotEmpty()
    doctorType: doctorsTypes

}
