
import express from "express"
import { StudentRoute } from "../modules/student/student.route"
import { UserRoute } from "../modules/user/user.route"
const router = express.Router()

const moduleRoute = [
	{
		path:'/students',
		route: StudentRoute
	},
	{
		path:'/users',
		route:UserRoute
	}
]
moduleRoute.forEach(route => router.use(route.path, route.route))


export default router
