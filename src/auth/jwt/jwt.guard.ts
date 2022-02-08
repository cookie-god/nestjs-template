import { HttpException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'config/response.utils';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err != null) {
      throw new HttpException(response.NON_EXIST_USER, 201);
    }
    if (!user) {
      throw new HttpException(response.CHECK_JWT_TOKEN, 201);
    }
    return user;
  }
}
