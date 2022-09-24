import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateModalityDto {

    @IsNotEmpty()
    @MaxLength(35)
    name: string

}
