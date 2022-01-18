import { Controller, Get } from '@nestjs/common';
import { makeResponse } from 'config/response.utils';
import { baseResponse } from '../../config/baseResponse.utils';

@Controller('users')
export class UserController {
  @Get()
  getUsers() {
    return makeResponse(baseResponse.USER_ID_EMPTY, { hi: 'hi' });
  }
}
