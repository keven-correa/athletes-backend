import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from "class-validator";
import { Speciality, Status } from "../enums/shift.enum";


export class UpdateShiftDto {

    // @ApiProperty()
    // @IsNotEmpty()
    // athlete: number

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Speciality)
    speciality: Speciality;

    @ApiProperty()
    @IsOptional()
    @MaxLength(255)
    remarks?: string;
}
