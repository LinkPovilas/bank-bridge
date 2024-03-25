import { Controller, Get, Headers } from '@nestjs/common';
import { SebSwedenAccountsService } from './seb-sweden-accounts.service';
import { ApiTags } from '@nestjs/swagger';
import { HeaderName } from '../../../common/enums/header-name.enum';

@ApiTags('seb-sweden')
@Controller({ version: '1' })
export class SebSwedenAccountsController {
  constructor(
    private readonly sebSwedenAccountsService: SebSwedenAccountsService,
  ) {}

  @Get()
  getAccounts(
    @Headers(HeaderName.END_USER_IP_ADDRESS) endUserIpAddress: string,
    @Headers(HeaderName.BANK_ACCESS_TOKEN) bankAccessToken: string,
  ) {
    return this.sebSwedenAccountsService.getAccounts(
      bankAccessToken,
      endUserIpAddress,
    );
  }
}
