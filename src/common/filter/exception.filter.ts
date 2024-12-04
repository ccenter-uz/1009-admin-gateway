import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.response || 'Internal server error';
    console.log(123);
    
    this.logger.debug(
      `Exception Filter: ${JSON.stringify(
        {
          status: 'error',
          result: null,
          error: {
            message: typeof message === 'string' ? message : message['message'],
            details: typeof message === 'object' ? message : null,
          },
        },
        null,
        2
      )}`
    );

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
