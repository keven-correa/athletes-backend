import { IsEnum, IsNotEmpty } from "class-validator";
import { Speciality, Status } from "../enums/shift.enum";


export class UpdateShiftDto {

    @IsNotEmpty()
    @IsEnum(Status)
    status: Status;

    @IsNotEmpty()
    @IsEnum(Speciality)
    speciality: Speciality;
}
