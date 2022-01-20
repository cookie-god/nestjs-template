import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  postSignIn(@Body() signInData: SignInDto) {
    return this.authService.signInUser(signInData);
  }

  @Post('sign-up')
  postSignUp(@Body() signUpData: SignUpDto) {
    return this.authService.signUpUser(signUpData);
  }
}
