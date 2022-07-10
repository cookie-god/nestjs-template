import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { regularExp } from 'config/regularExp';
import { RESPONSE } from 'config/response.utils';

// Auth관련 데코레이터
export const SignInUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const body = ctx.switchToHttp().getRequest().body;
    if (!body.email) {
      throw new HttpException(RESPONSE.EMPTY_EMAIL, 201);
    }
    if (!regularExp.emailRegex.test(body.email)) {
      throw new HttpException(RESPONSE.INVALID_EMAIL, 201);
    }
    if (!body.password) {
      throw new HttpException(RESPONSE.EMPTY_PASSWORD, 201);
    }
    if (!regularExp.passwordRegex.test(body.password)) {
      throw new HttpException(RESPONSE.INVALID_PASSWORD, 201);
    }
    return body;
  },
);

export const SignUpUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const body = ctx.switchToHttp().getRequest().body;
    if (!body.email) {
      throw new HttpException(RESPONSE.EMPTY_EMAIL, 201);
    }
    if (!regularExp.emailRegex.test(body.email)) {
      throw new HttpException(RESPONSE.INVALID_EMAIL, 201);
    }
    if (!body.password) {
      throw new HttpException(RESPONSE.EMPTY_PASSWORD, 201);
    }
    if (!regularExp.passwordRegex.test(body.password)) {
      throw new HttpException(RESPONSE.INVALID_PASSWORD, 201);
    }
    if (!body.confirmPassword) {
      throw new HttpException(RESPONSE.EMPTY_CONFIRM_PASSWORD, 201);
    }
    if (!regularExp.passwordRegex.test(body.confirmPassword)) {
      throw new HttpException(RESPONSE.INVALID_CONFIRM_PASSWORD, 201);
    }
    if (body.password !== body.confirmPassword) {
      throw new HttpException(RESPONSE.NOT_MATCH_CONFIRM_PASSWORD, 201);
    }
    if (!body.nickname) {
      throw new HttpException(RESPONSE.EMPTY_NICKNAME, 201);
    }
    if (body.nickname.length > 20) {
      throw new HttpException(RESPONSE.INVALID_NICKNAME, 201);
    }
    return body;
  },
);
