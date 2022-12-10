import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TherapyService } from './therapy.service';
import { CreateTherapyDto } from './dto/create-therapy.dto';
import { UpdateTherapyDto } from './dto/update-therapy.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

//TODO create endpoints for manage Therapies
@ApiTags('Therapy')
@Controller('therapy')
export class TherapyController {
  constructor(private readonly therapyService: TherapyService) {}

  @Post()
  @ApiOperation({summary: 'Not implemented 🛑🚧'})
  create(@Body() createTherapyDto: CreateTherapyDto) {
    return this.therapyService.create(createTherapyDto);
  }

  @Get()
  @ApiOperation({summary: 'Not implemented 🛑🚧'})
  findAll() {
    return this.therapyService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Not implemented 🛑🚧'})
  findOne(@Param('id') id: string) {
    return this.therapyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Not implemented 🛑🚧'})
  update(@Param('id') id: string, @Body() updateTherapyDto: UpdateTherapyDto) {
    return this.therapyService.update(+id, updateTherapyDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Not implemented 🛑🚧'})
  remove(@Param('id') id: string) {
    return this.therapyService.remove(+id);
  }
}
