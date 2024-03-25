import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SebSwedenPaymentsService } from './seb-sweden-payments.service';
import { CreateBankPaymentDto } from '../../../common/dto/create-bank-payment.dto';
import { HeaderName } from '../../../common/enums/header-name.enum';

@ApiTags('seb-sweden')
@Controller({ version: '1' })
export class SebSwedenPaymentsController {
  constructor(
    private readonly sebSwedenPaymentsService: SebSwedenPaymentsService,
  ) {}

  @Post()
  createPayment(
    @Body() createBankPaymentDto: CreateBankPaymentDto,
    @Headers(HeaderName.END_USER_IP_ADDRESS) endUserIpAddress: string,
    @Headers(HeaderName.BANK_ACCESS_TOKEN) bankAccessToken: string,
  ) {
    return this.sebSwedenPaymentsService.createPayment(
      bankAccessToken,
      endUserIpAddress,
      createBankPaymentDto,
    );
  }

  @Get(':paymentId')
  getPayment(
    @Param('paymentId') paymentId: string,
    @Headers(HeaderName.END_USER_IP_ADDRESS) endUserIpAddress: string,
    @Headers(HeaderName.BANK_ACCESS_TOKEN) bankAccessToken: string,
  ) {
    return this.sebSwedenPaymentsService.getPayment(
      bankAccessToken,
      endUserIpAddress,
      paymentId,
    );
  }

  @Get(':paymentId/status')
  getPaymentStatus(
    @Param('paymentId') paymentId: string,
    @Headers(HeaderName.END_USER_IP_ADDRESS) endUserIpAddress: string,
    @Headers(HeaderName.BANK_ACCESS_TOKEN) bankAccessToken: string,
  ) {
    return this.sebSwedenPaymentsService.getPaymentStatus(
      bankAccessToken,
      endUserIpAddress,
      paymentId,
    );
  }

  @Get(':paymentId/authorization-methods')
  getAuthorizationMethods(
    @Param('paymentId') paymentId: string,
    @Headers(HeaderName.END_USER_IP_ADDRESS) endUserIpAddress: string,
    @Headers(HeaderName.BANK_ACCESS_TOKEN) bankAccessToken: string,
  ) {
    return this.sebSwedenPaymentsService.getAuthorizationMethods(
      bankAccessToken,
      endUserIpAddress,
      paymentId,
    );
  }

  @Post(':paymentId/authorizations')
  createAuthorization(
    @Param('paymentId') paymentId: string,
    @Headers(HeaderName.END_USER_IP_ADDRESS) endUserIpAddress: string,
    @Headers(HeaderName.BANK_ACCESS_TOKEN) bankAccessToken: string,
  ) {
    return this.sebSwedenPaymentsService.createAuthorization(
      bankAccessToken,
      endUserIpAddress,
      paymentId,
    );
  }

  @Get(':paymentId/authorizations/:authorizationId')
  getAuthorization(
    @Param('authorizationId') authorizationId: string,
    @Param('paymentId') paymentId: string,
    @Headers(HeaderName.END_USER_IP_ADDRESS) endUserIpAddress: string,
    @Headers(HeaderName.BANK_ACCESS_TOKEN) bankAccessToken: string,
  ) {
    return this.sebSwedenPaymentsService.getAuthorization(
      bankAccessToken,
      endUserIpAddress,
      paymentId,
      authorizationId,
    );
  }
}
