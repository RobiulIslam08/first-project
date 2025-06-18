import express from 'express';
import { AcademicSemesterController } from './academicSemister.controller';
import validateRequest from '../../middleware/validationRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middleware/auth';
const router = express.Router();
router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);
router.get('/',auth(USER_ROLE.admin), AcademicSemesterController.getAllAcademicSemesters);
router.get('/:id', AcademicSemesterController.getSingleAcademicSemester);
router.patch(
  '/:id',
  validateRequest(
    AcademicSemesterValidations.updateAcdemicSemesterValidationSchema,
  ),
  AcademicSemesterController.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;
