import { INestApplication, ValidationPipe } from '@nestjs/common';

export function setupApp(app: INestApplication) {
  app.enableCors(); // TODO: Create class or function to manage whitelist

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
}
