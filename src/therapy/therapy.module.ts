import { Module } from '@nestjs/common';
import { TherapyService } from './therapy.service';
import { TherapyController } from './therapy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Therapy } from './entities/therapy.entity';
// import { Doctor } from '../doctor/entities/doctor.entity';
import { Athlete } from '../athletes/entities/athlete.entity';

@Module({
  controllers: [TherapyController],
  providers: [TherapyService],
  imports: [TypeOrmModule.forFeature([Therapy, Athlete])],
  exports: [TypeOrmModule]
})
export class TherapyModule {}
