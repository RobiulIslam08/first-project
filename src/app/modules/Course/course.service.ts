import { TCourse } from "./course.interface"
import { Course } from "./course.model"

const createCourseIntoDB = async (payload:TCourse) => {
	const result = await Course.create(payload)
	return result
}
const getAllCourseFromDB = async () =>{
	const result = Course.find();
	return result;

}
const getSingleCourseFromDB  = async (id:string) =>{
	const result = Course.findById(id);
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