import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { setupApp } from './setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  setupApp(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen(port);
  logger.log(`🚀 Running on port ${port}`);
}

bootstrap();
