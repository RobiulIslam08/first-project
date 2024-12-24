import { z } from "zod";

const createAcademicDepartmentValidaionSchema = z.object({
	body:z.object({
		name:z.string({
			invalid_type_error:'Academic Deparment must be string',
			required_error:'Deparment name is required'
		}),
		academicFaculty:z.string({
			invalid_type_error:'Academic Faculty must be string',
			required_error:'Faculty name is required'
		}),
	
	})
})
const updateAcademicDepartmentValidaionSchema = z.object({
	body:z.object({
		name:z.string({
			invalid_type_error:'Academic Deparment must be string',
			required_error:'Deparment name is required'
		}).optional(),
		academicFaculty:z.string({
			invalid_type_error:'Academic Faculty must be string',
			required_error:'Faculty name is required'
		}).optional(),
	
	})
})
export const AcademicDepartmentValidation = {
	 createAcademicDepartmentValidaionSchema,
	 updateAcademicDepartmentValidaionSchema
}