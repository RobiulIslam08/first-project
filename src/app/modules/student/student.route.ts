import express from "express"
import { StudentController } from "./student.controller"
import validateRequest from "../../middleware/validationRequest"
import { updateStudentValidationSchema } from "./student.zod.validatoion"

const router = express.Router()


router.get('/',StudentController.getAllStudent )
router.get('/:studentId',StudentController.getSingleStudent )
router.delete('/:studentId',StudentController.deleteStudent )
router.patch('/:studentId', validateRequest(updateStudentValidationSchema),StudentController.updateStudent )

export const StudentRoute = router