import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, ParseIntPipe } from '@nestjs/common';
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
  @HttpCode(HttpStatus.OK)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.athletesService.findAll(paginationDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.athletesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAthleteDto: UpdateAthleteDto) {
    return this.athletesService.update(id, updateAthleteDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.athletesService.remove(id);
  }
}
