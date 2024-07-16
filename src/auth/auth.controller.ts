import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  async signUp(@Req() req: Request) {
    return this.authService.signUp(req);
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
