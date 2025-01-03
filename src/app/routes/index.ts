
import express from "express"
import { StudentRoute } from "../modules/student/student.route"
import { UserRoute } from "../modules/user/user.route"
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route"
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route"
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route"
const router = express.Router()

const moduleRoute = [
	{
		path:'/students',
		route: StudentRoute
	},
	{
		path:'/users',
		route:UserRoute
	},
	{
		path:'/academic-semester',
		route:AcademicSemesterRoutes
	},
	{
		path:'/academic-faculties',
		route:AcademicFacultyRoutes
	},
	{
		path:'/academic-department',
		route:AcademicDepartmentRoutes
	},
]
moduleRoute.forEach(route => router.use(route.path, route.route))


export default router
