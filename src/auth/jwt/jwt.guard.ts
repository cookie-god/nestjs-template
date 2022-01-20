import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { baseResponse } from 'config/baseResponse.utils';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // console.log(info);
    if (err || !user) {
      return baseResponse.NON_EXIST_EMAIL;
    }
    return user;
  }
}
