import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse } from 'common/function.utils';
import { response } from 'config/response.utils';
import { Authority } from 'src/entity/authority.entity';
import { UserInfo } from 'src/entity/userInfo.entity';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
  ) {}

  async retrieveUsers(authority: string) {
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
            'user.authority',
            'user.createdAt',
            'user.status',
          ])
          .getMany();
      } else if (authority == 'Consultant') {
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
      } else {
        users = await getManager()
          .createQueryBuilder(UserInfo, 'user')
          .select(['user.id', 'user.email', 'user.createdAt', 'user.status'])
          .getMany();
      }

      const data = {
        users: users,
      };
      return makeResponse(response.SUCCESS, data);
    } catch (error) {
      return response.ERROR;
    }
  }
}
