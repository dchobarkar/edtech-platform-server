import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as config from 'config';

import { AppModule } from './app.module';

async function bootstrap() {
  // Get env values
  const SERVER_CONFIG = config.get('server');

  const app = await NestFactory.create(AppModule);

  // Enable requests from other origins (To be disabled in static files serving )
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(SERVER_CONFIG.port, '0.0.0.0');
}

bootstrap();
