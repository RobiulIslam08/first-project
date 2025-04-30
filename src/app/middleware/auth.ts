import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/AppError"
import status from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config"
import { TUserRole } from "../modules/user/user.interface"
const auth = (...requiredRules:TUserRole[]) => {
	return catchAsync(async(req:Request, res:Response, next:NextFunction) => {
		 const token = req.headers.authorization
		//  যদি টোকেন না থাকে
		 if(!token){
			throw new AppError(status.UNAUTHORIZED,'You are not authorized')
		 }

		 jwt.verify(token, config.jwt_access_secret as string, function(err, decoded) {
			// err
			if(err){
				throw new AppError(status.UNAUTHORIZED,'You are not authorized')
			}
			// decoded undefined
			console.log(decoded)
			const role = (decoded as JwtPayload).role 
			if(requiredRules && !requiredRules.includes(role)){
				throw new AppError(status.UNAUTHORIZED,'You are not authorized')
			}
			req.user = decoded as JwtPayload
			next()
		  });
	})
}
export default auth