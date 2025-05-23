import { UserControllers } from './user.controller';
import express from 'express';
import { studentValidations } from '../student/student.zod.validatoion';
import validateRequest from '../../middleware/validationRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(studentValidations.studentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
    auth(USER_ROLE.admin),

  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
    auth(USER_ROLE.admin),

  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);



export const UserRoute = router;
