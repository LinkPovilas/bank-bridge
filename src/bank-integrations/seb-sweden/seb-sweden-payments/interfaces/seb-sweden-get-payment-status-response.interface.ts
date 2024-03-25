export interface SebSwedenGetPaymentStatusResponse {
  psuMessage: string;
  scaMethods: [
    {
      authenticationMethodId:
        | 'mobiltbankid'
        | 'bankIdQr'
        | 'bankIdSameDevice'
        | 'digipass'
        | 'bankIdOnCard';
    },
  ];
  tppMessages: {
    example: string[];
    type: string[];
  };
  transactionStatus: 'ACTC' | 'RCVD' | 'CANC' | 'ACSC' | 'RJCT';
}
