import { forwardRef, Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { Athlete } from '../athletes/entities/athlete.entity';
import { AuthModule } from '../auth/auth.module';
import { AthleteModule } from '../athletes/athletes.module';

@Module({
  controllers: [EvaluationController],
  providers: [EvaluationService],
  imports: [
    TypeOrmModule.forFeature([Evaluation, Athlete]),
    AuthModule,
    AthleteModule,
  ],
  exports: [TypeOrmModule],
})
export class EvaluationModule {}
