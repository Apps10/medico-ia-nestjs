import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './config/envs';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle("Medico-ia")
  .setTitle("Documentacion de la API para pacientes")
  .setVersion("1.0")
  .build()
  
  app.useGlobalPipes(new ValidationPipe({
    skipNullProperties: true,
    forbidUnknownValues: true,
    stopAtFirstError: true
  }))

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document);
  await app.listen(env.PORT);
}
bootstrap();
