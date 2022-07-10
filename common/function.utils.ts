import { HttpException } from '@nestjs/common';
import { RESPONSE } from 'config/response.utils';
import { getManager } from 'typeorm';

/**
 * description : response를 만들어 주는 함수, result에 들어갈 것이 없다면 undefined 입력해야함
 * @param response
 * @param data
 * @returns object
 */
export function makeResponse(response: any, data: any | any[] | undefined) {
  response.result = data;
  return response;
}

/**
 * description : 권한 체크 함수
 * @param authority
 * @param list
 * @returns boolean
 */
export function ApiAuthorityCheck(authority: string, list: string[]) {
  if (list.indexOf(authority) === -1) {
    return false;
  }
  return true;
}

/**
 * description : ApiCallHistory에 로그 저장하는 함수
 */
export async function saveApiCallHistory(userType: string, req: any, res: any) {
  let userId = 0;
  let queryString = null;
  let pathVariable = null;
  let body = null;
  try {
    if (req.user != undefined) {
      userId = req.user.id;
    }
    if (req.query != undefined) {
      queryString = req.query;
    }
    if (req.params != undefined) {
      pathVariable = req.params;
    }
    if (req.body != undefined) {
      body = req.body;
    }
    const query = `
      INSERT INTO ApiCallHistory(userType, savedId, apiUrl, apiMethod,
      requestQuery, requestBody, requestParams, responseParams)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const param = [
      userType,
      userId,
      req.url,
      req.method,
      JSON.stringify(queryString),
      JSON.stringify(body),
      JSON.stringify(pathVariable),
      JSON.stringify(res),
    ];
    const entityManager = getManager();
    await entityManager.query(query, param);
  } catch (error) {
    throw new HttpException(RESPONSE.ERROR, 201);
  }
}
