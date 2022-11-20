import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../auth/enums/user.roles';
import { Auth } from '../auth/decorators/auth.decorator';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { GetUserDecorator } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@ApiTags('Doctor')
@ApiBearerAuth("Bearer")
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @Auth(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({summary: 'Create new doctor'})
  create(@Body() createDoctorDto: CreateDoctorDto, @GetUserDecorator() user: User) {
    return this.doctorService.create(createDoctorDto, user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Return all doctors'})
  findAll(@Query() paginationDto: PaginationDto) {
    return this.doctorService.findAll(paginationDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Get one doctor by id'})
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({summary: 'Update a doctor'})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDoctorDto: UpdateDoctorDto, @GetUserDecorator() user: User) {
    return this.doctorService.update(id, updateDoctorDto, user);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Delete doctor - THIS ENDPOINT MAY NOT BE PERMANENT '})
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.doctorService.remove(id);
  }
}
