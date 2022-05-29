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
