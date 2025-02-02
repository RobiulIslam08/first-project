import { z } from "zod";
const PreRequisteCoursesValidationSchema = z.object({
	course:z.string(),
	isDeleted:z.boolean().optional()
})
const updatePreRequisteCoursesValidationSchema = z.object({
	course:z.string(),
	isDeleted:z.boolean().optional()
})

const createCourseValidationSchema = z.object({
	body:z.object({
		title:z.string(),
		prefix:z.string(),
		code:z.number(),
		credits:z.number(),
		isDeleted:z.boolean().optional(),
		preRequisteCourses: z.array(PreRequisteCoursesValidationSchema).optional()
	})
})
const updateCourseValidationSchema =z.object({
	body:z.object({
		title:z.string().optional(),
		prefix:z.string().optional(),
		code:z.number().optional(),
		credits:z.number().optional(),
		isDeleted:z.boolean().optional().optional(),
		preRequisteCourses: z.array(updatePreRequisteCoursesValidationSchema).optional()
	})
})
export const CourseValidation = {
	createCourseValidationSchema,
	updateCourseValidationSchema
}