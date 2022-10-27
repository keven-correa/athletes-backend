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
} from '@nestjs/common';
import { GetUserDecorator } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/user.roles';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Discipline')
@Controller('discipline')
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @Post()
  @Auth(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createDisciplineDto: CreateDisciplineDto,
    @GetUserDecorator() user: User,
  ) {
    return this.disciplineService.create(createDisciplineDto, user);
  }

  @Get()
  @Auth(Role.Admin, Role.GeneralystPhysiciann, Role.Physiotherapist, Role.Secretary)
  findAll() {
    return this.disciplineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disciplineService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDisciplineDto: UpdateDisciplineDto,
  ) {
    return this.disciplineService.update(+id, updateDisciplineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disciplineService.remove(+id);
  }
}
