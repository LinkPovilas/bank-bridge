import { Exclude, Expose } from 'class-transformer';
import { BankPaymentAuthorizationStatus } from '../enums/bank-payment-authorization-status.enum';

@Exclude()
export class BankPaymentAuthorizationDto {
  @Expose()
  authorisationId: string;

  @Expose()
  status: BankPaymentAuthorizationStatus;

  @Expose()
  chosenScaMethod: string;

  constructor(data: BankPaymentAuthorizationDto) {
    Object.assign(this, data);
  }
}
