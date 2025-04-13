import { HttpException, HttpStatus } from '@nestjs/common';

export const makeCustomHttpException: (
  defaultMessage: string,
  status: HttpStatus
) => new (message?: string) => HttpException = function (defaultMessage, status) {
  return class extends HttpException {
    constructor(message: string = defaultMessage) {
      super(
        {
          statusCode: status,
          messageError: message ?? defaultMessage,
          timestamp: new Date()
        },
      status);
    }
  };
};