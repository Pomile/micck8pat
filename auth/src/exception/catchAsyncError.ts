import { Request, Response, NextFunction } from "express";

export default  (func: any) => (req: Request, res: Response, next: ((reason: any) => PromiseLike<never>) | null | undefined) =>
  Promise.resolve(func(req, res, next)).catch(next);