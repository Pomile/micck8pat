import CatchAsync from '../exception/catchAsyncError'

/**
 * Schema validator
 * @param {Object} schemas
 */
export default  (schema: any, data: any) => {
  return CatchAsync(schema.validateAsync(data, { abortEarly: false }));
};