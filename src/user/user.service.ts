import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {makeKSTToDateComponent, makeResponse} from 'common/function.utils';
import { RESPONSE } from 'config/response.utils';
import { UserInfo } from 'src/entity/user-info.entity';
import { DataSource, Repository } from 'typeorm';
import {GetUsersRequest} from "./dto/request/get-users.request";
import {UserQuery} from "./user.query";
import {errorLogger} from "../../config/logger/logger.function";
import {GetUsersDetailRequest} from "./dto/request/get-users-detail.request";
const location = __dirname + '/user.service.ts';
let currentFunction;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
    private userQuery: UserQuery,
    private connection: DataSource,
  ) {}

  async retrieveUsers(getUsersRequest: GetUsersRequest) {
    currentFunction = 'retrieveUsers'
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      try {
        const offset: number = getUsersRequest.size * (getUsersRequest.page - 1);
        const users = await queryRunner.query(
            this.userQuery.retrieveUsers(
                getUsersRequest,
                offset,
            ).retrieveUsersQuery,
        );

        let dateFormat
        for (const item of users) {
          dateFormat = makeKSTToDateComponent(item.createdAt)
          item.createdAt = `${dateFormat.year}-${dateFormat.month}-${dateFormat.day} ${dateFormat.hour}:${dateFormat.min}:${dateFormat.sec}`;
        }

        const totalCount = await queryRunner.query(
            this.userQuery.retrieveUsers(
                getUsersRequest,
                offset,
            ).retrieveUsersCountQuery
        );

        const data = {
          users: users,
          totalCount: totalCount.length,
        };

        const result = makeResponse(RESPONSE.SUCCESS, data);

        return result;
      } catch (error) {
        errorLogger(error, location, currentFunction);
        return RESPONSE.ERROR;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      errorLogger(error, location, currentFunction);
    }
  }

  async retrieveUserById(getUsersDetailRequest: GetUsersDetailRequest) {
    currentFunction = 'retrieveUserById'
    try {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      try {
        const [user] = await queryRunner.query(
            this.userQuery.retrieveUserById(getUsersDetailRequest)
        )

        if (!user) {
          return RESPONSE.NON_EXIST_USER;
        }

        const dateFormat = makeKSTToDateComponent(user.createdAt)
        user.createdAt = `${dateFormat.year}-${dateFormat.month}-${dateFormat.day} ${dateFormat.hour}:${dateFormat.min}:${dateFormat.sec}`;
        const result = makeResponse(RESPONSE.SUCCESS, user);

        return result;
      } catch (error) {
        errorLogger(error, location, currentFunction);
        return RESPONSE.ERROR;
      } finally {
        await queryRunner.release();
      }
    } catch (error) {
      errorLogger(error, location, currentFunction);
    }
  }
}
