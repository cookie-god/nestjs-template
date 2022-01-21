export abstract class BaseResponse {
  isSuccess: string;
  code: number;
  message: string;
  result: any | any[];
}
