/* eslint-disable @typescript-eslint/no-empty-function */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './Web/user/user.module';
import { AuthModule } from './Web/auth/auth.module';
import { AdminUserModule } from './Admin/user/user.module';
import { AdminAuthModule } from './Admin/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'kooki7869^^',
      database: 'test',
      entities: [__dirname + '/**/entity/*.entity{.ts,.js}'],
      synchronize: true,
      bigNumberStrings: false,
      charset: 'utf8mb4',
    }),
    UserModule,
    AuthModule,
    AdminUserModule,
    AdminAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
