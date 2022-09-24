import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { AthletesService } from './athletes.service';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';

@Controller('athletes')
export class AthleteController {
  constructor(private readonly athletesService: AthletesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAthleteDto: CreateAthleteDto) {
    return this.athletesService.create(createAthleteDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.athletesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.athletesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAthleteDto: UpdateAthleteDto) {
    return this.athletesService.update(id, updateAthleteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.athletesService.remove(id);
  }
}
