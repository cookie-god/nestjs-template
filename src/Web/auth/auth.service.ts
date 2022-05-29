import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse } from 'common/function.utils';
import { response } from 'config/response.utils';
import { UserInfo } from 'src/entity/user-info.entity';
import { UserSalt } from 'src/entity/user-salt.entity';
import { Connection, Repository } from 'typeorm';
import { SignInRequest } from './dto/sign-in.request';
import { SignUpRequest } from './dto/sign-up.request';
import { Payload } from '../../Web/auth/jwt/jwt.payload';
import {
  saltHashPassword,
  validatePassword,
} from '../../../config/security.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
    @InjectRepository(UserSalt)
    private readonly userSaltRepository: Repository<UserSalt>,
    private jwtService: JwtService,
    private connection: Connection,
  ) {}

  async signInUser(signInRequest: SignInRequest) {
    try {
      // 입력한 이메일에 해당하는 유저값 추출
      const user = await this.userRepository.findOne({
        where: { email: signInRequest.email, status: 'ACTIVE' },
      });

      // 존재하지 않는 유저 체크
      if (user == undefined) {
        return response.NON_EXIST_EMAIL;
      }

      //유저 아이디에 해당하는 Salt값 추출
      const userSalt = await this.userSaltRepository.findOne({
        where: { userId: user.id },
      });

      // Salt값을 이용해서 현재 입력된 비밀번호와 암호화된 비밀번호 검증
      if (
        !validatePassword(signInRequest.password, userSalt.salt, user.password)
      ) {
        return response.NON_MATCH_PASSWORD;
      }

      //payload값 생성
      const payload: Payload = {
        userId: user.id,
        email: signInRequest.email,
      };

      //토큰 생성
      const token = await this.jwtService.sign(payload);

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        jwt: token,
        userId: user.id,
        email: signInRequest.email,
      };

      return makeResponse(response.SUCCESS, data);
    } catch (error) {
      return response.ERROR;
    }
  }

  async signUpUser(signUpRequest: SignUpRequest) {
    const securityData = saltHashPassword(signUpRequest.password);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 가입한 이메일이 존재하는지 체크
      const isExistUserByEmail = await this.userRepository.count({
        where: { email: signUpRequest.email, status: 'ACTIVE' },
      });

      // user 정보가 있는지 체크
      if (isExistUserByEmail > 0) {
        return response.EXIST_EMAIL;
      }

      // UserInfo 인스턴스 생성후, 정보 담는 부분
      const userInfo = new UserInfo();
      userInfo.email = signUpRequest.email;
      userInfo.password = securityData.hashedPassword;
      userInfo.nickname = signUpRequest.nickname;
      const createUserData = await this.userRepository.save(userInfo);

      // UserSalt 인스턴스 생성후, 정보 담는 부분
      const userSalt = new UserSalt();
      userSalt.salt = securityData.salt;
      userSalt.userId = createUserData.id;
      await this.userSaltRepository.save(userSalt);

      // Commit
      await queryRunner.commitTransaction();

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        userId: createUserData.id,
        email: createUserData.email,
      };

      return makeResponse(response.SUCCESS, data);
    } catch (error) {
      // Rollback
      await queryRunner.rollbackTransaction();
      return response.ERROR;
    } finally {
      // Connection Release
      await queryRunner.release();
    }
  }
}
