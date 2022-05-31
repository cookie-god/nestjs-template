/* eslint-disable @typescript-eslint/no-empty-function */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Web/auth/auth.module';
import { AdminUserModule } from './Admin/user/user.module';
import { AdminAuthModule } from './Admin/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : 'env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.USER,
      // username: 'dm',
      password: process.env.PASSWORD,
      // password: 'dm220530!',
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/entity/*.entity{.ts,.js}'],
      synchronize: true,
      bigNumberStrings: false,
      charset: 'utf8mb4',
    }),
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
