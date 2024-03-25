import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BankPaymentDto {
  @Expose()
  paymentId: string;

  @Expose()
  creditorName: string;

  @Expose()
  creditorIban: string;

  @Expose()
  debtorIban: string;

  @Expose()
  amount: string;

  @Expose()
  currency: string;

  @Expose()
  remittanceInformationUnstructured: string;

  @Expose()
  endToEndId: string;

  constructor(data: BankPaymentDto) {
    Object.assign(this, data);
  }
}
