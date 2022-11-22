import { Test, TestingModule } from '@nestjs/testing';
import { SuggestedMuviesService } from './suggested-muvies.service';

describe('SuggestedMuviesService', () => {
  let service: SuggestedMuviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuggestedMuviesService],
    }).compile();

    service = module.get<SuggestedMuviesService>(SuggestedMuviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
