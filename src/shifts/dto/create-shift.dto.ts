import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Speciality, Status } from "../enums/shift.enum";

export class CreateShiftDto {

    @IsNotEmpty()
    athlete: number

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status

    @IsNotEmpty()
    @IsEnum(Speciality)
    speciality: Speciality

    @IsNotEmpty()
    @IsOptional()
    @MaxLength(400)
    @IsString()
    remarks?: string
}
