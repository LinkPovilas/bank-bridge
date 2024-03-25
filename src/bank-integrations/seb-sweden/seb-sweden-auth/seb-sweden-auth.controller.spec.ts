import { Test, TestingModule } from '@nestjs/testing';
import { SebSwedenAuthController } from './seb-sweden-auth.controller';

describe('SebSwedenAuthController', () => {
  let controller: SebSwedenAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SebSwedenAuthController],
    }).compile();

    controller = module.get<SebSwedenAuthController>(SebSwedenAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
