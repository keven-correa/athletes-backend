import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

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

}
