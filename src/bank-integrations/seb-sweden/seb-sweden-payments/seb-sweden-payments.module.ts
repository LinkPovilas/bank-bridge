import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import sebSwedenConfig, {
  SebSwedenClientData,
} from '../../../config/banks/seb-sweden.config';
import { SebSwedenPaymentsService } from './seb-sweden-payments.service';
import { SebSwedenPaymentsController } from './seb-sweden-payments.controller';
import { HttpClientModule } from '../../../common/utils/http/http-client.module';
import { BankPaymentMappingModule } from '../../../common/utils/bank-status-mapping/bank-status-mapping.module';

@Module({
  imports: [
    HttpClientModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<SebSwedenClientData>('seb-sweden');
        return {
          baseURL: config.apiUrl,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forFeature(sebSwedenConfig),
    BankPaymentMappingModule,
  ],
  providers: [SebSwedenPaymentsService],
  controllers: [SebSwedenPaymentsController],
})
export class SebSwedenPaymentsModule {}
