import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../middleware/validationRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationController.getAllSemesterRegistrations,
);
router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  SemesterRegistrationController.getSingleSemesterRegistration,
);
router.post(
  '/create-semester-registration',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  SemesterRegistrationController.deleteSemesterRegistration,
);
export const semesterRegistrationRoutes = router;
