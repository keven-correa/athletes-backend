import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from './entities/shift.entity';
import { AthleteModule } from '../athletes/athletes.module';

@Module({
  controllers: [ShiftsController],
  providers: [ShiftsService],
  imports: [
    TypeOrmModule.forFeature([Shift]),
    AthleteModule
  ]
})
export class ShiftsModule {}
