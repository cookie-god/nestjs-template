import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { makeResponse } from 'common/function.utils';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { response } from '../../config/response.utils';

@Controller('users')
@ApiTags('Users')
export class UserController {
  @UseGuards(JwtAuthGuard)
  // @ApiAuthorityCheck(['Master', 'Consultant', 'PM'])
  @ApiOperation({ summary: '마스터 유저 조회' })
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  @Get('/v1/master')
  getUsersByMaster(@Request() req) {
    return makeResponse(response.SUCCESS, undefined);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/v1/consultant')
  getUsersByConsultant() {
    return response.SUCCESS;
  }

  @Get('/v1/pm')
  getUsersByPm() {
    return response.SUCCESS;
  }

  @Get('/v1/marker')
  getUsersByMarker() {
    return response.SUCCESS;
  }
}
