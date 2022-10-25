import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";



export class InactivateUserDto {
  @IsNotEmpty()
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean
}