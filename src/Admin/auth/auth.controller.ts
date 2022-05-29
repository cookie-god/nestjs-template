import { Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  SignUpUser,
  SignInUser,
} from '../../../common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { AdminSignInRequest } from './dto/admin-sign-in.request';
import { AdminSignInResponse } from './dto/admin-sign-in.response';
import { AdminSignUpRequest } from './dto/admin-sign-up.request';
import { AdminSignUpResponse } from './dto/admin-sign-up.response';

@Controller('admin/auth')
@ApiTags('Admin Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * description : 로그인 API
   * @param SignInRequest
   * @returns SignInResponse
   */
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: AdminSignInResponse,
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
    description: '비밀번호를 입력해주세요',
  })
  @ApiResponse({
    status: 2007,
    description: '유효하지 않은 비밀번호 입니다.',
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
    status: 2015,
    description: '유효하지 않은 권한입니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ description: '로그인 DTO', type: AdminSignInRequest })
  @Post('sign-in')
  postSignIn(@SignInUser() signInRequest: AdminSignInRequest) {
    return this.authService.signInUser(signInRequest);
  }

  /**
   * description : 회원가입 API
   * @param SignUpRequest
   * @returns SignUpResponse
   */
  @ApiResponse({
    status: 1000,
    description: '성공',
    type: AdminSignUpResponse,
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
    status: 2012,
    description: '이미 사용중인 이메일입니다.',
  })
  @ApiResponse({
    status: 2014,
    description: '권한을 입력해주세요.',
  })
  @ApiResponse({
    status: 2015,
    description: '유효하지 않은 권한입니다.',
  })
  @ApiResponse({
    status: 4000,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ description: '회원가입 DTO', type: AdminSignUpRequest })
  @Post('sign-up')
  postSignUp(@SignUpUser() signUpRequest: AdminSignUpRequest) {
    return this.authService.signUpUser(signUpRequest);
  }
}
