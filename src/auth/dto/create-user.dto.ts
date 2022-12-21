import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "../enums/user.roles";

//TODO: create a dto class for each user type (Secretary | Admin | Physician | Physiotherapist) TO BE DEFINED!
export class CreateUserDto {
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string;
    
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @ApiProperty()
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    firstName: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    lastName: string;

    @IsEnum(Role)
    @IsOptional()
    @ApiProperty()
    role: Role
}
