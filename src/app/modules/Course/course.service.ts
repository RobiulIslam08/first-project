import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

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
  console.log({ preRequisteCourses });
  
  //basic course info update
  const updateBasicCourseInfo = Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    { new: true, runValidators: true },
  );

  // if chcek there is any pre requisite coures to update

  if (preRequisteCourses && preRequisteCourses.length > 0) {
    const deletePreRequisites = preRequisteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);
    const deletePreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisteCourses: { course: { $in: deletePreRequisites } } },
    });

    // filter out the new course field
    const newPreRequisites = preRequisteCourses?.filter(
      (el) => el.course && !el.isDeleted,
    );
    const newPreRequisiteCourses = await Course.findByIdAndUpdate(id,{
      $addToSet:{preRequisteCourses:{$each:newPreRequisites}}
    })
  
  }
  const result = await Course.findById(id).populate('preRequisteCourses.course')
  return result;
};
export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
