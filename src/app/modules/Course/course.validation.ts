import { z } from "zod";
const PreRequisteCoursesValidationSchema = z.object({
	course:z.string(),
	isDeleted:z.boolean().optional()
})

const createCourseValidationSchema = z.object({
	body:z.object({
		title:z.string(),
		prefix:z.string(),
		code:z.number(),
		credits:z.number(),
		preRequisteCourses: z.array(PreRequisteCoursesValidationSchema).optional()
	})
})
export const CourseValidation = {
	createCourseValidationSchema
}