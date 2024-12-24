import { z } from "zod";

const academicFacultyValidaionSchema = z.object({
	name:z.string({
		invalid_type_error:'Academic Faculty must be string'
	})
})
export const AcademicFacultyValidation = {
	academicFacultyValidaionSchema
}