import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";



export class InactivaAthleteDto {
  @IsNotEmpty()
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  isActive: boolean
}