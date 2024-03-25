import { Test, TestingModule } from '@nestjs/testing';
import { SebSwedenPaymentsService } from './seb-sweden-payments.service';

describe('SebSwedenPaymentsService', () => {
  let service: SebSwedenPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SebSwedenPaymentsService],
    }).compile();

    service = module.get<SebSwedenPaymentsService>(SebSwedenPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
