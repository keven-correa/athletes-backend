import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
// import { Doctor } from '../doctor/entities/doctor.entity';
import { Athlete } from '../athletes/entities/athlete.entity';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [TypeOrmModule.forFeature([Appointment, Athlete])],
  exports: [TypeOrmModule]
})
export class AppointmentModule {}
