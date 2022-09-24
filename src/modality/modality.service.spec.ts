import { Test, TestingModule } from '@nestjs/testing';
import { ModalityService } from './modality.service';

describe('ModalityService', () => {
  let service: ModalityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModalityService],
    }).compile();

    service = module.get<ModalityService>(ModalityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
