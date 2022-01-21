import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { secret } from '../../../config/sercret';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { Repository } from 'typeorm';
import { UserInfo } from 'src/user/entity/userInfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { baseResponse } from 'config/baseResponse.utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserInfo)
    private readonly authRepository: Repository<UserInfo>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
      secretOrKey: secret.jwt_secret_key,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.authRepository.findOne({
      where: { id: payload.userId, status: 'ACTIVE' },
    });
    if (user == undefined) {
      throw new UnauthorizedException(baseResponse.CHECK_JWT_TOKEN);
    }
    return payload;
  }
}
