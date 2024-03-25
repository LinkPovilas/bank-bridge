export interface SebSwedenCreatePaymentAuthorizationResponse {
  authorisationId: string;
  basketId: string;
  chosenScaMethod: {
    authenticationMethodId: string;
  };
  paymentIds: string[];
  psuMessage: string;
  qrData: string;
  tppMessages: {
    example: string[];
    type: string[];
  };
}
