import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { secret } from '../../config/secret';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserInfo } from '../entity/user-info.entity';
import { UserSalt } from '../entity/user-salt.entity';
import {ApiCallHistory} from "../entity/api-call-history.entity";
import {ApiSaveService} from "../api-save.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo, UserSalt]),
    JwtModule.register({
      secret: secret.jwt_secret_key,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ApiSaveService, JwtStrategy],
})
export class AuthModule {}
