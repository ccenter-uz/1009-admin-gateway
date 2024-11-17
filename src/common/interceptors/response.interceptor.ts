// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { ApiResponseType } from 'types/global';

// @Injectable()
// export class ResponseInterceptor<T> implements NestInterceptor {
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler
//   ): Observable<ApiResponseType<T>> {
//     const ctx = context.switchToHttp();
//     const response = ctx.getResponse();

//     return next.handle().pipe(
//       map((data) => ({
//         status: response.statusCode,
//         result: data,
//         error: null,
//       }))
//     );
//   }
// }
