import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  ParseIntPipe,
  BadRequestException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { DisciplineService } from '../discipline/discipline.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { AthletesService } from './athletes.service';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/user.roles';
import { GetUserDecorator } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('athletes')
export class AthleteController {
  constructor(private readonly athletesService: AthletesService) {}

  @Post()
  @Auth(Role.Secretary, Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAthleteDto: CreateAthleteDto, @GetUserDecorator() user: User ) {
    return await this.athletesService.create(createAthleteDto, user);
  }

  @Get()
  @Auth(Role.Secretary, Role.Admin)
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAthleteDto: UpdateAthleteDto,
    @GetUserDecorator() user: User
  ) {
    return this.athletesService.update(id, updateAthleteDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.athletesService.remove(id);
  }
}
