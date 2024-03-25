import { Inject, Injectable } from '@nestjs/common';
import sebSwedenConfig from '../../../config/banks/seb-sweden.config';
import { ConfigType } from '@nestjs/config';
import { SebSwedenTokenResponse } from './interfaces/seb-sweden-token-response.interface';
import { firstValueFrom, map } from 'rxjs';
import { AxiosRequestConfig } from 'axios';
import { sebSwedenRoute } from '../../../common/constants/seb-sweden-route.const';
import { BankAuthDto } from '../../../common/dto/bank-auth-response.dto';
import { BankAuthRedirectDto } from '../../../common/dto/bank-auth-redirect.dto';
import { HttpClientService } from '../../../common/utils/http/http-client.service';

@Injectable()
export class SebSwedenAuthService {
  constructor(
    private readonly httpClient: HttpClientService,
    @Inject(sebSwedenConfig.KEY)
    private bankConfig: ConfigType<typeof sebSwedenConfig>,
  ) {}

  initiateRedirectFlow(state: string) {
    const url = new URL(this.bankConfig.apiUrl);
    url.pathname = sebSwedenRoute.authorize();

    const urlParams = url.searchParams;
    urlParams.set('client_id', this.bankConfig.clientId);
    urlParams.set('scope', 'psd2_accounts psd2_payments');
    urlParams.set('response_type', 'code');
    urlParams.set('redirect_uri', this.bankConfig.redirectAuthUrl);
    urlParams.set('state', state);

    return new BankAuthRedirectDto({ state, scaRedirect: url.toString() });
  }

  async createAuth(code: string) {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        client_id: this.bankConfig.clientId,
        client_secret: this.bankConfig.clientSecret,
        code,
        redirect_uri: this.bankConfig.redirectAuthUrl,
        grant_type: 'authorization_code',
      },
    };

    const { access_token, refresh_token, scope, expires_in } =
      await firstValueFrom(
        this.httpClient
          .post<SebSwedenTokenResponse>(sebSwedenRoute.token(), config)
          .pipe(map(({ data }) => data)),
      );

    return new BankAuthDto({
      accessToken: access_token,
      refreshToken: refresh_token,
      scopes: scope,
      accessTokenValidUntil: this.getTokenExpirationDateString(expires_in),
      refreshTokenValidUntil: this.getRefreshTokenExpirationDate(),
    });
  }

  private getTokenExpirationDateString(expiresInMs: number) {
    return new Date(new Date().getTime() + expiresInMs).toISOString();
  }

  private getRefreshTokenExpirationDate() {
    const refreshTokenValidityInDays = 90;
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + refreshTokenValidityInDays);
    return currentDate.toISOString();
  }
}
