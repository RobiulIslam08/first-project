import express from "express"
import { AcademicSemesterController } from "./academicSemister.controller"
import validateRequest from "../../middleware/validationRequest"
import { AcademicSemesterValidations } from "./academicSemester.validation"
const router = express.Router()
router.post('/create-academic-semester',validateRequest(AcademicSemesterValidations.createAcdemicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester)
router.get('/', AcademicSemesterController.getAllAcademicSemesters);
router.get('/:id', AcademicSemesterController.getSingleAcademicSemester)
router.patch('/:id', AcademicSemesterController.updateAcademicSemester)

export const AcademicSemesterRoutes = router