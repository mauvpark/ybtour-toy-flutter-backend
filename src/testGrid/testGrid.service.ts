import { Injectable, Req } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { SupabaseService } from './supabase/supabase.service';

@Injectable()
export class TestGridService {
  supabase: SupabaseClient;
  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
  ) {
    this.supabase = this.supabaseService.getSupabase();
  }

  async fetch(req: Request) {
    // 토큰 유효성 검증
    await this.authService.validateUser(req);

    // 데이터베이스 핸들링
    const { status, statusText, data, error } = await this.supabase
      .from('grid')
      .select();
    if (error) {
      throw error;
    }
    return { status, statusText, data };
  }

  async insert(@Req() req: Request) {
    // 토큰 유효성 검증
    await this.authService.validateUser(req);

    // 데이터베이스 핸들링
    const value = req.body;
    const { status, statusText, error } = await this.supabase
      .from('grid')
      .insert({ value });
    if (error) {
      throw error;
    }
    return { status, statusText };
  }

  async update(@Req() req: Request) {
    // 토큰 유효성 검증
    await this.authService.validateUser(req);

    // 데이터베이스 핸들링
    const { id, value } = req.body;
    const { status, statusText, error } = await this.supabase
      .from('grid')
      .update({ value })
      .eq('id', id);
    if (error) {
      throw error;
    }
    return { status, statusText };
  }

  async delete(@Req() req: Request) {
    // 토큰 유효성 검증
    await this.authService.validateUser(req);

    // 데이터베이스 핸들링
    const { id } = req.body;
    const { status, statusText, error } = await this.supabase
      .from('grid')
      .delete()
      .eq('id', id);
    if (error) {
      throw error;
    }
    return { status, statusText };
  }
}
