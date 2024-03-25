import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BankPaymentAuthorizationMethodsDto {
  @Expose()
  authorizationId?: string;

  @Expose()
  scaMethods: string[];

  constructor(data: BankPaymentAuthorizationMethodsDto) {
    Object.assign(this, data);
  }
}
