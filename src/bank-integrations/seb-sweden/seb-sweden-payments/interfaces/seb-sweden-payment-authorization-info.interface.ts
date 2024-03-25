import { SebSwedenAuthorizationStatus } from '../enums/seb-sweden-authorization-status.enum';

export interface SebSwedenPaymentAuthorizationInfo {
  authorisationId: string;
  basketId: string;
  chosenScaMethod: {
    authenticationType: string;
    authenticationMethodId: string;
    name: string;
    explanation: string;
  };
  scaStatus: SebSwedenAuthorizationStatus;
  paymentIds: string[];
  tppMessages: string[];
  _links: {
    scaRedirect?: {
      href: string;
    };
    self: {
      href: string;
    };
  };
}
