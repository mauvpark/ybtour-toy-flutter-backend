import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '노랑풍선 토이 프로젝트: 플러터용 백엔드 애플리케이션';
  }
}
