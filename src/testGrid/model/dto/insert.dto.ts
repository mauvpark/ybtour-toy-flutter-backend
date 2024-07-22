import { ApiProperty } from '@nestjs/swagger';

export class TestGridInsertDto {
  @ApiProperty({ description: '데이터베이스 입력값', default: null })
  value: any;
}
