import { Test, TestingModule } from '@nestjs/testing';
import { SebSwedenAuthService } from './seb-sweden-auth.service';

describe('SebSwedenAuthService', () => {
  let service: SebSwedenAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SebSwedenAuthService],
    }).compile();

    service = module.get<SebSwedenAuthService>(SebSwedenAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
