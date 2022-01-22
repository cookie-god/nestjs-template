import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { SignUpUser, SignInUser } from 'common/decorators/user.decorator';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  postSignIn(@SignInUser() signInData: SignInDto) {
    return this.authService.signInUser(signInData);
  }

  @Post('sign-up')
  postSignUp(@SignUpUser() signUpData: SignUpDto) {
    return this.authService.signUpUser(signUpData);
  }
}
