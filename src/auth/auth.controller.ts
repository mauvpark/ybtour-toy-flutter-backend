import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthSignInDto } from './model/dto/signIn.dto';
import { AuthSignUpDto } from './model/dto/signUp.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ description: '회원가입 API' })
  @Post('/signUp')
  async signUp(@Body() signUpDto: AuthSignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @ApiOperation({ description: '로그인 API' })
  @Post('/signIn')
  async signIn(@Body() signInDto: AuthSignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({ description: '로그아웃 API' })
  @Get('/signOut')
  async signOut() {
    return this.authService.signOut();
  }

  @ApiOperation({ description: '서버에서 가져온 최신 로그인 정보 API' })
  @Get('/server/getUser')
  async getUser() {
    return this.authService.getUser();
  }

  @ApiOperation({ description: '세션에 캐시된 로그인 정보 API' })
  @Get('/session/getUser')
  async getSession() {
    return this.authService.getSession();
  }
}
