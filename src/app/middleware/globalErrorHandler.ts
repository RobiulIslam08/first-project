import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSourses } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

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

  if(err instanceof ZodError){
    const simplifiedError = handleZodError(err)
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    statusCode = simplifiedError.statusCode
   
  }else if(err?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(err)
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    statusCode = simplifiedError.statusCode
  }else if(err?.name === 'CastError'){
    const simplifiedError = handleCastError(err)
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    statusCode = simplifiedError.statusCode
  }else if(err?.code === 11000){
    const simplifiedError = handleDuplicateError(err)
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    statusCode = simplifiedError.statusCode
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
