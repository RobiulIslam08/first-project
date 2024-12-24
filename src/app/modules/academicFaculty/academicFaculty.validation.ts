import { z } from "zod";

const createAcademicFacultyValidaionSchema = z.object({
	body:z.object({
		name:z.string({
			invalid_type_error:'Academic Faculty must be string'
		})
	})
})
const updateAcademicFacultyValidaionSchema = z.object({
	body:z.object({
		name:z.string({
			invalid_type_error:'Academic Faculty must be string'
		})
	})
})
export const AcademicFacultyValidation = {
	createAcademicFacultyValidaionSchema,
	updateAcademicFacultyValidaionSchema
}