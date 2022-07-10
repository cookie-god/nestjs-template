import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse, saveApiCallHistory } from 'common/function.utils';
import { RESPONSE } from 'config/response.utils';
import { AdminInfo } from 'src/entity/admin-info.entity';
import { AdminSalt } from 'src/entity/admin-salt.entity';
import { Connection, Repository } from 'typeorm';
import { AdminSignInRequest } from './dto/admin-sign-in.request';
import { AdminSignUpRequest } from './dto/admin-sign-up.request';
import { Payload } from './jwt/jwt.payload';
import {
  saltHashPassword,
  validatePassword,
} from '../../../config/security.utils';
import { Authority } from 'src/entity/authority.entity';
import { AdminSignInResponse } from './dto/admin-sign-in.response';
import { Role, Status } from 'common/variable.utils';

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

  async signInUser(request: any, signInRequest: AdminSignInRequest) {
    try {
      // 입력한 이메일에 해당하는 유저값 추출
      const admin = await this.adminRepository.findOne({
        where: { email: signInRequest.email, status: 'ACTIVE' },
      });

      // 존재하지 않는 관리자 체크
      if (admin == undefined) {
        return RESPONSE.NON_EXIST_EMAIL;
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
        return RESPONSE.NON_MATCH_PASSWORD;
      }

      // 유저의 권한값 추출
      const authority = await this.authorityRepository.findOne({
        where: { id: admin.authority, status: 'ACTIVE' },
      });

      // 존재하지 않는 권한인 경우
      if (authority == undefined) {
        return RESPONSE.INVALID_AUTHORITY;
      }

      //payload값 생성

      const payload: Payload = {
        id: admin.id,
        authority: authority.type,
        role: Role.ADMIN,
      };

      //토큰 생성
      const token = await this.jwtService.sign(payload);

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        jwt: token,
        id: admin.id,
        authority: authority.type,
      };

      const result = makeResponse(RESPONSE.SUCCESS, data);
      await saveApiCallHistory(Role.ADMIN, request, result);

      return result;
    } catch (error) {
      return RESPONSE.ERROR;
    }
  }

  async signUpUser(request: any, signUpRequest: AdminSignUpRequest) {
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
        return RESPONSE.EXIST_EMAIL;
      }

      // 존재하는 권한 아이디인지 체크
      const isExistAuthorityId = await this.authorityRepository.count({
        where: { id: signUpRequest.authority, status: 'ACTIVE' },
      });

      if (isExistAuthorityId === 0) {
        return RESPONSE.INVALID_AUTHORITY;
      }

      // AdminInfo 인스턴스 생성후, 정보 담는 부분
      const adminInfo = new AdminInfo();
      adminInfo.email = signUpRequest.email;
      adminInfo.password = securityData.hashedPassword;
      adminInfo.authority = signUpRequest.authority;
      const createUserData = await queryRunner.manager.save(adminInfo);

      // AdminSalt 인스턴스 생성후, 정보 담는 부분
      const adminSalt = new AdminSalt();
      adminSalt.salt = securityData.salt;
      adminSalt.adminId = createUserData.id;
      await await queryRunner.manager.save(adminSalt);

      // Commit
      await queryRunner.commitTransaction();

      // Response의 result 객체에 Data를 담는 부분
      const data = {
        id: createUserData.id,
        email: createUserData.email,
      };

      const result = makeResponse(RESPONSE.SUCCESS, data);
      await saveApiCallHistory(Role.ADMIN, request, result);

      return result;
    } catch (error) {
      // Rollback
      await queryRunner.rollbackTransaction();
      return RESPONSE.ERROR;
    } finally {
      await queryRunner.release();
    }
  }

  async isExistUser(id: number) {
    try {
      const admin = await this.adminRepository.findOne({
        where: { id: id, status: Status.ACTIVE },
      });
      // 유저가 존재하지 않는 경우
      if (admin == undefined) {
        return false;
      }
      return true;
    } catch (error) {
      throw new HttpException(RESPONSE.ERROR, 200);
    }
  }
}
