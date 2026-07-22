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

  if(process.env.NODE_ENV !== 'production'){
    const config = new DocumentBuilder()
      .setTitle('Automaze Todo API')
      .setVersion('1.0')
      .addCookieAuth('access_token')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
      customSiteTitle: 'Automaze Todo API Docs',
    });
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
