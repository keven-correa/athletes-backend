import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query, ParseIntPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { DisciplineService } from '../discipline/discipline.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { AthletesService } from './athletes.service';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { Discipline } from '../discipline/entities/discipline.entity';

@Controller('athletes')
export class AthleteController {
  constructor(private readonly athletesService: AthletesService, private disciplineService: DisciplineService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAthleteDto: CreateAthleteDto) {
    const getDiscipline = await this.disciplineService.findOne(createAthleteDto.disciplineId);
    if(!getDiscipline){
      throw new NotFoundException(`The discipline with id: ${createAthleteDto.disciplineId} not exists!`)
    }
    return await this.athletesService.create(createAthleteDto, getDiscipline);
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
