import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Automaze Todo API')
    .setVersion('1.0')
    .addCookieAuth('access_token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'Automaze Todo API Docs',
    ...(process.env.SWAGGER_USER && process.env.SWAGGER_PASSWORD
      ? {
          httpMiddleware: (req: any, res: any, next: any) => {
            const auth = req.headers['authorization'];
            if (!auth) {
              res.setHeader('WWW-Authenticate', 'Basic realm="Swagger"');
              res.status(401).end('Unauthorized');
              return;
            }
            const [, encoded] = auth.split(' ');
            const [user, pass] = Buffer.from(encoded, 'base64')
              .toString()
              .split(':');
            if (
              user === process.env.SWAGGER_USER &&
              pass === process.env.SWAGGER_PASSWORD
            ) {
              next();
            } else {
              res.setHeader('WWW-Authenticate', 'Basic realm="Swagger"');
              res.status(401).end('Unauthorized');
            }
          },
        }
      : {}),
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
