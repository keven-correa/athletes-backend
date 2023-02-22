import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { TherapyService } from './therapy.service';
import { CreateTherapyDto } from './dto/create-therapy.dto';
import { UpdateTherapyDto } from './dto/update-therapy.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUserDecorator } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/user.roles';
import { TimeoutInterceptor } from '../common/interceptors/timeout.interceptor';

@ApiTags('Therapy')
@Controller('therapy')
export class TherapyController {
  constructor(private readonly therapyService: TherapyService) {}

  @Post()
  @Auth(Role.Admin, Role.Physiotherapist, Role.Secretary)
  @ApiOperation({summary: 'create new therapy'})
  create(@Body() createTherapyDto: CreateTherapyDto, @GetUserDecorator() user: User) {
    return this.therapyService.create(createTherapyDto, user);
  }

  @Get()
  // @Auth(Role.Admin, Role.Physiotherapist, Role.Secretary)
  @ApiOperation({summary: 'Get all therapies'})
  findAll() {
    return this.therapyService.findAll();
  }

  @Get(':id')
  // @Auth(Role.Admin, Role.Physiotherapist, Role.Secretary)
  @ApiOperation({summary: 'Get therapy by id'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.therapyService.findOne(id);
  }

  @Patch(':id')
  // @Auth(Role.Admin, Role.Physiotherapist, Role.Secretary)
  @ApiOperation({summary: 'Modifies therapy information'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTherapyDto: UpdateTherapyDto) {
    return this.therapyService.update(id, updateTherapyDto);
  }
  
}
