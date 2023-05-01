
class ErrorHandler extends Error {
    statusCode: string;
    msg: string;
    info: string;
    constructor(message: string, statusCode: string, info: string) {
      super(message);
      this.statusCode = statusCode;
      this.msg = message;
      this.info = info
      Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler;
  