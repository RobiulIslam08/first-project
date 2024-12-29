import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler:ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  let message = err?.message || 'something went wrong bro from globalmiddleware';
  type TErrorSourses = {
    path:string | number,
    message:string
  }[]
  const errorSources:TErrorSourses = [{
    path:"",
    message:"something went wrong bro from globalmiddleware"
  }]
  if(err instanceof ZodError){
    statusCode=400;
    message='ami zod error'
  }
  res.status(statusCode).json({
    success: false,
    message,
     amiError: err,
   errorSources
  });
};
export default globalErrorHandler;
