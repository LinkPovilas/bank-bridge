import { Exclude, Expose, Transform } from 'class-transformer';
import { mapToBankPaymentAuthorizationStatus } from '../utils/bank/bank-payment.utils';

@Exclude()
export class BankPaymentAuthorizationDto {
  @Expose()
  authorisationId: string;

  @Expose()
  @Transform(({ value }) => mapToBankPaymentAuthorizationStatus(value))
  status: string;

  @Expose()
  chosenScaMethod: string;

  constructor(data: BankPaymentAuthorizationDto) {
    Object.assign(this, data);
  }
}
