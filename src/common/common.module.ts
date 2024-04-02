import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HeaderValidationMiddleware } from './middleware/validation/header-validation.middleware';
import { HttpClientModule } from './utils/http/http-client.module';
import { APP_GUARD } from '@nestjs/core';
import { BasicAuthGuard } from './guards/basic-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: BasicAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderValidationMiddleware).forRoutes('*');
  }
}
