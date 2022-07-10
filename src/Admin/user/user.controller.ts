import { Controller, Get, Headers, Request } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthorityCheck } from 'common/function.utils';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RESPONSE } from '../../../config/response.utils';
import { AdminGetUsersResponse } from './dto/admin-get-users.response';
import { UserService } from './user.service';
import { jwtDecode } from '../auth/jwt/jwt.utils';
import { Payload } from '../auth/jwt/jwt.payload';

@Controller('admin/users')
@ApiTags('Admin Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * description : 권한별 유저 조회 API
   * @param non-exsit
   * @returns GetUsersResponse
   */
  @ApiOperation({ summary: '유저 조회 (객체 리스트 리턴)' })
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: AdminGetUsersResponse,
  })
  @ApiResponse({
    status: 2000,
    description: '존재하지 않는 유저입니다.',
  })
  @ApiResponse({
    status: 2013,
    description: '존재하지 않는 유저입니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @Get('/v1')
  getUsers(@Headers('x-access-token') jwt, @Request() request) {
    // jwt 해독
    const payload: Payload = jwtDecode(jwt, true);

    // 권한별 유저 접근 확인
    if (
      !ApiAuthorityCheck(request.user.authority, ['Master', 'Consultant', 'PM'])
    ) {
      return RESPONSE.CANNOT_ACCESS_BY_AUTHORITY;
    }
    return this.userService.retrieveUsers(payload, request);
  }
}
