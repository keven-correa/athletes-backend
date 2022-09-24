import { Module } from '@nestjs/common';
import { ModalityService } from './modality.service';
import { ModalityController } from './modality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modality } from './entities/modality.entity';

@Module({
  controllers: [ModalityController],
  providers: [ModalityService],
  imports: [TypeOrmModule.forFeature([Modality])],
  exports: [TypeOrmModule]
})
export class ModalityModule {}
