import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { secret } from 'config/secret';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { HTTPLoggingInterceptor } from 'common/logger/logger.interceptor';

async function bootstrap() {
  console.log(process.env.DB_USER);
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HTTPLoggingInterceptor());
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        gridge: secret.swagger_password,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nestjs 템플릿')
    .setDescription('템플릿 스웨거입니다.')
    .setVersion('1.0.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    // 밑에 쌓이는 DTO 없애는 코드
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(3030);
}
bootstrap();
