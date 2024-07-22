import { ApiProperty } from '@nestjs/swagger';

export class AuthAuthorizationDto {
  @ApiProperty({
    description:
      'Sign In API에서 가져온 Access Token을 최상단에 위치한 Authorize에 등록해야 합니다.',
    readOnly: true,
  })
  Authorization: string;
}
