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
import { TherapyService } from './therapy.service';
import { CreateTherapyDto } from './dto/create-therapy.dto';
import { UpdateTherapyDto } from './dto/update-therapy.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUserDecorator } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/user.roles';

//TODO create endpoints for manage Therapies
@ApiTags('Therapy')
@Controller('therapy')
export class TherapyController {
  constructor(private readonly therapyService: TherapyService) {}

  @Post()
  @Auth(Role.Admin)
  @ApiOperation({summary: 'create new therapy'})
  create(@Body() createTherapyDto: CreateTherapyDto, @GetUserDecorator() user: User) {
    return this.therapyService.create(createTherapyDto, user);
  }

  @Get()
  @ApiOperation({summary: 'Get all therapies'})
  findAll() {
    return this.therapyService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get therapy by id'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.therapyService.findOne(id);
  }
  // TODO: ?????
  // @Patch(':id')
  // @ApiOperation({summary: 'Not implemented 🛑🚧'})
  // update(@Param('id') id: string, @Body() updateTherapyDto: UpdateTherapyDto) {
  //   return this.therapyService.update(+id, updateTherapyDto);
  // }

  // @Delete(':id')
  // @ApiOperation({summary: 'Not implemented 🛑🚧'})
  // remove(@Param('id') id: string) {
  //   return this.therapyService.remove(+id);
  // }
}
