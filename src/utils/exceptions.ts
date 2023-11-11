export abstract class BaseException extends Error {
  public readonly statusCode: number;
  public readonly errors?: string[];
  constructor(message: string, statusCode: number, errors?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends BaseException {
  constructor(message = "Bad Request", errors?: string[]) {
    super(message, 400, errors);
  }
}

export class ForbiddenException extends BaseException {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class InternalServerException extends BaseException {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}
