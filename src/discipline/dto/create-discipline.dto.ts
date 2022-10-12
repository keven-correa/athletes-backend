import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateDisciplineDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @MaxLength(200)
    description?: string;
}
