import { HttpException } from '@nestjs/common';
import { Role } from 'common/variable.utils';
import { response } from 'config/response.utils';
import jwt_decode from 'jwt-decode';
import { Payload } from './jwt.payload';

/**
 * description : jwt 해독 함수. required에 따라서 jwt가 반드시 필요한 함수인지 아닌지 체크.
 * @param jwt
 * @param required
 * @returns Payload or undefined
 */
export function jwtDecode(jwt: string | undefined, required: boolean): Payload {
  // jwt가 반드시 필요한 경우와 필요하지 않은 경우
  if (required) {
    try {
      const payload: Payload = jwt_decode(jwt);
      if (payload.role !== Role.USER) {
        throw new HttpException(response.CHECK_JWT_TOKEN, 201);
      }
      return payload;
    } catch (error) {
      throw new HttpException(response.CHECK_JWT_TOKEN, 201);
    }
  } else {
    if (jwt != undefined) {
      try {
        const payload: Payload = jwt_decode(jwt);
        return payload;
      } catch (error) {
        throw new HttpException(response.CHECK_JWT_TOKEN, 201);
      }
    } else {
      return undefined;
    }
  }
}
