import { registerAs } from '@nestjs/config';

export interface SebSwedenClientData {
  clientId: string;
  clientSecret: string;
  apiUrl: string;
  redirectAuthUrl: string;
  redirectPaymentUrl: string;
}

export default registerAs(
  'seb-sweden',
  (): SebSwedenClientData => ({
    clientId: process.env.SEB_SE_CLIENT_ID,
    clientSecret: process.env.SEB_SE_client_Secret,
    apiUrl: process.env.SEB_SE_API_URL,
    redirectAuthUrl: process.env.SEB_SE_REDIRECT_AUTH_URL,
    redirectPaymentUrl: process.env.SEB_SE_REDIRECT_PAYMENT_URL,
  }),
);
