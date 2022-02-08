import { Controller, Get } from '@nestjs/common';
import { makeResponse } from '../../common/response.utils';
import { response } from '../../config/response.utils';

@Controller('users')
export class UserController {
  // @Get()
  // getUsers() {
  //  return makeResponse(baseResponse.USER_ID_EMPTY, { hi: 'hi' });
  // }
}
