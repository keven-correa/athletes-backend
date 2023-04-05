import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateDiagnosticDto {
    @IsNotEmpty()
    @MaxLength(45)
    @MinLength(5)
    @IsString()
    name: string;
}
