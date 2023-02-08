import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class CreateTherapyDto {
    @ApiProperty()
    @IsOptional()
    @MaxLength(255)
    remarks?: string

    @IsNotEmpty()
    @ApiProperty()
    schedulingDate: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    therapist: number

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    athlete: number


}
