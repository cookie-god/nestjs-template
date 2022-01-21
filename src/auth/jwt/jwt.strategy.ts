import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { secret } from '../../../config/sercret';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
      secretOrKey: secret.jwt_secret_key,
      // ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    // console.log(payload);
    // if (!payload) {
    //   throw new UnauthorizedException(baseResponse.NON_EXIST_EMAIL);
    // }
    // throw new UnauthorizedException(baseResponse.NON_EXIST_EMAIL);
    return payload;
  }
}
