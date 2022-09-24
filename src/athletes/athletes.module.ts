import { Module } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { AthleteController } from './athlete.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Athlete } from './entities/athlete.entity';
import { Appointment } from '../appointment/entities/appointment.entity';
import { Therapy } from '../therapy/entities/therapy.entity';

@Module({
  controllers: [AthleteController],
  providers: [AthletesService],
  imports: [
    TypeOrmModule.forFeature([Athlete, Appointment, Therapy])
  ],
  exports: [TypeOrmModule]
})
export class AthleteModule {}
