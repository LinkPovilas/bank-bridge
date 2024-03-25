import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import sebSwedenConfig, {
  SebSwedenClientData,
} from '../../../config/banks/seb-sweden.config';
import { SebSwedenAccountsService } from './seb-sweden-accounts.service';
import { SebSwedenAccountsController } from './seb-sweden-accounts.controller';
import { HttpClientModule } from '../../../common/utils/http/http-client.module';

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
  ],
  providers: [SebSwedenAccountsService],
  controllers: [SebSwedenAccountsController],
})
export class SebSwedenAccountsModule {}
