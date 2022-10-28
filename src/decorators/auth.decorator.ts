import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { regularExp } from 'config/regularExp';
import { RESPONSE } from 'config/response.utils';

// Auth관련 데코레이터
export const PostSignIn = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const postSignInData = ctx.switchToHttp().getRequest().body;
    if (!postSignInData.email) {
      throw new HttpException(RESPONSE.EMPTY_EMAIL, 201);
    }
    if (!regularExp.emailRegex.test(postSignInData.email)) {
      throw new HttpException(RESPONSE.INVALID_EMAIL, 201);
    }
    if (!postSignInData.password) {
      throw new HttpException(RESPONSE.EMPTY_PASSWORD, 201);
    }
    if (!regularExp.passwordRegex.test(postSignInData.password)) {
      throw new HttpException(RESPONSE.INVALID_PASSWORD, 201);
    }
    return postSignInData;
  },
);

export const PostSignUp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const postSignUpData = ctx.switchToHttp().getRequest().body;
    if (!postSignUpData.email) {
      throw new HttpException(RESPONSE.EMPTY_EMAIL, 201);
    }
    if (!regularExp.emailRegex.test(postSignUpData.email)) {
      throw new HttpException(RESPONSE.INVALID_EMAIL, 201);
    }
    if (!postSignUpData.password) {
      throw new HttpException(RESPONSE.EMPTY_PASSWORD, 201);
    }
    if (!regularExp.passwordRegex.test(postSignUpData.password)) {
      throw new HttpException(RESPONSE.INVALID_PASSWORD, 201);
    }
    if (!postSignUpData.confirmPassword) {
      throw new HttpException(RESPONSE.EMPTY_CONFIRM_PASSWORD, 201);
    }
    if (!regularExp.passwordRegex.test(postSignUpData.confirmPassword)) {
      throw new HttpException(RESPONSE.INVALID_CONFIRM_PASSWORD, 201);
    }
    if (postSignUpData.password !== postSignUpData.confirmPassword) {
      throw new HttpException(RESPONSE.NOT_MATCH_CONFIRM_PASSWORD, 201);
    }
    if (!postSignUpData.phoneNumber) {
      throw new HttpException(RESPONSE.EMPTY_PHONE_NUMBER, 201);
    }
    if (!regularExp.phoneNumberRegex.test(postSignUpData.phoneNumber)) {
      throw new HttpException(RESPONSE.INVALID_PHONE_NUMBER, 201);
    }
    if (!postSignUpData.nickname) {
      throw new HttpException(RESPONSE.EMPTY_NICKNAME, 201);
    }
    if (postSignUpData.nickname.length > 20) {
      throw new HttpException(RESPONSE.INVALID_NICKNAME, 201);
    }
    return postSignUpData;
  },
);

export const PatchAuthInfo = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
    const patchAuthInfoData = ctx.switchToHttp().getRequest().body;
    if (!patchAuthInfoData.nickname) {
        throw new HttpException(RESPONSE.EMPTY_NICKNAME, 201);
    }
    if (patchAuthInfoData.nickname.length > 20) {
        throw new HttpException(RESPONSE.INVALID_NICKNAME, 201);
    }
    return patchAuthInfoData;
    },
);

export const PostSearchEmail = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const postSearchEmailData = ctx.switchToHttp().getRequest().body;
        if (!postSearchEmailData.phoneNumber) {
            throw new HttpException(RESPONSE.EMPTY_PHONE_NUMBER, 201);
        }
        if (!regularExp.phoneNumberRegex.test(postSearchEmailData.phoneNumber)) {
            throw new HttpException(RESPONSE.INVALID_PHONE_NUMBER, 201);
        }
        return postSearchEmailData;
    },
);

export const PatchPassword = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const patchPasswordData = ctx.switchToHttp().getRequest().body;
        if (!patchPasswordData.email) {
            throw new HttpException(RESPONSE.EMPTY_EMAIL, 201);
        }
        if (!regularExp.emailRegex.test(patchPasswordData.email)) {
            throw new HttpException(RESPONSE.INVALID_EMAIL, 201);
        }
        if (!patchPasswordData.password) {
            throw new HttpException(RESPONSE.EMPTY_PASSWORD, 201);
        }
        if (!regularExp.passwordRegex.test(patchPasswordData.password)) {
            throw new HttpException(RESPONSE.INVALID_PASSWORD, 201);
        }
        if (!patchPasswordData.confirmPassword) {
            throw new HttpException(RESPONSE.EMPTY_CONFIRM_PASSWORD, 201);
        }
        if (!regularExp.passwordRegex.test(patchPasswordData.confirmPassword)) {
            throw new HttpException(RESPONSE.INVALID_CONFIRM_PASSWORD, 201);
        }
        if (patchPasswordData.password !== patchPasswordData.confirmPassword) {
            throw new HttpException(RESPONSE.NOT_MATCH_CONFIRM_PASSWORD, 201);
        }
        if (!patchPasswordData.phoneNumber) {
            throw new HttpException(RESPONSE.EMPTY_PHONE_NUMBER, 201);
        }
        if (!regularExp.phoneNumberRegex.test(patchPasswordData.phoneNumber)) {
            throw new HttpException(RESPONSE.INVALID_PHONE_NUMBER, 201);
        }
        return patchPasswordData;
    },
);