import { SebSwedenPaymentInfo } from './seb-sweden-payment-info.interface';

export interface SebSwedenPayment extends SebSwedenPaymentInfo {
  paymentId: string;
}
