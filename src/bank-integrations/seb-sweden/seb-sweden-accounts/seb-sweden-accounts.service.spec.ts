import { Test, TestingModule } from '@nestjs/testing';
import { SebSwedenAccountsService } from './seb-sweden-accounts.service';

describe('SebSwedenAccountsService', () => {
  let service: SebSwedenAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SebSwedenAccountsService],
    }).compile();

    service = module.get<SebSwedenAccountsService>(SebSwedenAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
