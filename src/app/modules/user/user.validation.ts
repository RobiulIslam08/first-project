import { z } from "zod";

const userValidationSchema = z.object({

	password:z.string().max(20,{message: 'password can not be more than 20 character'}).optional(),
	
})
export const UserValidation = {
	userValidationSchema
}