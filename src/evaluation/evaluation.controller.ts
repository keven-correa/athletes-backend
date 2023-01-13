import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/user.roles';
import { GetUserDecorator } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { HttpCode } from '@nestjs/common/decorators';

@ApiTags('Evaluation')
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  @Auth(Role.Admin, Role.Physiotherapist)
  @HttpCode(201)
  @ApiOperation({summary: 'Create new evaluation'})
  create(@Body() createEvaluationDto: CreateEvaluationDto, @GetUserDecorator() user: User ) {
    return this.evaluationService.create(createEvaluationDto, user);
  }

  @Get()
  @Auth(Role.Admin, Role.Physiotherapist)
  @HttpCode(200)
  @ApiOperation({summary: 'Retrieve a list of all Evaluations'})
  findAll() {
    return this.evaluationService.findAll();
  }

  @Get(':id')
  @Auth(Role.Physiotherapist, Role.GeneralystPhysiciann)
  @ApiOperation({summary: 'Get an evaluation by id'})
  findOne(@Param('id', ParseIntPipe) id: number, ) {
    return this.evaluationService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.Physiotherapist, Role.GeneralystPhysiciann)
  @ApiOperation({summary: 'Update evaluation'})
  update(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.evaluationService.update(+id, updateEvaluationDto);
  }

  @Delete(':id')
  @Auth(Role.Physiotherapist, Role.GeneralystPhysiciann)
  @ApiOperation({summary: 'Delete evaluation'})
  remove(@Param('id') id: string) {
    return this.evaluationService.remove(+id);
  }
}
