import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.getResponse() || 'Internal server error';

    response.status(status).json({
      status: 'error',
      result: null,
      error: {
        message: typeof message === 'string' ? message : message['message'],
        details: typeof message === 'object' ? message : null,
      },
    });
  }
}
