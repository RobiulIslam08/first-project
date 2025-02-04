import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import status from 'http-status';
const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = courseQuery.modelQuery;
  return result;
};
const getSingleCourseFromDB = async (id: string) => {
  const result = Course.findById(id).populate('preRequisteCourses.course');
  return result;
};
const deleteCourseFromDB = async (id: string) => {
  const result = Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisteCourses, ...courseRemainingData } = payload;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //basic course info update
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );
    if (!updateBasicCourseInfo) {
      throw new AppError(status.BAD_REQUEST, 'Failed to update course');
    }

    // if chcek there is any pre requisite coures to update
    if (preRequisteCourses && preRequisteCourses.length > 0) {
      const deletePreRequisites = preRequisteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      // filter out the deleted fields
      const deletePreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisteCourses: { course: { $in: deletePreRequisites } },
          },
        },
        { new: true, runValidators: true, session },
      );
      if (!deletePreRequisiteCourses) {
        throw new AppError(status.BAD_REQUEST, 'Failed to update course');
      }

      // filter out the new course field
      const newPreRequisites = preRequisteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );
      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisteCourses: { $each: newPreRequisites } },
        },
        { new: true, runValidators: true, session },
      );
      if (!newPreRequisiteCourses) {
        throw new AppError(status.BAD_REQUEST, 'Failed to update course');
      }
    }

    // data response এ দেখানোর জন্য find করা হয়েছে
    const result = await Course.findById(id).populate(
      'preRequisteCourses.course',
    );

    await session.commitTransaction(); // সব ঠিক থাকলে কমিট হবে
    session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction(); // কোনো সমস্যা হলে পূর্বের অবস্থায় ফিরে যাবে
    session.endSession();
    throw new AppError(status.BAD_REQUEST, 'Failed to update course');
  }
};
const assignFacultiesIntoDB = async (id: string, payload: TCourseFaculty) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};
export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  assignFacultiesIntoDB,
};
