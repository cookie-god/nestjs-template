import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignUpUser, SignInUser } from 'common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 1000,
    description: '성공',
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
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ description: '로그인 DTO', type: SignInDto })
  @Post('sign-in')
  postSignIn(@SignInUser() signInData: SignInDto) {
    return this.authService.signInUser(signInData);
  }

  @ApiResponse({
    status: 1000,
    description: '성공',
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
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ description: '회원가입 DTO', type: SignUpDto })
  @Post('sign-up')
  postSignUp(@SignUpUser() signUpData: SignUpDto) {
    return this.authService.signUpUser(signUpData);
  }
}
