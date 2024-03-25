import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HeaderValidationMiddleware } from './middleware/validation/header-validation.middleware';
import { HttpClientModule } from './utils/http/http-client.module';

@Module({
  imports: [HttpClientModule],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderValidationMiddleware).forRoutes('*');
  }
}
