import { Test, TestingModule } from '@nestjs/testing';
import { SuggestedMuviesController } from './suggested-muvies.controller';

describe('SuggestedMuviesController', () => {
  let controller: SuggestedMuviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuggestedMuviesController],
    }).compile();

    controller = module.get<SuggestedMuviesController>(SuggestedMuviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
