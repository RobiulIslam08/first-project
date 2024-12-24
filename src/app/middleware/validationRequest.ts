import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

//validation
const validateRequest = (schema:AnyZodObject) => {
	return async (req:Request, res:Response, next:NextFunction) => {
		try{
			//valiction check => ok => next()
			await schema.parseAsync({
				body:req.body
			})
			next()

		}catch(err){  // if validate failed
			next(err)
		}
		
	}
}
export default validateRequest