import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './config/envs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    skipNullProperties: true,
    forbidUnknownValues: true,
    stopAtFirstError: true
  }))
  await app.listen(env.PORT);
}
bootstrap();
