import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../middleware/validationRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
const router = express.Router()

router.get('/',SemesterRegistrationController.getAllSemesterRegistrations)
router.get('/:id',SemesterRegistrationController.getSingleSemesterRegistration)
router.post('/create-semester-registration',validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema),SemesterRegistrationController.createSemesterRegistration)
router.patch('/:id', validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema),SemesterRegistrationController.updateSemesterRegistration)
router.delete('/:id', SemesterRegistrationController.deleteSemesterRegistration)
export const semesterRegistrationRoutes  = router