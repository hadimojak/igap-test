import { Test, TestingModule } from '@nestjs/testing';
import { SddService } from './sdd.service';

describe('SddService', () => {
  let service: SddService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SddService],
    }).compile();

    service = module.get<SddService>(SddService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
