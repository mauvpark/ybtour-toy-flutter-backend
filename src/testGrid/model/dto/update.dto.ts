import { ApiProperty } from '@nestjs/swagger';

export class TestGridUpdateDto {
  @ApiProperty({
    description: '타겟 id',
    default: 0,
  })
  id: number;
  @ApiProperty({
    description: '변경값',
    default: null,
  })
  value: any;
}
