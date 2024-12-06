import express from "express"
import { AcademicSemesterController } from "./academicSemister.controller"
import validateRequest from "../../middleware/validationRequest"
import { AcademicSemesterValidations } from "./academicSemester.validation"
const router = express.Router()
router.post('/create-academic-semester',validateRequest(AcademicSemesterValidations.createAcdemicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester)

export const AcademicSemesterRoutes = router