import { Module } from '@nestjs/common';
import { AthletesService } from './athletes.service';
import { AthleteController } from './athlete.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Athletes } from './entities/athlete.entity';

@Module({
  controllers: [AthleteController],
  providers: [AthletesService],
  imports: [
    TypeOrmModule.forFeature([Athletes])
  ]
})
export class AthleteModule {}
