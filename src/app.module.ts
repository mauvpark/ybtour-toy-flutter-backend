import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from './supabase/supabase.module';
import { SwaggerConfigModule } from './swagger/swagger.module';
import { TestGridModule } from './testGrid/testGrid.module';
import { SwaggerAuthMiddleware } from './swagger/middleware/auth.middleware';
import { SWAGGER_JSON_URL, SWAGGER_URL } from '../constant';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SupabaseModule,
    AuthModule,
    TestGridModule,
    SwaggerConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SwaggerAuthMiddleware)
      .forRoutes(SWAGGER_URL, SWAGGER_JSON_URL);
  }
}
