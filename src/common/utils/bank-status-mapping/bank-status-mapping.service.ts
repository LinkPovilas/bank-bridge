import { Injectable } from '@nestjs/common';
import { BankPaymentAuthorizationStatus } from '../../enums/bank-payment-authorization-status.enum';
import { BankPaymentStatus } from '../../enums/bank-payment-status.enum';

@Injectable()
export class BankStatusMappingService {
  mapPaymentStatus(paymentStatus: string): BankPaymentStatus {
    switch (paymentStatus) {
      case 'OPEN':
      case 'Pending':
      case 'AcceptedSettlementInProcess':
      case 'AcceptedSettlementCompleted':
      case 'RCVD':
      case 'PDNG':
      case 'PATC':
      case 'ACTC':
      case 'ACWC':
      case 'ACCP':
      case 'ACFC':
      case 'ACSP':
        return BankPaymentStatus.PENDING;
      case 'CONFIRMED':
      case 'ACSC':
      case 'ACWP':
      case 'ACCC':
        return BankPaymentStatus.PAID;
      case 'CANCELLED':
      case 'FAILED':
      case 'Rejected':
      case 'RJCT':
        return BankPaymentStatus.REJECTED_BY_BANK;
      default:
        return BankPaymentStatus.UNKNOWN;
    }
  }

  mapPaymentAuthorizationStatus(
    authorizationStatus: string,
  ): BankPaymentAuthorizationStatus {
    const authStatus = authorizationStatus.toUpperCase();

    switch (authStatus) {
      case 'OPEN':
      case 'STARTED':
      case 'RECEIVED':
      case 'SCAMETHODSELECTED':
        return BankPaymentAuthorizationStatus.CREATED;
      case 'FINALISED':
      case 'FINALIZED':
      case 'AUTHORISED':
      case 'CONFIRMED':
      case 'CONSUMED':
        return BankPaymentAuthorizationStatus.CONFIRMED;
      case 'CANCELED':
      case 'FAILED':
      case 'REJECTED':
        return BankPaymentAuthorizationStatus[authStatus];
      default:
        return BankPaymentAuthorizationStatus.UNKNOWN;
    }
  }
}
