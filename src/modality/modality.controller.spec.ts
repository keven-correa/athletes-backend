import { Test, TestingModule } from '@nestjs/testing';
import { ModalityController } from './modality.controller';
import { ModalityService } from './modality.service';

describe('ModalityController', () => {
  let controller: ModalityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModalityController],
      providers: [ModalityService],
    }).compile();

    controller = module.get<ModalityController>(ModalityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
