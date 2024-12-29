import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSourses } from '../interface/error';
import config from '../config';

const globalErrorHandler:ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  let statusCode = err.statusCode || 500;
  
  let message = err?.message || 'something went wrong bro from globalmiddleware';
  
  let errorSources:TErrorSourses = [{
    path:"",
    message:"something went wrong bro from globalmiddleware"
  }]
  const handleZodError = (err:ZodError)=>{
    const errorSources:TErrorSourses = err.issues.map(issue => {
     return {
      path: issue?.path[issue.path.length - 1],
      message:issue.message
     }
    })
    const statusCode = 400;

    return {
      statusCode,
      message: 'Zod Validation Error',
      errorSources,
    };
  }
  if(err instanceof ZodError){
    const simplifiedError = handleZodError(err)
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    statusCode = simplifiedError.statusCode
    console.log(simplifiedError)
  }
  res.status(statusCode).json({
    success: false,
    message,
    //  amiError: err,
   errorSources,
   stack: config.NODE_ENV === 'development'? err?.stack : ''
  });
};
export default globalErrorHandler;
