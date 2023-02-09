import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Status } from '../enums/enum.therapy'

export class UpdateTherapyDto{
    @IsOptional()
    @ApiProperty()
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
    @IsEnum(Status)
    status: Status

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    athlete: number
}
