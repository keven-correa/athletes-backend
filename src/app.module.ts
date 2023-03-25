import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthleteModule } from './athletes/athletes.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointment/appointment.module';
import { TherapyModule } from './therapy/therapy.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { DisciplineModule } from './discipline/discipline.module';
import { DisciplineService } from './discipline/discipline.service';
import { ShiftsModule } from './shifts/shifts.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),
    AthleteModule,
    CommonModule,
    AuthModule,
    AppointmentModule,
    TherapyModule,
    EvaluationModule,
    DisciplineModule,
    ShiftsModule,
  ],
  controllers: [],
  providers: [DisciplineService],
})
export class AppModule {}