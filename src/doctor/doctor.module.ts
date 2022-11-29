import { Module } from '@nestjs/common';
// import { DoctorService } from './doctor.service';
// import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Doctor } from './entities/doctor.entity';
import { Appointment } from '../appointment/entities/appointment.entity';
import { Therapy } from '../therapy/entities/therapy.entity';

@Module({
  // controllers: [DoctorController],
  // providers: [DoctorService],
  imports: [TypeOrmModule.forFeature([ Appointment, Therapy])],
  exports: [TypeOrmModule]
})
export class DoctorModule {}
