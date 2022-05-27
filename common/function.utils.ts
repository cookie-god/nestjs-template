import { HttpException } from '@nestjs/common';
import { response } from 'config/response.utils';

export function makeResponse(response: any, data: any | any[] | undefined) {
  response.result = data;
  return response;
}
