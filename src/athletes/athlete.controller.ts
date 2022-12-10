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
import { PaginationDto } from '../common/dtos/pagination.dto';
import { AthletesService } from './athletes.service';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/user.roles';
import { GetUserDecorator } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InactivaAthleteDto } from './dto/inactivate-athlete.dto';

@ApiTags('Athletes')
@ApiBearerAuth("Bearer")
@Controller('athletes')
export class AthleteController {
  constructor(private readonly athletesService: AthletesService) {}

  @Post()
  @Auth(Role.Secretary, Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: 'Create a new Athlete'})
  async create(
    @Body() createAthleteDto: CreateAthleteDto,
    @GetUserDecorator() user: User,
  ) {
    return await this.athletesService.create(createAthleteDto, user);
  }

  @Get()
  @Auth(Role.Secretary, Role.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Retrieve a list of athletes'})
  findAll(@Query() paginationDto: PaginationDto) {
    return this.athletesService.findAll(paginationDto);
  }

  @Get(':id')
  @Auth(Role.Secretary, Role.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get data of athlete by id'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.athletesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Auth(Role.Secretary, Role.Admin)
  @ApiOperation({summary: 'update data of athlete'})
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAthleteDto: UpdateAthleteDto,
    @GetUserDecorator() user: User,
  ) {
    return this.athletesService.update(id, updateAthleteDto, user);
  }

  // @Patch(':id')
  // @HttpCode(HttpStatus.OK)
  // @Auth(Role.Admin)
  // inactivateUser(@Param('id', ParseIntPipe) id: number, @Body() inactivateAthleteDto: InactivaAthleteDto, @GetUserDecorator() user: User){
  //   return this.athletesService.inactivate(id, inactivateAthleteDto, user)
  // }
  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.athletesService.remove(id);
  // }
}
