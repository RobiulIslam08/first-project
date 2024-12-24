import express from 'express';

import validateRequest from '../../middleware/validationRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDeparment.controller';


const router = express.Router();
router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidaionSchema,
  ),
  AcademicDepartmentController.createAcademicDeparment,
);
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);
router.get('/:departmentId', AcademicDepartmentController.getSingleAcademicDepartment);
router.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidaionSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
