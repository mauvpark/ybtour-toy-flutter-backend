import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthService } from '../auth/auth.service';
import { AuthAuthorizationDto } from '../auth/model/dto/authorization.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { TestGridDeleteDto } from './model/dto/delete.dto';
import { TestGridInsertDto } from './model/dto/insert.dto';
import { TestGridUpdateDto } from './model/dto/update.dto';

@Injectable()
export class TestGridService {
  supabase: SupabaseClient;
  constructor(
    private supabaseService: SupabaseService,
    private authService: AuthService,
  ) {
    this.supabase = this.supabaseService.getSupabase();
  }

  async fetch(authorizationDto: AuthAuthorizationDto) {
    // 토큰 유효성 검증
    await this.authService.validateUser(authorizationDto);

    // 데이터베이스 핸들링
    const { status, statusText, data, error } = await this.supabase
      .from('grid')
      .select();
    if (error) {
      throw error;
    }
    return { status, statusText, data };
  }

  async insert(
    authorizationDto: AuthAuthorizationDto,
    insertDto: TestGridInsertDto,
  ) {
    // 토큰 유효성 검증
    await this.authService.validateUser(authorizationDto);

    // 데이터베이스 핸들링
    const value = insertDto.value;
    const { status, statusText, error } = await this.supabase
      .from('grid')
      .insert({ value });
    if (error) {
      throw error;
    }
    return { status, statusText };
  }

  async update(
    authorizationDto: AuthAuthorizationDto,
    updateDto: TestGridUpdateDto,
  ) {
    // 토큰 유효성 검증
    await this.authService.validateUser(authorizationDto);

    // 데이터베이스 핸들링
    const { id, value } = updateDto;
    const { status, statusText, error } = await this.supabase
      .from('grid')
      .update({ value })
      .eq('id', id);
    if (error) {
      throw error;
    }
    return { status, statusText };
  }

  async delete(
    authorizationDto: AuthAuthorizationDto,
    deleteDto: TestGridDeleteDto,
  ) {
    // 토큰 유효성 검증
    await this.authService.validateUser(authorizationDto);

    // 데이터베이스 핸들링
    const { id } = deleteDto;
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
