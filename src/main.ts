import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

export async function swagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API Document')
    .setDescription('REST API document')
    .addTag('REST')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  const servicePort = config.get<number>('SERVICE_PORT', 3000);
  const NODE_ENV = config.get<string>('NODE_ENV', 'development');

  app.enableCors({
    origin:
      config.get<string>('CORS_ORIGIN')?.split(',') ??
      ((_, cb) => cb(null, true)),
    methods: config.get<string>('CORS_METHODS', 'GET,PUT,POST,PATCH,DELETE'),
    credentials: config.get<boolean>('CORS_CREDENTIALS', true),
    preflightContinue: config.get<boolean>('CORS_PREFLIGHT', false),
    optionsSuccessStatus: config.get<number>('CORS_OPTIONS_STATUS', 204),
  });

  if (NODE_ENV === 'development') {
    Logger.log(
      `Swagger is running on localhost:${servicePort}/document`,
      `Bootstrap`,
    );
    await swagger(app);
  }

  await app.listen(servicePort);

  Logger.log(
    `Server is running on localhost:${servicePort} with ${NODE_ENV} mode`,
    `Bootstrap`,
  );
}
bootstrap();
