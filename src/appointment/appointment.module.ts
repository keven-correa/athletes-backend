import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Athlete } from '../athletes/entities/athlete.entity';
import { AuthModule } from '../auth/auth.module';
import { AthleteModule } from '../athletes/athletes.module';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService],
  imports: [TypeOrmModule.forFeature([Appointment, Athlete]), AuthModule, AthleteModule],
  exports: [TypeOrmModule]
})
export class AppointmentModule {}
