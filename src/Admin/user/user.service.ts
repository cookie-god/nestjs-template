import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { makeResponse } from 'common/function.utils';
import { response } from 'config/response.utils';
import { Authority } from 'src/entity/authority.entity';
import { AdminInfo } from 'src/entity/admin-info.entity';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AdminInfo)
    private readonly adminRepository: Repository<AdminInfo>,
    @InjectRepository(Authority)
    private readonly authorityRepository: Repository<Authority>,
  ) {}

  async retrieveUsers(authority: string) {
    try {
      let users = [];
      // Master/Consultant,PM 유저인 경우
      if (authority === 'Master') {
        users = await getManager()
          .createQueryBuilder(AdminInfo, 'user')
          .select([
            'user.id',
            'user.email',
            'user.authority',
            'user.createdAt',
            'user.status',
          ])
          .getMany();
      } else if (authority == 'Consultant') {
        users = await getManager()
          .createQueryBuilder(AdminInfo, 'user')
          .select(['user.id', 'user.email', 'user.createdAt', 'user.status'])
          .getMany();
      } else {
        users = await getManager()
          .createQueryBuilder(AdminInfo, 'user')
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
