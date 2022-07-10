import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse, saveApiCallHistory } from 'common/function.utils';
import { HistoryType, Role } from 'common/variable.utils';
import { RESPONSE } from 'config/response.utils';
import { UserInfo } from 'src/entity/user-info.entity';
import { getManager, Repository } from 'typeorm';
import { Payload } from '../auth/jwt/jwt.payload';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
  ) {}

  async retrieveUsers(payload: Payload, request: any) {
    try {
      let users = [];
      // Master/Consultant,PM 유저인 경우
      if (payload.authority === 'Master') {
        users = await getManager()
          .createQueryBuilder(UserInfo, 'user')
          .select([
            'user.id',
            'user.email',
            'user.nickname',
            'user.createdAt',
            'user.status',
          ])
          .getMany();
      } else if (payload.authority == 'Consultant') {
        users = await getManager()
          .createQueryBuilder(UserInfo, 'user')
          .select(['user.id', 'user.email', 'user.createdAt', 'user.status'])
          .getMany();
      } else {
        users = await getManager()
          .createQueryBuilder(UserInfo, 'user')
          .select(['user.id', 'user.email', 'user.createdAt', 'user.status'])
          .getMany();
      }

      const data = {
        users: users,
      };

      const result = makeResponse(RESPONSE.SUCCESS, data);

      await saveApiCallHistory(
        HistoryType.READ,
        Role.ADMIN,
        '[관리자] 유저 리스트 조회 API',
        request,
        result,
      );

      return result;
    } catch (error) {
      return RESPONSE.ERROR;
    }
  }
}
