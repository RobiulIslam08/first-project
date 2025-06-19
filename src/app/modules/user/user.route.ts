import { UserControllers } from './user.controller';
import express, { NextFunction, Request, Response } from 'express';
import { studentValidations } from '../student/student.zod.validatoion';
import validateRequest from '../../middleware/validationRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';
const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),
    upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    
    req.body = JSON.parse(req.body.data);
    next();
  },
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
    // auth(USER_ROLE.admin),

  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.post(
  '/me',
  auth(USER_ROLE.student,USER_ROLE.faculty,USER_ROLE.admin),
  UserControllers.getMe,
);
router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);



export const UserRoute = router;
