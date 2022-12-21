import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateEvaluationDto {

    @ApiProperty()
    @IsNotEmpty()
    therapeuticDiagnosis: string;

    @ApiProperty()
    @IsNotEmpty()
    treatment: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    ROM?: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    painLevel?: number;

    @ApiProperty()
    @IsOptional()
    remarks: string

    @ApiProperty()
    @IsOptional()
    @IsInt()
    numberOfTherapies?: number

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    assigned_to: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    athlete: number;
}
