import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateDisciplineDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(200)
    description?: string;
}
