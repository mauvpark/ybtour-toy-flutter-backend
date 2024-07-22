import {
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SWAGGER_URL } from '../../constant';

@Controller('swagger')
export class SwaggerController {
  constructor() {}

  @Get('/login')
  @Render('/swagger/login')
  async login() {
    return {};
  }

  @Post('/proxy')
  async proxy(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const { id, password } = req.body as { id: string; password: string };

    if (
      id !== process.env.SWAGGER_ADMIN_ID ||
      password !== process.env.SWAGGER_ADMIN_PASSWORD
    ) {
      res.send(new UnauthorizedException());
    }

    const credential = Buffer.from(`${id}:${password}`).toString('base64');
    res.header('set-cookie', `credential=${credential}`);
    res.status(302).redirect(SWAGGER_URL);
  }
}
