export interface SebSwedenPaymentAuthorization {
  paymentIds: string[];
  authorisationId: string;
  basketId: string;
  scaStatus: string;
  chosenScaMethod: {
    authenticationType: string;
    authenticationMethodId: string;
    name: string;
    explanation: string;
  };
  _links: {
    self: {
      href: string;
    };
  };
}
