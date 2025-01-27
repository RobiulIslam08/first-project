import QueryBuilder from "../../builder/QueryBuilder"
import { CourseSearchableFields } from "./course.constant"
import { TCourse } from "./course.interface"
import { Course } from "./course.model"

const createCourseIntoDB = async (payload:TCourse) => {
	const result = await Course.create(payload)
	return result
}
const getAllCourseFromDB = async (query:Record<string,unknown>) =>{
	const courseQuery =new QueryBuilder(Course.find().populate('preRequisteCourses.course'),query)
	 .search(CourseSearchableFields)
		.filter()
		.sort()
		.paginate()
		.fields();
	const result = courseQuery.modelQuery;
	return result;

}
const getSingleCourseFromDB  = async (id:string) =>{
	const result = Course.findById(id).populate('preRequisteCourses.course');
	return result
}
const deleteCourseFromDB = async (id:string) =>{
	const result = Course.findByIdAndUpdate(id,{isDeleted:true},{new:true})
}
export const CourseServices = {
	createCourseIntoDB,
	getAllCourseFromDB,
	getSingleCourseFromDB,
	deleteCourseFromDB
}