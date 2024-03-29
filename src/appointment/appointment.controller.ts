import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../auth/entities/user.entity';
import { GetUserDecorator } from '../auth/decorators/get-user.decorator';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/user.roles';

@ApiTags('Appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @Auth(Role.Admin, Role.Physiotherapist, Role.GeneralystPhysiciann)
  @ApiOperation({summary: 'Create a new appointment'})
  create(@Body() createAppointmentDto: CreateAppointmentDto, @GetUserDecorator() createdBy: User) {
    return this.appointmentService.create(createAppointmentDto, createdBy);
  }

  @Get()
  @ApiOperation({summary: 'Retrieve one list of all appointments'})
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get one appointment by id'})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.findOne(id);
  }

  @Get('get-appointments-by-athlete/:id')
  findAllByAthlete(@Param('id', ParseIntPipe) id: number){
    return this.appointmentService.getAppointmentsByAthleteId(id);
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update data of an appointment'})
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  @Auth(Role.Admin, Role.Physiotherapist, Role.GeneralystPhysiciann)
  @ApiOperation({summary: 'Delete an appointment'})
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
