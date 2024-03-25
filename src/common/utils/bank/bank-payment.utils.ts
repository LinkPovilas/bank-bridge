import { BankPaymentAuthorizationStatus } from '../../enums/bank-payment-authorization-status.enum';
import { BankPaymentStatus } from '../../enums/bank-payment-status.enum';

export function mapToBankPaymentAuthorizationStatus(
  value: unknown,
): BankPaymentAuthorizationStatus {
  switch (value) {
    case 'received':
    case 'scaMethodSelected':
    case 'AwaitingAuthorisation':
    case 'OPEN':
    case 'started':
      return BankPaymentAuthorizationStatus.CREATED;
    case 'finalised':
    case 'finalized':
    case 'Authorised':
    case 'Consumed':
    case 'CONFIRMED':
      return BankPaymentAuthorizationStatus.CONFIRMED;
    case 'canceled':
    case 'CANCELLED':
      return BankPaymentAuthorizationStatus.CANCELED;
    case 'failed':
    case 'Rejected':
    case 'FAILED':
      return BankPaymentAuthorizationStatus.FAILED;
    default:
      return BankPaymentAuthorizationStatus.UNKNOWN;
  }
}

export function mapToBankPaymentStatus(value: unknown): BankPaymentStatus {
  switch (value) {
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
