import { Module } from '@nestjs/common';
import { SebSwedenAccountsModule } from './seb-sweden-accounts/seb-sweden-accounts.module';
import { SebSwedenAuthModule } from './seb-sweden-auth/seb-sweden-auth.module';
import { SebSwedenPaymentsModule } from './seb-sweden-payments/seb-sweden-payments.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    SebSwedenAccountsModule,
    SebSwedenAuthModule,
    SebSwedenPaymentsModule,
    RouterModule.register([
      {
        path: 'seb-sweden',
        module: SebSwedenModule,
        children: [
          { path: 'auth', module: SebSwedenAuthModule },
          { path: 'accounts', module: SebSwedenAccountsModule },
          { path: 'payments', module: SebSwedenPaymentsModule },
        ],
      },
    ]),
  ],
})
export class SebSwedenModule {}
