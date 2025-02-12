import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { InfisicalException } from './infisical.exception';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : 500;

    if (exception instanceof InfisicalException) {
      response.statusCode(httpStatus).json({
        error: 'InfisicalException',
        message: exception.message
      });
    } else if (exception instanceof HttpException) {
      const httpStatus = exception.getStatus();

      response.statusCode(httpStatus).json({
        message: exception.message,
        error: exception.name
      });
    } else {
      response.statusCode(httpStatus).json({
        message: exception.message,
        error: exception.name
      });
    }
  }
}
