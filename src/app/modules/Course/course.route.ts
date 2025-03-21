import express from 'express';
import validateRequest from '../../middleware/validationRequest';
import { CourseValidation } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();
router.get('/', CourseController.getAllCourse);
router.get('/:id', CourseController.getSingleCourse);
router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);
router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.delete(
  '/:id',

  CourseController.deleteCourse,
);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseController.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseController.removeFacultiesFromCourse,
);

export const CourseRoutes = router;
