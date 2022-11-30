import { Module } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { AthleteController } from './athlete.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Athlete } from './entities/athlete.entity';
import { Appointment } from '../appointment/entities/appointment.entity';
import { Therapy } from '../therapy/entities/therapy.entity';
import { DisciplineService } from '../discipline/discipline.service';
import { DisciplineModule } from '../discipline/discipline.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [AthleteController],
  providers: [AthletesService, DisciplineService],
  imports: [
    DisciplineModule,
    TypeOrmModule.forFeature([Athlete, Appointment, Therapy]),
    AuthModule
  ],
  exports: [TypeOrmModule, AthletesService]
})
export class AthleteModule {}
