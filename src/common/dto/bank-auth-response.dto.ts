import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BankAuthDto {
  @Expose()
  readonly accessToken: string;

  @Expose()
  readonly refreshToken: string;

  @Expose()
  readonly scopes: string;

  @Expose()
  readonly accessTokenValidUntil: string;

  @Expose()
  readonly refreshTokenValidUntil: string;

  constructor(data: BankAuthDto) {
    Object.assign(this, data);
  }
}
