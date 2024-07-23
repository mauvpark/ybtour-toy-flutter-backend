import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const hbs = require('hbs');
import { SWAGGER_URL } from '../constant';
import path from 'path';

function swaggerConfig(app: NestFastifyApplication) {
  // hbs
  app.setViewEngine({
    engine: { handlebars: hbs },
    root: path.join(process.cwd(), 'views'),
  });
  // bearer auth
  const config = new DocumentBuilder()
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Authorization',
    )
    .setTitle('YBTour Flutter Backend Application')
    .setDescription('토이프로젝트용 백엔드')
    .setVersion('0.0.1')
    .build();
  // application
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_URL, app, document, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-standalone-preset.js',
    ],
  });
}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  swaggerConfig(app);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
