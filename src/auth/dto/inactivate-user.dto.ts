import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";



export class InactivateUserDto {
  @IsNotEmpty()
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()

  isActive: boolean
}