import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/AppError"
import status from 'http-status'
const auth = () => {
	return catchAsync(async(req:Request, res:Response, next:NextFunction) => {
		 const token = req.headers.authorization
		 if(!token){
			throw new AppError(status.UNAUTHORIZED,'You are not authorized')
		 }
		next()
	})
}
export default auth