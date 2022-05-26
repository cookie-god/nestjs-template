import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse } from 'common/function.utils';
import { response } from 'config/response.utils';
import { UserInfo } from 'src/entity/userInfo.entity';
import { UserSalt } from 'src/entity/userSalt.entity';
import { Repository } from 'typeorm';
import { SignInRequestDto } from './dto/sign-in-request.dto';
import { SignUpRequestDto } from './dto/sign-up-request.dto';
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

  async signInUser(signInRequest: SignInRequestDto) {
    const user = await this.authRepository.findOne({
      where: { email: signInRequest.email, status: 'ACTIVE' },
    });
    if (user == undefined) {
      return response.NON_EXIST_EMAIL;
    }

    const userSalt = await this.saltRepository.findOne({
      where: { userId: user.id },
    });

    if (
      !validatePassword(signInRequest.password, userSalt.salt, user.password)
    ) {
      return response.NON_MATCH_PASSWORD;
    }

    const payload = {
      userId: user.id,
      email: signInRequest.email,
    };
    const token = await this.jwtService.sign(payload);
    const data = {
      jwt: token,
      email: signInRequest.email,
    };

    return makeResponse(response.SUCCESS, data);
  }

  async signUpUser(signUpRequest: SignUpRequestDto) {
    const securityData = saltHashPassword(signUpRequest.password);

    try {
      const user = await this.authRepository.findOne({
        where: { email: signUpRequest.email, status: 'ACTIVE' },
      });

      if (user != undefined) {
        return response.EXIST_EMAIL;
      }

      const userInfo = new UserInfo();
      userInfo.email = signUpRequest.email;
      userInfo.password = securityData.hashedPassword;
      userInfo.nickname = signUpRequest.nickname;
      userInfo.authority = signUpRequest.authority;
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
    } catch (error) {
      return response.ERROR;
    }
  }
}
