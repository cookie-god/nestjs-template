import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse, saveApiCallHistory } from 'common/function.utils';
import { RESPONSE } from 'config/response.utils';
import { UserInfo } from 'src/entity/user-info.entity';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
  ) {}

  async retrieveUsers(request: any, authority: string) {
    try {
      let users = [];
      // Master/Consultant,PM 유저인 경우
      if (authority === 'Master') {
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
      } else if (authority == 'Consultant') {
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

      await saveApiCallHistory('Admin', request, result);
      return result;
    } catch (error) {
      return RESPONSE.ERROR;
    }
  }
}
