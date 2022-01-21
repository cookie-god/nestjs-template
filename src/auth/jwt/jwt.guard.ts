import {
  ExecutionContext,
  ForbiddenException,
  Header,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { makeResponse } from 'common/response.utils';
import { baseResponse } from 'config/baseResponse.utils';
import { Observable } from 'rxjs';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (!user) {
      throw new UnauthorizedException(baseResponse.CHECK_JWT_TOKEN);
    }
    return user;
  }
}
