import {
  BadRequestException,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Request } from 'express';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AuthService {
  supabase: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabase = this.supabaseService.getSupabase();
  }
  async signUp(@Req() req: Request) {
    try {
      const { email, password }: { email: string; password: string } = req.body;
      if (!email || !password) {
        throw new BadRequestException();
      }
      const base64Password = Buffer.from(password).toString('base64');
      return await this.supabase.auth.signUp({
        email,
        password: base64Password,
      });
    } catch (error) {
      return error;
    }
  }

  async signIn(@Req() req: Request) {
    try {
      const { email, password }: { email: string; password: string } = req.body;
      if (!email || !password) {
        throw new BadRequestException();
      }
      const base64Password = Buffer.from(password).toString('base64');
      return await this.supabase.auth.signInWithPassword({
        email,
        password: base64Password,
      });
    } catch (error) {
      return error;
    }
  }

  async signOut() {
    return await this.supabase.auth.signOut();
  }

  /**
   * DB 유저 정보(Server DB)
   * @param optional jwt jwt 검증 후, 로그인 정보 반환
   */
  async getUser(jwt?: string) {
    return await this.supabase.auth.getUser(jwt);
  }

  /**
   * 유저 토큰 검증
   */
  async validateUser(req: Request) {
    const AUTHORIZATION = req.headers.authorization;
    if (!AUTHORIZATION) {
      throw new UnauthorizedException();
    }
    const token = AUTHORIZATION.split(' ').at(1);
    const { error: AuthError } = await this.getUser(token); // jwt 유효성 검증
    if (AuthError) {
      throw AuthError;
    }
  }

  /**
   * Session 유저 정보(Client localStorage)
   */
  async getSession() {
    return await this.supabase.auth.getSession();
  }
}
