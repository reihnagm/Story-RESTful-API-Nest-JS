import { ArgumentsHost, Catch, ExceptionFilter, InternalServerErrorException } from "@nestjs/common";
import { Response } from 'express';

@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    
    response
    .status(status)
    .json({
      status: 500,
      error: true,
      message: 'Oops! There was problem',
    });
  }
}