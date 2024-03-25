import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import sebSwedenConfig, {
  SebSwedenClientData,
} from '../../../config/banks/seb-sweden.config';
import { SebSwedenAuthService } from './seb-sweden-auth.service';
import { SebSwedenAuthController } from './seb-sweden-auth.controller';
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
  providers: [SebSwedenAuthService],
  controllers: [SebSwedenAuthController],
})
export class SebSwedenAuthModule {}
