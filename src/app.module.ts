import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BanksModule } from './banks/banks.module';
import { ConfigModule } from '@nestjs/config';
import { SebSwedenModule } from './bank-integrations/seb-sweden/seb-sweden.module';
import { RouterModule } from '@nestjs/core';
import { SebSwedenAuthModule } from './bank-integrations/seb-sweden/seb-sweden-auth/seb-sweden-auth.module';
import { SebSwedenAccountsModule } from './bank-integrations/seb-sweden/seb-sweden-accounts/seb-sweden-accounts.module';
import { SebSwedenPaymentsModule } from './bank-integrations/seb-sweden/seb-sweden-payments/seb-sweden-payments.module';
import { CommonModule } from './common/common.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      cache: true,
      expandVariables: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    BanksModule,
    SebSwedenModule,
    SebSwedenAuthModule,
    SebSwedenAccountsModule,
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
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
