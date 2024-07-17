import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Global() // 로그인 여부를 확인하는 곳이 많으므로 글로벌 모듈로 지정
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
