import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { secret } from '../../config/secret';
import { UserInfo } from 'src/entity/userInfo.entity';
import { UserSalt } from 'src/entity/userSalt.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../config/jwt/jwt.strategy';
import { Authority } from 'src/entity/authority.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo, UserSalt, Authority]),
    JwtModule.register({
      secret: secret.jwt_secret_key,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
