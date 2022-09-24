import { PartialType } from '@nestjs/mapped-types';
import { CreateTherapyDto } from './create-therapy.dto';

export class UpdateTherapyDto extends PartialType(CreateTherapyDto) {}
