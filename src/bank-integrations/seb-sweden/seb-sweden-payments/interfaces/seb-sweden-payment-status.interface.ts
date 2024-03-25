export interface SebSwedenScaMethod {
  authenticationType: string;
  authenticationMethodId: string;
  name: string;
  explanation: string;
}

export interface SebSwedenPaymentStatus {
  paymentId: string;
  transactionStatus: 'RCVD' | 'ACTC' | 'CANC' | 'ACSC' | 'RJCT';
  scaMethods: SebSwedenScaMethod[];
}
