import { Controller, Get, Headers, Request, UseGuards} from '@nestjs/common';
import {ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import { GetUsersResponse } from './dto/response/get-users.response';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import {GetUsersRequest} from "./dto/request/get-users.request";
import {GetUsers, GetUsersDetail} from "../decorators/user.decorator";
import {infoLogger} from "../../config/logger/logger.function";
import {GetUsersDetailRequest} from "./dto/request/get-users-detail.request";
import {GetUsersDetailResponse} from "./dto/response/get-users-detail.response";
import {HistoryType, UserType} from "../../common/variable.utils";
import {ApiSaveService} from "../api-save.service";

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
      private readonly userService: UserService,
      private readonly apiSaveService: ApiSaveService,
  ) {}

  /**
   * description : 유저 조회 API
   * @param non-exsit
   * @returns GetUsersResponse
   */
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: GetUsersResponse,
  })
  @ApiResponse({
    status: 2000,
    description: 'JWT 토큰을 확인해주세요.',
  })
  @ApiResponse({
    status: 2013,
    description: '존재하지 않는 유저입니다.',
  })
  @ApiResponse({
    status: 2100,
    description: '페이지 번호를 입력해주세요.',
  })
  @ApiResponse({
    status: 2101,
    description: '유효하지 않은 페이지 값 입니다.',
  })
  @ApiResponse({
    status: 2102,
    description: '페이징 사이즈를 입력해주세요.',
  })
  @ApiResponse({
    status: 2103,
    description: '유효하지 않은 페이징 사이즈 입니다.',
  })
  @ApiResponse({
    status: 2104,
    description: '정렬 기준을 입력해주세요.',
  })
  @ApiResponse({
    status: 2105,
    description: '정렬 기준은 desc와 asc만 입력 가능합니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  @ApiQuery({
    description: '유저 조회 DTO',
    type: GetUsersRequest,
  })
  @ApiOperation({ summary: '유저 조회 API' })
  @UseGuards(JwtAuthGuard)
  @Get('/v1')
  async getUsers(@GetUsers() getUsersRequest: GetUsersRequest, @Request() req: any) {
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.READ,
        UserType.USER,
        req.user ? req.user.id : 0,
        '유저 조회 API',
        req,
        null,
    );
    const res = await this.userService.retrieveUsers(getUsersRequest);
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.READ,
        UserType.USER,
        req.user ? req.user.id : 0,
        '유저 조회 API',
        req,
        res,
    );
    infoLogger(req, res);
    return res;
  }

  /**
   * description : 유저 상세 조회 API
   * @param non-exsit
   * @returns GetUsersDetailResponse
   */
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: GetUsersDetailResponse,
  })
  @ApiResponse({
    status: 2000,
    description: 'JWT 토큰을 확인해주세요.',
  })
  @ApiResponse({
    status: 2013,
    description: '존재하지 않는 유저입니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  @ApiParam({
    name: 'userId',
    description: '유저 아이디',
    example: 1,
  })
  @ApiOperation({ summary: '유저 상세 조회 API' })
  @UseGuards(JwtAuthGuard)
  @Get('/v1/:userId')
  async getUsersDetail(@GetUsersDetail() getUsersDetailRequest: GetUsersDetailRequest, @Request() req: any) {
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.READ,
        UserType.USER,
        req.user ? req.user.id : 0,
        '유저 상세 조회 API',
        req,
        null,
    );
    const res = await this.userService.retrieveUserById(getUsersDetailRequest);
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.READ,
        UserType.USER,
        req.user ? req.user.id : 0,
        '유저 상세 조회 API',
        req,
        res,
    );
    infoLogger(req, res);
    return res;
  }
}
