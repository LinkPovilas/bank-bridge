export const sebSwedenRoute = {
  authorize: () => '/mga/sps/oauth/oauth20/authorize',

  token: () => '/mga/sps/oauth/oauth20/token',

  accounts: () => '/ais/v8/identified2/accounts',

  createPayment: () => `/pis/v8/identified2/payments/sepa-credit-transfers`,

  getPayment: (paymentId: string) =>
    `/pis/v8/identified2/payments/sepa-credit-transfers/${paymentId}`,

  getPaymentStatus: (paymentId: string) =>
    `/pis/v8/identified2/payments/sepa-credit-transfers/${paymentId}/status`,

  getAuthorizationMethods: (paymentId: string) =>
    `/pis/v8/identified2/payments/sepa-credit-transfers/${paymentId}/status`,

  createAuthorization: (paymentId: string) =>
    `/pis/v8/identified2/payments/sepa-credit-transfers/${paymentId}/authorisations`,

  getAuthorization: (paymentId: string, authorizationId: string) =>
    `/pis/v7/identified2/payments/sepa-credit-transfers/${paymentId}/authorisations/${authorizationId}`,
} as const;
