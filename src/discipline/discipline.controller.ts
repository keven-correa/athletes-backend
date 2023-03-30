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
} from '@nestjs/common';
import { GetUserDecorator } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/user.roles';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../common/dtos/pagination.dto';

@ApiTags('Discipline')
@ApiBearerAuth("Bearer")
@Controller('discipline')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Post()
  @Auth(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: 'Create a new discipline'})
  create(
    @Body() createDisciplineDto: CreateDisciplineDto,
    @GetUserDecorator() user: User,
  ) {
    return this.disciplineService.create(createDisciplineDto, user);
  }

  @Get('all')
  @Auth(Role.Admin, Role.GeneralystPhysiciann, Role.Physiotherapist, Role.Secretary)
  @ApiOperation({summary: 'Get all disciplines'})
  findAll(@Query() paginationDto: PaginationDto) {
    return this.disciplineService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(Role.Admin, Role.GeneralystPhysiciann, Role.Physiotherapist, Role.Secretary)
  @ApiOperation({summary: 'Get one discipline by id '})
  findOne(@Param('id') id: string) {
    return this.disciplineService.findOne(+id);
  }

  //report
  @Get()
  // @Auth(Role.Admin)
  @ApiOperation({ summary: 'REPORTE -> Trae un conteo de los atletas pertenecientes a cada disciplina' })
  getCuantityOfAthletes(){
    return this.disciplineService.getDisciplines();
  }

  @Patch(':id')
  @Auth(Role.Admin)
  @ApiOperation({summary: 'Update discipline data '})
  update(
    @Param('id') id: number,
    @Body() updateDisciplineDto: UpdateDisciplineDto,
    @GetUserDecorator() user: User
  ) {
    return this.disciplineService.update(id, updateDisciplineDto, user);
  }

  @Delete(':id')
  @Auth(Role.Admin)
  @ApiOperation({summary: 'Delete discipline - THIS ENDPOINT MAY NOT BE PERMANENT '})
  remove(@Param('id') id: number) {
    return this.disciplineService.remove(id);
  }
}
