import { Test, TestingModule } from '@nestjs/testing';
import { TherapyService } from './therapy.service';

describe('TherapyService', () => {
  let service: TherapyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TherapyService],
    }).compile();

    service = module.get<TherapyService>(TherapyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
