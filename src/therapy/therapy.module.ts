import { Module } from '@nestjs/common';
import { TherapyService } from './therapy.service';
import { TherapyController } from './therapy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Therapy } from './entities/therapy.entity';
import { Athlete } from '../athletes/entities/athlete.entity';
import { AuthModule } from '../auth/auth.module';
import { AthleteModule } from '../athletes/athletes.module';
import { Evaluation } from '../evaluation/entities/evaluation.entity';
import { EvaluationModule } from '../evaluation/evaluation.module';

@Module({
  controllers: [TherapyController],
  providers: [TherapyService],
  imports: [TypeOrmModule.forFeature([Therapy, Athlete, Evaluation]), AuthModule, AthleteModule, EvaluationModule],
  exports: [TypeOrmModule]
})
export class TherapyModule {}
