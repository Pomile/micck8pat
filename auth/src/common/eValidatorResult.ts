import { NextFunction, Request, Response } from 'express';
import { validationResult, matchedData } from 'express-validator';
import { ValidationErrorResponse } from '../helper/Response';

/**
 * Schema validator
 * @param {Array} schemas
 * @param {number} status
 * @returns {Array} an array of validation schema and middleware
 */
export default (schemas: any) => {
  const validatorCheck = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const reqq = { ...req, ...matchedData(req) };
    if (!errors.isEmpty()) {
      const mapErrors = Object.entries(errors.mapped()).reduce(
        (accumulator: any, data) => {
          // @ts-ignore
          const [key, value] = data;
          if(value.msg.includes("params:")
          || value.msg.includes("query:") 
          || value.msg.includes("custom:")) {
            accumulator.message = [...accumulator.message, value.msg.split(":")[1]]
            
            if(value.msg.includes("params:"))  {
               accumulator.pathParams = [...accumulator.pathParams, { [key]: value.msg.split(":")[1]}]
            }
             else if(value.msg.includes("query:"))  {
              accumulator.pathParams = [...accumulator.queryParams, { [key]: value.msg.split(":")[1]}]
            } else {
              accumulator[key] = value.msg.split(":")[1];
            }
          } else {
             accumulator[key] = value.msg;
          }
         
          return accumulator;
        },
        { message: [], pathParams: [], queryParams: [] }
      );

      const response = new ValidationErrorResponse(
        400,
        mapErrors.message.join(", ") || 'Validation Error!',
        mapErrors,
        mapErrors.pathParams,
        mapErrors.queryParams
      );
      return res.status(response.code).json(response);
    }

    return next();
  };
  return [...(schemas.length && [schemas]), validatorCheck];
};