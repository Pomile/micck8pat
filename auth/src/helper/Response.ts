class Response {
  success: boolean;
  code: number;
  message: string;
  data: Object
  constructor(success: boolean, code: number, message: string, data: Object) {
    this.success = success;
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export class ErrorResponse {
  success: boolean;
  code: number;
  message: string;
  stackTrace: Object
  constructor(code: number, message: string, stackTrace: Object) {
    this.success = false;
    this.code = code;
    this.message = message;
    this.stackTrace = stackTrace
  }
}

export class ValidationErrorResponse {
  success: boolean;
  code: number;
  message: string;
  params: Object;
  data: Object;
  query: Object;
  constructor(code: number, message: string, data: any, pathParams: any, queryParams: any) {
    this.success = false;
    this.code = code;
    this.message = message;
    this.params = pathParams;
    this.query = queryParams;
    delete data.message;
    delete data.pathParams;
    delete data.queryParams;
    this.data = data;
  }
}

export default { Response, ValidationErrorResponse, ErrorResponse };
