import { Module } from '@nestjs/common';
import { DiagnosticsService } from './diagnostics.service';
import { DiagnosticsController } from './diagnostics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnostic } from './entities/diagnostic.entity';

@Module({
  controllers: [DiagnosticsController],
  providers: [DiagnosticsService],
  imports: [TypeOrmModule.forFeature([Diagnostic])],
  exports: [DiagnosticsService]
})
export class DiagnosticsModule {}
