import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

//TODO create endpoints for manage Evaluations
@ApiTags('Evaluation')
@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  @ApiOperation({summary: 'Not implemented 🛑🚧'})
  create(@Body() createEvaluationDto: CreateEvaluationDto) {
    return this.evaluationService.create(createEvaluationDto);
  }

  @Get()
  @ApiOperation({summary: 'Not implemented 🛑🚧'})
  findAll() {
    return this.evaluationService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Not implemented 🛑🚧'})
  findOne(@Param('id') id: string) {
    return this.evaluationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Not implemented 🛑🚧'})
  update(
    @Param('id') id: string,
    @Body() updateEvaluationDto: UpdateEvaluationDto,
  ) {
    return this.evaluationService.update(+id, updateEvaluationDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Not implemented 🛑🚧'})
  remove(@Param('id') id: string) {
    return this.evaluationService.remove(+id);
  }
}
