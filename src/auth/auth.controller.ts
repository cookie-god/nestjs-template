import {Controller, Post, Request, UseGuards, Patch} from '@nestjs/common';
import {ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {PostSignIn, PostSignUp, PatchAuthInfo, PatchPassword, PostSearchEmail} from '../decorators/auth.decorator';
import { AuthService } from './auth.service';
import { PostSignInResponse } from './dto/response/post-sign-in.response';
import { PostSignInRequest } from './dto/request/post-sign-in.request';
import { PostSignUpRequest } from './dto/request/post-sign-up.request';
import { PostSignUpResponse } from './dto/response/post-sign-up.response';
import {infoLogger} from "../../config/logger/logger.function";
import {JwtAuthGuard} from "./jwt/jwt.guard";
import {BaseResponse} from "../../config/base.response";
import {PatchAuthInfoRequest} from "./dto/request/patch-auth-info.request";
import {ApiSaveService} from "../api-save.service";
import {HistoryType, UserType} from "../../common/variable.utils";
import {PatchPasswordRequest} from "./dto/request/patch-password.request";
import {PostSearchEmailRequest} from "./dto/request/post-search-email.request";
import {PostSearchEmailResponse} from "./dto/response/post-search-email.response";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly apiSaveService: ApiSaveService,
  ) {}

  /**
   * description : 로그인 API
   * @param postSignInRequest
   * @returns PostSignInResponse
   */
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: PostSignInResponse,
  })
  @ApiResponse({
    status: 2000,
    description: 'JWT 토큰을 확인해주세요.',
  })
  @ApiResponse({
    status: 2002,
    description: '이메일을 확인해주세요',
  })
  @ApiResponse({
    status: 2003,
    description: '비밀번호가 일치하지 않습니다.',
  })
  @ApiResponse({
    status: 2004,
    description: '이메일을 입력해주세요.',
  })
  @ApiResponse({
    status: 2005,
    description: '유효하지 않은 이메일 입니다.',
  })
  @ApiResponse({
    status: 2006,
    description: '비밀번호를 입력해주세요',
  })
  @ApiResponse({
    status: 2007,
    description: '유효하지 않은 비밀번호 입니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '로그인 API' })
  @ApiBody({ description: '로그인 DTO', type: PostSignInRequest })
  @Post('v1/sign-in')
  async postSignIn(@Request() req: any, @PostSignIn() postSignInRequest: PostSignInRequest) {
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.READ,
        UserType.USER,
        req.user ? req.user.id : 0,
        '로그인 API',
        req,
        null,
    );
    const res = await this.authService.signInUser(postSignInRequest);
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.READ,
        UserType.USER,
        req.user ? req.user.id : 0,
        '로그인 API',
        req,
        res,
    );
    infoLogger(req, res);
    return res;
  }

  /**
   * description : 회원가입 API
   * @param postSignUpRequest
   * @returns PostSignUpResponse
   */
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: PostSignUpResponse,
  })
  @ApiResponse({
    status: 2004,
    description: '이메일을 입력해주세요.',
  })
  @ApiResponse({
    status: 2005,
    description: '유효하지 않은 이메일 입니다.',
  })
  @ApiResponse({
    status: 2006,
    description: '비밀번호를 입력해주세요.',
  })
  @ApiResponse({
    status: 2007,
    description: '유효하지 않은 비밀번호 입니다.',
  })
  @ApiResponse({
    status: 2008,
    description: '확인 비밀번호를 입력해주세요.',
  })
  @ApiResponse({
    status: 2009,
    description: '유효하지 않은 확인 비밀번호 입니다.',
  })
  @ApiResponse({
    status: 2010,
    description: '확인 비밀번호와 일치하지 않습니다.',
  })
  @ApiResponse({
    status: 2011,
    description: '닉네임을 입력해주세요.',
  })
  @ApiResponse({
    status: 2012,
    description: '이미 사용중인 이메일입니다.',
  })
  @ApiResponse({
    status: 2014,
    description: '닉네임이 20자를 초과합니다.',
  })
  @ApiResponse({
    status: 2015,
    description: '핸드폰 번호를 입력해주세요.',
  })
  @ApiResponse({
    status: 2016,
    description: '유효하지 않은 핸드폰 번호입니다.',
  })
  @ApiResponse({
    status: 2017,
    description: '이미 사용중인 핸드폰 번호입니다.',
  })
  @ApiResponse({
    status: 2018,
    description: '이미 사용중인 닉네임입니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '회원가입 API' })
  @ApiBody({ description: '회원가입 DTO', type: PostSignUpRequest })
  @Post('v1/sign-up')
  async postSignUp(@Request() req: any, @PostSignUp() postSignUpRequest: PostSignUpRequest) {
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.CREATE,
        UserType.USER,
        req.user ? req.user.id : 0,
        '회원가입 API',
        req,
        null,
    );
    const res = await this.authService.createUser(postSignUpRequest);
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.CREATE,
        UserType.USER,
        req.user ? req.user.id : 0,
        '회원가입 API',
        req,
        res,
    );
    infoLogger(req, res);
    return res;
  }

  /**
   * description : 회원 정보 수정 API
   * @param patchAuthInfoRequest
   * @returns BaseResponse
   */
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: BaseResponse,
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
    status: 2011,
    description: '닉네임을 입력해주세요.',
  })
  @ApiResponse({
    status: 2014,
    description: '닉네임이 20자를 초과합니다.',
  })
  @ApiResponse({
    status: 2018,
    description: '이미 사용중인 닉네임입니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '회원 정보 수정 API' })
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  @ApiBody({ description: '회원 정보 수정 DTO', type: PatchAuthInfoRequest })
  @Patch('v1')
  async patchAuthInfo(@Request() req: any, @PatchAuthInfo() patchAuthInfoRequest: PatchAuthInfoRequest) {
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.UPDATE,
        UserType.USER,
        req.user ? req.user.id : 0,
        '회원 정보 수정 API',
        req,
        null,
    );
    const res = await this.authService.editUser(patchAuthInfoRequest, req.user);
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.UPDATE,
        UserType.USER,
        req.user ? req.user.id : 0,
        '회원 정보 수정 API',
        req,
        res,
    );
    infoLogger(req, res);
    return res;
  }

  /**
   * description : 이메일 찾기 API
   * @param postSearchUserEmailRequest
   * @returns PostSearchEmailResponse
   */
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: PostSearchEmailResponse,
  })
  @ApiResponse({
    status: 2013,
    description: '존재하지 않는 유저입니다.',
  })
  @ApiResponse({
    status: 2015,
    description: '핸드폰 번호를 입력해주세요.',
  })
  @ApiResponse({
    status: 2016,
    description: '유효하지 않은 핸드폰 번호입니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '이메일 찾기 API' })
  @ApiBody({ description: '이메일 찾기 DTO', type: PostSearchEmailRequest })
  @Post('v1/search-email')
  async postSearchEmail(@Request() req: any, @PostSearchEmail() postSearchEmailRequest: PostSearchEmailRequest) {
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.UPDATE,
        UserType.USER,
        req.user ? req.user.id : 0,
        '이메일 찾기 API',
        req,
        null,
    );
    const res = await this.authService.searchEmail(postSearchEmailRequest);
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.UPDATE,
        UserType.USER,
        req.user ? req.user.id : 0,
        '이메일 찾기 API',
        req,
        res,
    );
    infoLogger(req, res);
    return res;
  }

  /**
   * description : 회원 비밀번호 재설정 API
   * @param patchPasswordRequest
   * @returns BaseResponse
   */
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: BaseResponse,
  })
  @ApiResponse({
    status: 2013,
    description: '존재하지 않는 유저입니다.',
  })
  @ApiResponse({
    status: 2004,
    description: '이메일을 입력해주세요.',
  })
  @ApiResponse({
    status: 2005,
    description: '유효하지 않은 이메일 입니다.',
  })
  @ApiResponse({
    status: 2006,
    description: '비밀번호를 입력해주세요.',
  })
  @ApiResponse({
    status: 2007,
    description: '유효하지 않은 비밀번호 입니다.',
  })
  @ApiResponse({
    status: 2008,
    description: '확인 비밀번호를 입력해주세요.',
  })
  @ApiResponse({
    status: 2009,
    description: '유효하지 않은 확인 비밀번호 입니다.',
  })
  @ApiResponse({
    status: 2010,
    description: '확인 비밀번호와 일치하지 않습니다.',
  })
  @ApiResponse({
    status: 2015,
    description: '핸드폰 번호를 입력해주세요.',
  })
  @ApiResponse({
    status: 2016,
    description: '유효하지 않은 핸드폰 번호입니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '회원 비밀번호 재설정 API' })
  @ApiBody({ description: '회원 비밀번호 재설정 DTO', type: PatchPasswordRequest })
  @Patch('v1/password')
  async patchPassword(@Request() req: any, @PatchPassword() patchPasswordRequest: PatchPasswordRequest) {
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.UPDATE,
        UserType.USER,
        req.user ? req.user.id : 0,
        '회원 비밀번호 재설정 API',
        req,
        null,
    );
    const res = await this.authService.editPassword(patchPasswordRequest);
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.UPDATE,
        UserType.USER,
        req.user ? req.user.id : 0,
        '회원 비밀번호 재설정 API',
        req,
        res,
    );
    infoLogger(req, res);
    return res;
  }

  /**
   * description : 회원 탈퇴 API
   * @returns BaseResponse
   */
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: BaseResponse,
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
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '회원 탈퇴 API' })
  @ApiHeader({
    description: 'jwt token',
    name: 'x-access-token',
    example: 'JWT TOKEN',
  })
  @Patch('v1/status')
  async patchAuthStatus(@Request() req: any) {
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.DELETE,
        UserType.USER,
        req.user ? req.user.id : 0,
        '회원 탈퇴 API',
        req,
        null,
    );
    const res = await this.authService.removeUser(req.user);
    await this.apiSaveService.saveApiCallHistory(
        HistoryType.DELETE,
        UserType.USER,
        req.user ? req.user.id : 0,
        '회원 탈퇴 API',
        req,
        res,
    );
    infoLogger(req, res);
    return res;
  }
}


