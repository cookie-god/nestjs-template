import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { secret } from '../../../config/secret';
import { AdminInfo } from 'src/entity/adminInfo.entity';
import { AdminSalt } from 'src/entity/adminSalt.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../Admin/auth/jwt/jwt.strategy';
import { Authority } from 'src/entity/authority.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminInfo, AdminSalt, Authority]),
    JwtModule.register({
      secret: secret.web_jwt_secret_key,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
