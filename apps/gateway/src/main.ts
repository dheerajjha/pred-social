import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Gateway');
  
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('GATEWAY_PORT', 5010);

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Pred-Social API')
    .setDescription('Stock Prediction Social Platform API Documentation')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('predictions', 'Prediction CRUD and verification')
    .addTag('stocks', 'Stock data endpoints')
    .addTag('feed', 'Social feed endpoints')
    .addTag('communities', 'Community management endpoints')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      configService.get<string>('WEB_APP_URL'),
    ].filter((origin): origin is string => Boolean(origin)),
    credentials: true,
  });

  await app.listen(port);
  logger.log(`🚀 Gateway is running on: http://localhost:${port}/graphql`);
  logger.log(`📚 Swagger documentation: http://localhost:${port}/api`);
}

bootstrap(); 