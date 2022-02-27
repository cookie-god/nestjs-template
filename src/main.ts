import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { secret } from 'config/secret';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        cookie: secret.swagger_password,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nestjs 템플릿')
    .setDescription('템플릿 스웨거입니다.')
    .setVersion('1.0.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3030);
}
bootstrap();
