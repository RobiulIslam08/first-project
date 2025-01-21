import express from "express"
import { StudentController } from "./student.controller"
import validateRequest from "../../middleware/validationRequest"
import { updateStudentValidationSchema } from "./student.zod.validatoion"

const router = express.Router()


router.get('/',StudentController.getAllStudent )
router.get('/:id',StudentController.getSingleStudent )
router.delete('/:id',StudentController.deleteStudent )
router.patch('/:id', validateRequest(updateStudentValidationSchema),StudentController.updateStudent )

export const StudentRoute = router