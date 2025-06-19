import express from 'express';

import validateRequest from '../../middleware/validationRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();
router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidaionSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);
router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidaionSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
