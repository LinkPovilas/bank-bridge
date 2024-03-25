import { Exclude, Expose } from 'class-transformer';
import { BankPaymentAuthorizationDto } from './bank-payment-authorization.dto';

@Exclude()
export class BankPaymentAuthorizationInfoDto extends BankPaymentAuthorizationDto {
  @Expose()
  scaRedirect?: string;

  constructor(data: BankPaymentAuthorizationInfoDto) {
    super(data);
    Object.assign(this, data);
  }
}
