import { NextFunction, Request, Response } from 'express';
import { IHttpError } from '../errors';

export const handlerMiddleware = () => {
  return (err: IHttpError, req: Request, res: Response, next: NextFunction) => {
    const errorResponse = {
      statusCode: err.statusCode || 500,
      message: err.message || 'Unknown error',
    };

    const fullError = Object.assign({}, errorResponse, { stack: err.stack });
    console.error(fullError);

    res.status(errorResponse.statusCode).send(errorResponse);

    if (errorResponse.statusCode >= 500) {
      setTimeout(() => {
        process.kill(process.pid, 'SIGTERM');
      }, 2000);
    }
  };
};


