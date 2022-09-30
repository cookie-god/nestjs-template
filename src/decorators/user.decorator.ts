import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { regularExp } from 'config/regularExp';
import { RESPONSE } from 'config/response.utils';

// User관련 데코레이터
export const GetUsers = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
      const getUsersData = ctx.switchToHttp().getRequest().query;
      if (!getUsersData.page) {
          throw new HttpException(RESPONSE.PAGE_EMPTY, 200);
      }
      if (getUsersData.page <= 0) {
          throw new HttpException(RESPONSE.INVALID_PAGE, 200);
      }
      if (!getUsersData.size) {
          throw new HttpException(RESPONSE.PAGE_SIZE_EMPTY, 200);
      }
      if (getUsersData.size <= 0) {
          throw new HttpException(RESPONSE.INVALID_PAGE_SIZE, 200);
      }
      if (!getUsersData.sortType) {
          throw new HttpException(RESPONSE.SORT_TYPE_EMPTY, 200);
      }
      if (getUsersData.sortType !== 'desc' && getUsersData.sortType !== 'asc') {
          throw new HttpException(RESPONSE.INVALID_SORT_TYPE, 200);
      }

      return getUsersData;
  },
);

export const GetUsersDetail = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
    const getUsersDetailData = ctx.switchToHttp().getRequest().params;
    if (!getUsersDetailData.userId) {
        throw new HttpException(RESPONSE.EMPTY_USER_ID, 200);
    }
    if (
        getUsersDetailData.userId <= 0 ||
        isNaN(parseInt(getUsersDetailData.userId))
    ) {
        throw new HttpException(RESPONSE.INVALID_USER_ID, 200);
    }
    return getUsersDetailData;
  },
);