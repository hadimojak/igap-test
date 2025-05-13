import { Test, TestingModule } from '@nestjs/testing';
import { SddController } from './sdd.controller';

describe('SddController', () => {
  let controller: SddController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SddController],
    }).compile();

    controller = module.get<SddController>(SddController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
