import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  supabase: SupabaseClient;
  constructor() {
    // INFO 개체마다 인증을 새로 해야 함
    // => 모든 모듈에 토큰이 살아 있는지 여부와 새로 생성된 supabase 객체 마다 로그인 정보를 가져와야 함(새 객체에는 로그인을 했다고 하더라도 로그인 정보가 존재하지 않음)
    // => 서버 인증 api가 필요함
    // => 불필요한 통신 증가
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_PUBLIC_API_KEY,
    );
  }

  getSupabase() {
    try {
      return this.supabase;
    } catch (error) {
      return error;
    }
  }
}
