import { Inject, Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { firstValueFrom, map } from 'rxjs';
import { sebSwedenRoute } from '../../../common/constants/seb-sweden-route.const';
import { randomUUID } from 'node:crypto';
import { CreateSebSwedenCreatePaymentRequest } from './interfaces/seb-sweden-create-payment-request.interface';
import { BankPayment } from '../../../common/interfaces/bank-payment.interface';
import { SebSwedenCreatePaymentAuthorizationRequest } from './interfaces/seb-sweden-create-payment-authorization-request.interface';
import { ConfigType } from '@nestjs/config';
import sebSwedenConfig from '../../../config/banks/seb-sweden.config';
import { BankPaymentDto } from '../../../common/dto/bank-payment.dto';
import { SebSwedenPayment } from './interfaces/seb-sweden-payment.interface';
import { SebSwedenPaymentInfo } from './interfaces/seb-sweden-payment-info.interface';
import { SebSwedenPaymentStatus } from './interfaces/seb-sweden-payment-status.interface';
import { BankPaymentStatusDto } from '../../../common/dto/bank-payment-status.dto';
import { BankPaymentAuthorizationDto } from '../../../common/dto/bank-payment-authorization.dto';
import { SebSwedenPaymentAuthorization } from './interfaces/seb-sweden-payment-authorization.interface';
import { BankPaymentAuthorizationInfoDto } from '../../../common/dto/bank-payment-authorization-info.dto';
import { SebSwedenPaymentAuthorizationInfo } from './interfaces/seb-sweden-payment-authorization-info.interface';
import { BankPaymentAuthorizationMethodsDto } from '../../../common/dto/bank-payment-authorization-methods.dto';
import { HttpClientService } from '../../../common/utils/http/http-client.service';

@Injectable()
export class SebSwedenPaymentsService {
  constructor(
    private readonly httpClient: HttpClientService,
    @Inject(sebSwedenConfig.KEY)
    private readonly bankConfig: ConfigType<typeof sebSwedenConfig>,
  ) {}

  createPayment(
    accessToken: string,
    psuIpAddress: string,
    bankPayment: BankPayment,
  ) {
    const config: AxiosRequestConfig<CreateSebSwedenCreatePaymentRequest> = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'PSU-IP-Address': psuIpAddress,
        'X-Request-ID': randomUUID(),
      },
      data: {
        creditorName: bankPayment.creditorName,
        creditorAccount: {
          iban: bankPayment.creditorIban,
        },
        debtorAccount: {
          iban: bankPayment.debtorIban,
        },
        endToEndIdentification: bankPayment.endToEndId,
        instructedAmount: {
          amount: bankPayment.amount,
          currency: bankPayment.currency,
        },
        remittanceInformationUnstructured:
          bankPayment.remittanceInformationUnstructured,
        requestedExecutionDate: new Date().toISOString().split('T').shift(),
      },
    };

    return firstValueFrom(
      this.httpClient
        .post<SebSwedenPayment>(sebSwedenRoute.createPayment(), config)
        .pipe(
          map(({ data }) => data),
          map((payment) => this.mapPaymentData(payment)),
          map((payment) => new BankPaymentDto(payment)),
        ),
    );
  }

  getPayment(accessToken: string, psuIpAddress: string, paymentId: string) {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'PSU-IP-Address': psuIpAddress,
        'X-Request-ID': randomUUID(),
      },
    };

    return firstValueFrom(
      this.httpClient
        .get<SebSwedenPaymentInfo>(sebSwedenRoute.getPayment(paymentId), config)
        .pipe(
          map(({ data }) => data),
          map((payment) => this.mapPaymentData({ paymentId, ...payment })),
          map((payment) => new BankPaymentDto(payment)),
        ),
    );
  }

  getAuthorizationMethods(
    accessToken: string,
    psuIpAddress: string,
    paymentId: string,
  ) {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'PSU-IP-Address': psuIpAddress,
        'X-Request-ID': randomUUID(),
      },
    };

    return firstValueFrom(
      this.httpClient
        .get<SebSwedenPaymentStatus>(
          sebSwedenRoute.getAuthorizationMethods(paymentId),
          config,
        )
        .pipe(
          map(({ data }) => data),
          map(({ scaMethods }) =>
            scaMethods.map((scaMethod) => scaMethod?.authenticationMethodId),
          ),
          map(
            (scaMethods) =>
              new BankPaymentAuthorizationMethodsDto({ scaMethods }),
          ),
        ),
    );
  }

  getPaymentStatus(
    accessToken: string,
    psuIpAddress: string,
    paymentId: string,
  ) {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'PSU-IP-Address': psuIpAddress,
        'X-Request-ID': randomUUID(),
      },
    };

    return firstValueFrom(
      this.httpClient
        .get<SebSwedenPaymentStatus>(
          sebSwedenRoute.getPaymentStatus(paymentId),
          config,
        )
        .pipe(
          map(({ data }) => data),
          map(
            ({ paymentId, transactionStatus }) =>
              new BankPaymentStatusDto({
                paymentId,
                status: transactionStatus,
              }),
          ),
        ),
    );
  }

  createAuthorization(
    accessToken: string,
    psuIpAddress: string,
    paymentId: string,
  ) {
    const config: AxiosRequestConfig<SebSwedenCreatePaymentAuthorizationRequest> =
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'PSU-IP-Address': psuIpAddress,
          'X-Request-ID': randomUUID(),
          'TPP-Redirect-URI': this.bankConfig.redirectPaymentUrl,
        },
        data: {
          authenticationMethodId: 'mobiltbankid',
        },
      };

    return firstValueFrom(
      this.httpClient
        .post<SebSwedenPaymentAuthorization>(
          sebSwedenRoute.createAuthorization(paymentId),
          config,
        )
        .pipe(
          map(({ data }) => data),
          map(
            ({ authorisationId, scaStatus, chosenScaMethod }) =>
              new BankPaymentAuthorizationDto({
                authorisationId,
                status: scaStatus,
                chosenScaMethod: chosenScaMethod?.authenticationMethodId,
              }),
          ),
        ),
    );
  }

  getAuthorization(
    accessToken: string,
    psuIpAddress: string,
    paymentId: string,
    authorizationId: string,
  ) {
    const config: AxiosRequestConfig<any> = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'PSU-IP-Address': psuIpAddress,
        'X-Request-ID': randomUUID(),
      },
    };

    return firstValueFrom(
      this.httpClient
        .get<SebSwedenPaymentAuthorizationInfo>(
          sebSwedenRoute.getAuthorization(paymentId, authorizationId),
          config,
        )
        .pipe(
          map(({ data }) => data),
          map(({ authorisationId, scaStatus, chosenScaMethod, _links }) => {
            return new BankPaymentAuthorizationInfoDto({
              authorisationId,
              status: scaStatus,
              chosenScaMethod: chosenScaMethod?.authenticationMethodId,
              ...(_links?.scaRedirect?.href && {
                scaRedirect: _links.scaRedirect.href,
              }),
            });
          }),
        ),
    );
  }

  private mapPaymentData(paymentData: SebSwedenPayment): BankPaymentDto {
    const {
      paymentId,
      creditorAccount,
      creditorName,
      debtorAccount,
      instructedAmount,
      remittanceInformationUnstructured,
      endToEndIdentification,
    } = paymentData;

    return {
      paymentId,
      creditorName: creditorName,
      creditorIban: creditorAccount?.iban,
      debtorIban: debtorAccount?.iban,
      amount: instructedAmount?.amount,
      currency: instructedAmount?.currency,
      remittanceInformationUnstructured,
      endToEndId: endToEndIdentification,
    };
  }
}
