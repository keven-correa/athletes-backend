import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "../enums/user.roles";

export class UpdateUserDto {
    @IsString()
    @IsEmail()
    @ApiProperty()
    @IsOptional()

    email: string;
    
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @ApiProperty()
    @IsOptional()

    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @IsOptional()

    firstName: string;

    @IsString()
    @MinLength(1)
    @ApiProperty()
    @IsOptional()

    lastName: string;

    @IsEnum(Role)
    @IsOptional()
    @ApiProperty()
    role: Role
}