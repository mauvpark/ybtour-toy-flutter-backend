import { ApiProperty } from '@nestjs/swagger';

export class TestGridDeleteDto {
  @ApiProperty({ description: '데이터베이스 삭제', default: 0 })
  id: number;
}
