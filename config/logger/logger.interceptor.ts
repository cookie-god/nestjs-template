import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable()
export class HTTPLoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const loggerService = new LoggerService(req.url.slice(1).split('/')[0]);
    const tempUrl = req.method + ' ' + req.url.split('?')[0];
    const _headers = JSON.stringify(req.headers ? req.headers : {});
    const _query = JSON.stringify(req.query ? req.query : {});
    const _body = JSON.stringify(req.body ? req.body : {});
    const _url = JSON.stringify(tempUrl ? tempUrl : {});
    const now = Date.now();
    const method = req.method;
    const url = req.originalUrl;
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        const delay = Date.now() - now;

        loggerService.log(
          `${_url} ${_headers} ${_query} ${_body} \n${JSON.stringify(
            data,
          )} \ndelay = ${delay}ms`.replace(/\\/, ''),
        );
        console.log(`${response.statusCode} | [${method}] ${url} - ${delay}ms`);
        return data;
      }),
      catchError((error) => {
        const delay = Date.now() - now;
        console.error(
          `${response.statusCode} | [${method}] ${url} - ${delay}ms`,
        );
        return throwError(error);
      }),
    );
  }
}
