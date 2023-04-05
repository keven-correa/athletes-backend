import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiagnosticsService } from './diagnostics.service';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto';

@Controller('diagnostics')
export class DiagnosticsController {
  constructor(private readonly diagnosticsService: DiagnosticsService) {}

  @Post()
  create(@Body() createDiagnosticDto: CreateDiagnosticDto) {
    return this.diagnosticsService.create(createDiagnosticDto);
  }

  @Get()
  findAll() {
    return this.diagnosticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diagnosticsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiagnosticDto: UpdateDiagnosticDto) {
    return this.diagnosticsService.update(+id, updateDiagnosticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosticsService.remove(+id);
  }
}
