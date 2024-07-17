import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './model/dto/signUp.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Body() signUpDto: AuthSignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signIn')
  async signIn(@Req() req: Request) {
    return this.authService.signIn(req);
  }

  @Get('/signOut')
  async signOut() {
    return this.authService.signOut();
  }

  @Get('/server/getUser')
  async getUser() {
    return this.authService.getUser();
  }

  @Get('/session/getUser')
  async getSession() {
    return this.authService.getSession();
  }
}
