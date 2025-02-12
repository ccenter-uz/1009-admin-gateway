import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.log(exception, 'ERROR EXCEPTION');

    let status: number;
    let message: string;
    if (
      exception instanceof TokenExpiredError &&
      exception instanceof UnauthorizedException
    ) {
      status = HttpStatus.UNAUTHORIZED;
      message = exception.message;
    }
   
    if (exception?.response) {
      status =
        exception?.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

      message =
        (typeof exception?.response?.message === 'string'
          ? exception?.response?.message
          : exception?.response?.message[0]) || 'Internal server error';
    } else if (exception?.error) {
      status = exception?.error?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

      message =
        (typeof exception?.error?.message === 'string'
          ? exception?.error?.message
          : exception?.error?.message[0]) || 'Internal server error';
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
