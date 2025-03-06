import {  UserControllers } from "./user.controller"
import express from "express"
import { studentValidations } from "../student/student.zod.validatoion"
import validateRequest from "../../middleware/validationRequest"
import { createFacultyValidationSchema } from "../Faculty/faculty.validation"
import { createAdminValidationSchema } from "../Admin/admin.validation"
const router = express.Router()

router.post('/create-student',validateRequest(studentValidations.studentValidationSchema), UserControllers.createStudent)
router.post(
	'/create-faculty',
	
	validateRequest(createFacultyValidationSchema),
	UserControllers.createFaculty,
  );
  
  router.post(
	'/create-admin',
	// auth(USER_ROLE.admin),
	validateRequest(createAdminValidationSchema),
	UserControllers.createAdmin,
  );
  
  export const UserRoutes = router;

export const UserRoute = router