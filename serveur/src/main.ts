import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/http.exception.filter';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { BadRequestExceptionFilter } from './exceptions/baddata.exception.filter';
import { NotFoundExceptionFilter } from './exceptions/notfound.exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { LoggerAdapter } from './logger/logger.adapter';

import { ConfigService } from '@nestjs/config';

export const getApp = async () => {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const logger = app.get(LoggerAdapter);
  app.useLogger(logger);
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost),
    new NotFoundExceptionFilter(),
    new BadRequestExceptionFilter(),
  );
  const options = new DocumentBuilder()
    .setTitle('todoapp')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/doc', app, document);

  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    allowedHeaders: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    maxAge: 86400, // 24 heures d'autorisations de cache au navigateur pour les requêtes pré-vol
  });

  app.setGlobalPrefix('/api');
  return app;
};

const bootstrap = async () => {
  const app = await getApp();
  const configService = app.get<ConfigService>(ConfigService);
  const appPort = configService.get('app.port');
  await app.listen(appPort, () => {
    console.log('app is running on port', appPort);
  });
};
bootstrap();
