import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

//validation
const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //valiction check => ok => next()
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};
export default validateRequest;
