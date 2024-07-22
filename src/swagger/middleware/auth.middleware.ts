import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { FastifyReply, FastifyRequest } from 'fastify';

function swaggerAuthValidation(req: FastifyRequest) {
  const cookies = req.headers.cookie?.split('; ');
  const regex = /^\w+=/g;
  if (!cookies) {
    throw new UnauthorizedException();
  }
  const credential = cookies
    .filter((cookie) => cookie.startsWith('credential'))
    .at(0);

  if (!credential) {
    throw new UnauthorizedException();
  }

  const credentialValue = credential.split(regex).at(1);
  const idPassword = Buffer.from(credentialValue, 'base64')
    .toString('utf8')
    .split(':');
  const id = idPassword.at(0);
  const password = idPassword.at(1);
  if (
    id !== process.env.SWAGGER_ADMIN_ID ||
    password !== process.env.SWAGGER_ADMIN_PASSWORD
  ) {
    throw new UnauthorizedException();
  }
}

@Injectable()
export class SwaggerAuthMiddleware implements NestMiddleware {
  use(req: FastifyRequest, res: FastifyReply, next: NextFunction) {
    try {
      swaggerAuthValidation(req);
      next();
    } catch (error) {
      next(error);
    }
  }
}
