import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TherapyService } from './therapy.service';
import { CreateTherapyDto } from './dto/create-therapy.dto';
import { UpdateTherapyDto } from './dto/update-therapy.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Therapy')
@Controller('therapy')
export class TherapyController {
  constructor(private readonly therapyService: TherapyService) {}

  @Post()
  create(@Body() createTherapyDto: CreateTherapyDto) {
    return this.therapyService.create(createTherapyDto);
  }

  @Get()
  findAll() {
    return this.therapyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.therapyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTherapyDto: UpdateTherapyDto) {
    return this.therapyService.update(+id, updateTherapyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.therapyService.remove(+id);
  }
}
