import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'common/decorators/user.decorator';
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
  // @Body() signUpData: SignUpDto
  postSignUp(@CurrentUser() signUpData: SignUpDto) {
    console.log(signUpData);
    return this.authService.signUpUser(signUpData);
  }
}
