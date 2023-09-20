export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;

  constructor(name: string, httpCode: HttpStatusCode, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}

export class APIError extends BaseError {
  constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, description = "internal server error") {
    super(name, httpCode, description);
  }
}

export class AuthenticationError extends BaseError {
  constructor(name = "AuthenticationError", httpCode = HttpStatusCode.NOT_AUTHENTICATED, description = "authentication required") {
    super(name, httpCode, description);
  }
}

export class AuthorizationError extends BaseError {
  constructor(description = "forbidden") {
    super("AuthorizationError", HttpStatusCode.FORBIDDEN, description);
  }
}

export class NotFoundError extends BaseError {
  constructor(description = "not found") {
    super("NotFoundError", HttpStatusCode.NOT_FOUND, description);
  }
}

export class HTTP400Error extends BaseError {
  constructor(name, httpCode = HttpStatusCode.BAD_REQUEST, description = "bad request error") {
    super(name, httpCode, description);
  }
}

export class IOError extends BaseError {
  constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, description = "IO error") {
    super(name, httpCode, description);
  }
}

export class UnprocessableError extends BaseError {
  constructor(name, httpCode = HttpStatusCode.UNPROCESSABLE, description = "this request could not be processed") {
    super(name, httpCode, description);
  }
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_AUTHENTICATED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  UNPROCESSABLE = 422,
  INTERNAL_SERVER = 500,
}
