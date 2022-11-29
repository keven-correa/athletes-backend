import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { Athlete } from '../athletes/entities/athlete.entity';
// import { Doctor } from '../doctor/entities/doctor.entity';

@Module({
  controllers: [EvaluationController],
  providers: [EvaluationService],
  imports: [TypeOrmModule.forFeature([Evaluation, Athlete])],
})
export class EvaluationModule {}
