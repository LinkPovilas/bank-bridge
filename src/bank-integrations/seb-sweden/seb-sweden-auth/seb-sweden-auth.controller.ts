import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SebSwedenAuthService } from './seb-sweden-auth.service';
import { CreateBankAuthDto } from '../../../common/dto/create-bank-auth.dto';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '../../../common/enums/role.enum';

@ApiBasicAuth()
@ApiTags('seb-sweden')
@Roles(Role.SERVICE)
@Controller({ version: '1' })
export class SebSwedenAuthController {
  constructor(private readonly sebSwedenAuthService: SebSwedenAuthService) {}

  @Get('redirect')
  getRedirectUrl(@Query('state') state: string) {
    return this.sebSwedenAuthService.initiateRedirectFlow(state);
  }

  @Post('token')
  createAuth(@Body() createAuthDto: CreateBankAuthDto) {
    return this.sebSwedenAuthService.createAuth(createAuthDto.code);
  }
}
