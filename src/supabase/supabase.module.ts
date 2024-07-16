import { Global, Module } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Global() // 모든 모듈에서 접속이 가능해야 함
@Module({ providers: [SupabaseService], exports: [SupabaseService] })
export class SupabaseModule {}
