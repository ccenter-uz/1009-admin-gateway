import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status =
      exception?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      (typeof exception?.response?.message === 'string'
        ? exception?.response?.message
        : exception?.response?.message[0]) || 'Internal server error';

    if (exception instanceof TokenExpiredError) {
      status = HttpStatus.UNAUTHORIZED;
      message = exception.message;
    }

    this.logger.debug(
      `Exception Filter: ${JSON.stringify(
        {
          status: 'error',
          result: null,
          error: {
            message: typeof message === 'string' ? message : message['message'],
          },
        },
        null,
        2
      )}`
    );

    response.status(status).json({
      status: status,
      result: null,
      error: {
        message: typeof message === 'string' ? message : message['message'],
      },
    });
  }
}
