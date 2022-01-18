// export class ResponseMessage {
//   private result: any | any[];
//   private message: string;
//   private isSuccess: boolean;
//   private code: number;
//   public makeResponse(response: any, data: any | any[]);
//   // constructor(
//   //   result: any | any[],
//   //   message: string,
//   //   isSuccess: boolean,
//   //   code: number,
//   // ) {}

//   public makeResponse(response: any, data: any | any[]): ResponseMessage {
//     this.result = data;
//     this.message = response.message;
//     this.code = response.code;
//     this.isSuccess = response.isSuccess;
//     return this;
//   }
// }

// export function body(response. any, data: any | any[] = ''): ResponseMessage {
//   ResponseMessage res = new ResponseMessage();

//   return res;
// }
export function makeResponse(response: any, data: any | any[]) {
  response.result = data;

  return response;
}
