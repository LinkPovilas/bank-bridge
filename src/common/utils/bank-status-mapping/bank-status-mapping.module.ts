import { Module } from '@nestjs/common';
import { BankStatusMappingService } from './bank-status-mapping.service';

@Module({
  providers: [BankStatusMappingService],
  exports: [BankStatusMappingService],
})
export class BankPaymentMappingModule {}
