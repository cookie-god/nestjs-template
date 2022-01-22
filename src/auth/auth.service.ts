import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse } from 'common/response.utils';
import { response } from 'config/response.utils';
import { UserInfo } from 'src/user/entity/userInfo.entity';
import { UserSalt } from 'src/user/entity/userSalt.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import {
  saltHashPassword,
  validatePassword,
} from '../../config/security.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly authRepository: Repository<UserInfo>,
    @InjectRepository(UserSalt)
    private readonly saltRepository: Repository<UserSalt>,
    private jwtService: JwtService,
  ) {}

  async signInUser(signInData: SignInDto) {
    const user = await this.authRepository.findOne({
      where: { email: signInData.email, status: 'ACTIVE' },
    });
    if (user == undefined) {
      return;
    }

    const userSalt = await this.saltRepository.findOne({
      where: { userId: user.id },
    });

    if (!validatePassword(signInData.password, userSalt.salt, user.password)) {
      return response.NON_MATCH_PASSWORD;
    }

    const payload = {
      userId: user.id,
      email: signInData.email,
    };
    const token = await this.jwtService.sign(payload);
    const data = {
      jwt: token,
      email: signInData.email,
    };

    return makeResponse(response.SUCCESS, data);
  }

  async signUpUser(signUpData: SignUpDto) {
    const securityData = saltHashPassword(signUpData.password);

    const userInfo = new UserInfo();
    userInfo.email = signUpData.email;
    userInfo.password = securityData.hashedPassword;
    userInfo.nickname = signUpData.nickname;
    const createUserData = await this.authRepository.save(userInfo);

    const userSalt = new UserSalt();
    userSalt.salt = securityData.salt;
    userSalt.userId = createUserData.id;
    await this.saltRepository.save(userSalt);

    const data = {
      userId: createUserData.id,
      email: createUserData.email,
      nickname: createUserData.nickname,
    };

    return makeResponse(response.SUCCESS, data);
  }
}
