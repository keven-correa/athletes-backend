import { PartialType } from '@nestjs/mapped-types';
import { CreateModalityDto } from './create-modality.dto';

export class UpdateModalityDto extends PartialType(CreateModalityDto) {}
