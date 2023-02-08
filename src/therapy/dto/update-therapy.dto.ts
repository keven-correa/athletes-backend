import { IsEnum, IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Status } from '../enums/enum.therapy';


export class UpdateTherapyDto{
    @IsOptional()
    @MaxLength(255)
    remarks?: string

    @IsNotEmpty()
    schedulingDate: Date

    @IsNotEmpty()
    @IsInt()
    therapist: number

    @IsEnum(Status)
    status: Status

    @IsNotEmpty()
    @IsInt()
    athlete: number
}
