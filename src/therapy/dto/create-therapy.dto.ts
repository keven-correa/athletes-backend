import { IsDate, IsInt, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateTherapyDto {
    @IsOptional()
    @MaxLength(255)
    remarks?: string

    @IsNotEmpty()
    schedulingDate: Date

    @IsNotEmpty()
    @IsInt()
    therapist: number

    @IsNotEmpty()
    @IsInt()
    athlete: number


}
