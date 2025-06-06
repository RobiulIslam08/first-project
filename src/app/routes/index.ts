
import express from "express"
import { StudentRoute } from "../modules/student/student.route"
import { UserRoute } from "../modules/user/user.route"
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route"
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route"
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route"
import { FacultyRoutes } from "../modules/Faculty/faculty.route"
import { AdminRoutes } from "../modules/Admin/admin.route"
import { CourseRoutes } from "../modules/Course/course.route"
import { semesterRegistrationRoutes } from "../modules/semsterRegistration/semesterRegistration.route"
import { offeredCourseRoutes } from "../modules/OfferedCourse/OfferedCourse.route"
import { AuthRoutes } from "../modules/Auth/auth.routes"
import { EnrolledCourseRoutes } from "../modules/EnrolledCourse/enrolledCourse.route"
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
		path: '/faculties',
		route: FacultyRoutes,
	  },
	  {
		path: '/admins',
		route: AdminRoutes,
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
	{
		path:'/courses',
		route:CourseRoutes
	},
	{
		path:'/semester-regitrations',
		route:semesterRegistrationRoutes
	},
	{
		path:'/offered-courses',
		route:offeredCourseRoutes
	},
	{
		path:'/auth',
		route:AuthRoutes
	},
	  {
    path: '/enrolled-courses',
    route: EnrolledCourseRoutes,
  },
]
moduleRoute.forEach(route => router.use(route.path, route.route))


export default router
