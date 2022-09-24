import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthleteModule } from './athletes/athletes.module';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { ModalityModule } from './modality/modality.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { TherapyModule } from './therapy/therapy.module';
import { EvaluationModule } from './evaluation/evaluation.module';

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
      synchronize: true
    }),
    AthleteModule,
    CommonModule,
    AuthModule,
    ModalityModule,
    DoctorModule,
    AppointmentModule,
    TherapyModule,
    EvaluationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
