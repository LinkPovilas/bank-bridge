import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BankAuthRedirectDto {
  @Expose()
  readonly state: string;

  @Expose()
  readonly scaRedirect: string;

  constructor(data: BankAuthRedirectDto) {
    Object.assign(this, data);
  }
}
