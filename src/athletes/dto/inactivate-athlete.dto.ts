import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";



export class InactivaAthleteDto {
  @IsNotEmpty()
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean
}