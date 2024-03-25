import { Exclude, Expose, Transform } from 'class-transformer';
import { mapToBankPaymentStatus } from '../utils/bank/bank-payment.utils';

@Exclude()
export class BankPaymentStatusDto {
  @Expose()
  paymentId: string;

  @Expose()
  @Transform(({ value }) => mapToBankPaymentStatus(value))
  status: string;

  constructor(data: BankPaymentStatusDto) {
    Object.assign(this, data);
  }
}
