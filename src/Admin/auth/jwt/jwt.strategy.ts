import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { secret } from '../../../../config/secret';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { Repository } from 'typeorm';
import { AdminInfo } from 'src/entity/adminInfo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'config/response.utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AdminInfo)
    private readonly adminRepository: Repository<AdminInfo>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
      secretOrKey: secret.admin_jwt_secret_key,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    // User 정보 추출
    const admin = await this.adminRepository.findOne({
      where: { id: payload.adminId, status: 'ACTIVE' },
    });
    // 유저가 존재하지 않는 경우
    if (admin == undefined) {
      throw new HttpException(response.NON_EXIST_USER, 201);
    }
    // payload값 user로 리턴
    return payload;
  }
}
