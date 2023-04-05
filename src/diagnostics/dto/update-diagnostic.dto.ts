import { PartialType } from '@nestjs/swagger';
import { CreateDiagnosticDto } from './create-diagnostic.dto';

export class UpdateDiagnosticDto extends PartialType(CreateDiagnosticDto) {}
