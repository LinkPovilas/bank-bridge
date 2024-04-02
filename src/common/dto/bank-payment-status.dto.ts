import { Exclude, Expose } from 'class-transformer';
import { BankPaymentStatus } from '../enums/bank-payment-status.enum';

@Exclude()
export class BankPaymentStatusDto {
  @Expose()
  paymentId: string;

  @Expose()
  status: BankPaymentStatus;

  constructor(data: BankPaymentStatusDto) {
    Object.assign(this, data);
  }
}
