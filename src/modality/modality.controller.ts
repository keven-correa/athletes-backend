import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ModalityService } from './modality.service';
import { CreateModalityDto } from './dto/create-modality.dto';
import { UpdateModalityDto } from './dto/update-modality.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('modality')
export class ModalityController {
  constructor(private readonly modalityService: ModalityService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createModalityDto: CreateModalityDto) {
    return this.modalityService.create(createModalityDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.modalityService.findAll(paginationDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.modalityService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateModalityDto: UpdateModalityDto) {
    return this.modalityService.update(id, updateModalityDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.modalityService.remove(id);
  }
}
