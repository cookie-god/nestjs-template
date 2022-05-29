import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse } from 'common/function.utils';
import { response } from 'config/response.utils';
import { UserInfo } from 'src/entity/userInfo.entity';
import { UserSalt } from 'src/entity/userSalt.entity';
import { Repository } from 'typeorm';
import { SignInRequest } from './dto/sign-in.request';
import { SignUpRequest } from './dto/sign-up.request';
import { Payload } from './jwt/jwt.payload';
import {
  saltHashPassword,
  validatePassword,
} from '../../config/security.utils';
import { Authority } from 'src/entity/authority.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly authRepository: Repository<UserInfo>,
    @InjectRepository(UserSalt)
    private readonly saltRepository: Repository<UserSalt>,
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
    private jwtService: JwtService,
  ) {}

  async signInUser(signInRequest: SignInRequest) {
    try {
      // 입력한 이메일에 해당하는 유저값 추출
      const user = await this.authRepository.findOne({
        where: { email: signInRequest.email, status: 'ACTIVE' },
      });

      // 존재하지 않는 유저 체크
      if (user == undefined) {
        return response.NON_EXIST_EMAIL;
      }

      //유저 아이디에 해당하는 Salt값 추출
      const userSalt = await this.saltRepository.findOne({
        where: { userId: user.id },
      });

      // Salt값을 이용해서 현재 입력된 비밀번호와 암호화된 비밀번호 검증
      if (
        !validatePassword(signInRequest.password, userSalt.salt, user.password)
      ) {
        return response.NON_MATCH_PASSWORD;
      }

      // 유저의 권한값 추출
      const authority = await this.authorityRepository.findOne({
        where: { id: user.authority, status: 'ACTIVE' },
      });

      // 존재하지 않는 권한인 경우
      if (authority == undefined) {
        return response.INVALID_AUTHORITY;
      }

      //payload값 생성

      const payload: Payload = {
        userId: user.id,
        authority: authority.type,
        email: signInRequest.email,
      };

      console.log(payload.authority);
      //토큰 생성
      const token = await this.jwtService.sign(payload);

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        jwt: token,
        authority: authority.type,
        email: signInRequest.email,
      };

      return makeResponse(response.SUCCESS, data);
    } catch (error) {
      return response.ERROR;
    }
  }

  async signUpUser(signUpRequest: SignUpRequest) {
    const securityData = saltHashPassword(signUpRequest.password);

    try {
      // 가입한 이메일이 존재하는지 체크
      const isExistUserByEmail = await this.authRepository.count({
        where: { email: signUpRequest.email, status: 'ACTIVE' },
      });

      // user 정보가 있는지 체크
      if (isExistUserByEmail > 0) {
        return response.EXIST_EMAIL;
      }

      // 존재하는 권한 아이디인지 체크
      const isExistAuthorityId = await this.authorityRepository.count({
        where: { id: signUpRequest.authority, status: 'ACTIVE' },
      });

      if (isExistAuthorityId === 0) {
        return response.INVALID_AUTHORITY;
      }

      // UserInfo 인스턴스 생성후, 정보 담는 부분
      const userInfo = new UserInfo();
      userInfo.email = signUpRequest.email;
      userInfo.password = securityData.hashedPassword;
      userInfo.nickname = signUpRequest.nickname;
      userInfo.authority = signUpRequest.authority;
      const createUserData = await this.authRepository.save(userInfo);

      // UserSalt 인스턴스 생성후, 정보 담는 부분
      const userSalt = new UserSalt();
      userSalt.salt = securityData.salt;
      userSalt.userId = createUserData.id;
      await this.saltRepository.save(userSalt);

      // Response의 result 객체에 Data를 담는 부분
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
