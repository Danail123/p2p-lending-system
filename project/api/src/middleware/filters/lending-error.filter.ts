import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LendingSystemError } from '../exceptions/lending-system.error';

@Catch(LendingSystemError)
export class LendingSystemErrorFilter implements ExceptionFilter {
  public catch(exception: LendingSystemError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.code).json({
      status: exception.code,
      error: exception.message,
    });
  }
}
