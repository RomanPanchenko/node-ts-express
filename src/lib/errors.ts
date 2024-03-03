export interface IHttpError {
  statusCode: number;
  message: string;
  stack?: string;
}

export class HttpError extends Error implements IHttpError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export class ValidationError extends HttpError {
  public statusCode: number;

  constructor(message: string) {
    super(`Validation error: ${message}`);
    this.statusCode = 400;
  }
}