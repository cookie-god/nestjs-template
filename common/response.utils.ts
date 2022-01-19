export function makeResponse(response: any, data: any | any[] ) {
  response.result = data;
  return response;
}