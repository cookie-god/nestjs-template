import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse } from 'common/function.utils';
import { response } from 'config/response.utils';
import { AdminInfo } from 'src/entity/adminInfo.entity';
import { AdminSalt } from 'src/entity/adminSalt.entity';
import { Connection, Repository } from 'typeorm';
import { SignInRequest } from './dto/sign-in.request';
import { SignUpRequest } from './dto/sign-up.request';
import { Payload } from './jwt/jwt.payload';
import {
  saltHashPassword,
  validatePassword,
} from '../../../config/security.utils';
import { Authority } from 'src/entity/authority.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminInfo)
    private readonly adminRepository: Repository<AdminInfo>,
    @InjectRepository(AdminSalt)
    private readonly adminSaltRepository: Repository<AdminSalt>,
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
    private jwtService: JwtService,
    private connection: Connection,
  ) {}

  async signInUser(signInRequest: SignInRequest) {
    try {
      // 입력한 이메일에 해당하는 유저값 추출
      const admin = await this.adminRepository.findOne({
        where: { email: signInRequest.email, status: 'ACTIVE' },
      });

      // 존재하지 않는 관리자 체크
      if (admin == undefined) {
        return response.NON_EXIST_EMAIL;
      }

      //유저 아이디에 해당하는 Salt값 추출
      const adminSalt = await this.adminSaltRepository.findOne({
        where: { adminId: admin.id },
      });

      // Salt값을 이용해서 현재 입력된 비밀번호와 암호화된 비밀번호 검증
      if (
        !validatePassword(
          signInRequest.password,
          adminSalt.salt,
          admin.password,
        )
      ) {
        return response.NON_MATCH_PASSWORD;
      }

      // 유저의 권한값 추출
      const authority = await this.authorityRepository.findOne({
        where: { id: admin.authority, status: 'ACTIVE' },
      });

      // 존재하지 않는 권한인 경우
      if (authority == undefined) {
        return response.INVALID_AUTHORITY;
      }

      //payload값 생성

      const payload: Payload = {
        adminId: admin.id,
        authority: authority.type,
      };

      //토큰 생성
      const token = await this.jwtService.sign(payload);

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        jwt: token,
        adminId: admin.id,
        authority: authority.type,
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
      const isExistAdminByEmail = await this.adminRepository.count({
        where: { email: signUpRequest.email, status: 'ACTIVE' },
      });

      // admin 정보가 있는지 체크
      if (isExistAdminByEmail > 0) {
        return response.EXIST_EMAIL;
      }

      // 존재하는 권한 아이디인지 체크
      const isExistAuthorityId = await this.authorityRepository.count({
        where: { id: signUpRequest.authority, status: 'ACTIVE' },
      });

      if (isExistAuthorityId === 0) {
        return response.INVALID_AUTHORITY;
      }

      // AdminInfo 인스턴스 생성후, 정보 담는 부분
      const adminInfo = new AdminInfo();
      adminInfo.email = signUpRequest.email;
      adminInfo.password = securityData.hashedPassword;
      adminInfo.authority = signUpRequest.authority;
      const createUserData = await this.adminRepository.save(adminInfo);

      // AdminSalt 인스턴스 생성후, 정보 담는 부분
      const adminSalt = new AdminSalt();
      adminSalt.salt = securityData.salt;
      adminSalt.adminId = createUserData.id;
      await this.adminSaltRepository.save(adminSalt);

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
