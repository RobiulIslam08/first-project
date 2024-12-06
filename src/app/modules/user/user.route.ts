import { UserController } from "./user.controller"
import express from "express"
import { studentValidations } from "../student/student.zod.validatoion"
import validateRequest from "../../middleware/validationRequest"
const router = express.Router()

router.post('/create-student',validateRequest(studentValidations.studentValidationSchema), UserController.createStudent)

export const UserRoute = router