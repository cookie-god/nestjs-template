import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { regularExp } from 'config/regularExp';
import { response } from 'config/response.utils';
import { runInThisContext } from 'vm';

export const SignUpUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const body = ctx.switchToHttp().getRequest().body;
    if (!body.email) {
      throw new UnauthorizedException(response.EMPTY_EMAIL);
    }
    if (!regularExp.emailRegex.test(body.email)) {
      throw new UnauthorizedException(response.INVALID_EMAIL);
    }
    if (!body.password) {
      throw new UnauthorizedException(response.EMPTY_PASSWORD);
    }
    if (!regularExp.passwordRegex.test(body.password)) {
      throw new UnauthorizedException(response.INVALID_PASSWORD);
    }
    if (!body.confirmPassword) {
      throw new UnauthorizedException(response.EMPTY_CONFIRM_PASSWORD);
    }
    if (!regularExp.passwordRegex.test(body.confirmPassword)) {
      throw new UnauthorizedException(response.INVALID_CONFIRM_PASSWORD);
    }
    if (body.password !== body.confirmPassword) {
      throw new UnauthorizedException(response.NOT_MATCH_CONFIRM_PASSWORD);
    }
    if (!body.nickname) {
      throw new UnauthorizedException(response.EMPTY_NICKNAME);
    }
    return body;
  },
);

export const SignInUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const body = ctx.switchToHttp().getRequest().body;
    if (!body.email) {
      throw new UnauthorizedException(response.EMPTY_EMAIL);
    }
    if (!regularExp.emailRegex.test(body.email)) {
      throw new UnauthorizedException(response.INVALID_EMAIL);
    }
    if (!body.password) {
      throw new UnauthorizedException(response.EMPTY_PASSWORD);
    }
    if (!regularExp.passwordRegex.test(body.password)) {
      throw new UnauthorizedException(response.INVALID_PASSWORD);
    }
    return body;
  },
);
