import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiAuthorityCheck, makeResponse } from 'common/function.utils';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { response } from '../../config/response.utils';

@Controller('users')
@ApiTags('Users')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 조회' })
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  @Get('/v1')
  getUsersByMaster(@Request() req) {
    if (
      !ApiAuthorityCheck(req.user.authority, ['Master', 'Consultant', 'PM'])
    ) {
      return response.CANNOT_ACCESS_BY_AUTHORITY;
    }
    return makeResponse(response.SUCCESS, undefined);
  }
}
