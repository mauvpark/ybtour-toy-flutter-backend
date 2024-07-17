import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { TestGridModule } from 'src/testGrid/testGrid.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [ConfigModule.forRoot(), SupabaseModule, AuthModule, TestGridModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}