import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom, map } from 'rxjs';
import { sebSwedenRoute } from '../../../common/constants/bank/seb-sweden-route.const';
import { randomUUID } from 'node:crypto';
import { SebSwedenAccountsResponse } from './interfaces/seb-sweden-accounts-response.interface';
import { BankAccountDto } from '../../../common/dto/bank-account.dto';
import { SebSwedenAccountProduct } from './enums/seb-sweden-account-product.enum';
import { HttpClientService } from '../../../common/utils/http/http-client.service';

@Injectable()
export class SebSwedenAccountsService {
  constructor(private readonly httpClient: HttpClientService) {}

  getAccounts(bankAccessToken: string, endUserIpAddress: string) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${bankAccessToken}`,
        'PSU-IP-Address': endUserIpAddress,
        'X-Request-ID': randomUUID(),
      },
    };

    return firstValueFrom(
      this.httpClient
        .get<SebSwedenAccountsResponse>(sebSwedenRoute.accounts(), config)
        .pipe(
          map(({ data }) => data.accounts),
          map((accounts) =>
            accounts.filter((account) =>
              Object.values(SebSwedenAccountProduct).includes(account.product),
            ),
          ),
          map((accounts) =>
            accounts.map((account) => new BankAccountDto(account)),
          ),
        ),
    );
  }
}
