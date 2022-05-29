import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthorityCheck } from 'common/function.utils';
import { JwtAuthGuard } from 'config/jwt/jwt.guard';
import { response } from '../../../config/response.utils';
import { GetUsersResponse } from './dto/get-users.response';
import { UserService } from './user.service';

@Controller('admin/users')
@ApiTags('Admin Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * description : 권한별 유저 조회 API
   * @param non-exsit
   * @returns GetUsersResponse
   */
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 조회 (객체 리스트 리턴)' })
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: GetUsersResponse,
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
  getUsers(@Request() req) {
    // 권한별 유저 접근 확인
    if (
      !ApiAuthorityCheck(req.user.authority, ['Master', 'Consultant', 'PM'])
    ) {
      return response.CANNOT_ACCESS_BY_AUTHORITY;
    }
    return this.userService.retrieveUsers(req.user.authority);
  }
}
