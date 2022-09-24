import { Test, TestingModule } from '@nestjs/testing';
import { TherapyController } from './therapy.controller';
import { TherapyService } from './therapy.service';

describe('TherapyController', () => {
  let controller: TherapyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TherapyController],
      providers: [TherapyService],
    }).compile();

    controller = module.get<TherapyController>(TherapyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
