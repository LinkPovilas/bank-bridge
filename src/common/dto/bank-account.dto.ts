import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BankAccountDto {
  @Expose()
  resourceId?: string;

  @Expose()
  name: string;

  @Expose()
  iban: string;

  @Expose()
  currency: string;

  constructor(data: BankAccountDto) {
    Object.assign(this, data);
  }
}
