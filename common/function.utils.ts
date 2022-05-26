import { HttpException } from '@nestjs/common';
import { response } from 'config/response.utils';
import { Authority } from 'config/secret';

/* eslint-disable prettier/prettier */
export function makeResponse(response: any, data: any | any[] | undefined) {
  response.result = data;
  return response;
}

export function checkMasterAuthority(authority: string) {
  if (authority !== Authority.Master) {
    throw new HttpException(response.INVALID_AUTHORITY, 201);
  }
}
