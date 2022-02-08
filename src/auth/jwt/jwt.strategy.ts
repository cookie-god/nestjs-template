import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { secret } from '../../../config/secret';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { Repository } from 'typeorm';
import { UserInfo } from 'src/user/entity/userInfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'config/response.utils';

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
      throw new HttpException(response.NON_EXIST_USER, 201);
    }
    return user;
  }
}
