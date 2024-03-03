import config from 'config';
import { NextFunction, Request, Response } from 'express';
import { IHttpError } from '../errors';

const INCLUDE_STACK = config.get('logger.include_stack');

export const handlerMiddleware = () => {
  return (err: IHttpError, req: Request, res: Response, next: NextFunction) => {
    const errorResponse = {
      statusCode: err.statusCode || 500,
      message: err.message || 'Unknown error',
    };

    const stackObj = INCLUDE_STACK ? { stack: err.stack } : {};
    const fullError = Object.assign({}, errorResponse, stackObj);

    console.error(fullError);

    res.status(errorResponse.statusCode).send(errorResponse);

    if (errorResponse.statusCode >= 500) {
      setTimeout(() => {
        process.kill(process.pid, 'SIGTERM');
      }, 2000);
    }
  };
};


