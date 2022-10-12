import { Module } from '@nestjs/common';
import { DisciplineService } from './discipline.service';
import { DisciplineController } from './discipline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline } from './entities/discipline.entity';

@Module({
  controllers: [DisciplineController],
  providers: [DisciplineService],
  imports: [
    TypeOrmModule.forFeature([Discipline])
  ],
  exports: [DisciplineService, TypeOrmModule]
})
export class DisciplineModule {}
