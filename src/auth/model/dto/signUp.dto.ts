import { ApiProperty } from '@nestjs/swagger';

export class AuthSignUpDto {
  @ApiProperty({
    description: '가입 유저 email',
    default: 'example@test.co.kr',
  })
  email: string;

  @ApiProperty({ description: '가입 유저 password', default: 'example' })
  password: string;
}
