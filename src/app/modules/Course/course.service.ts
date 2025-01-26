import { Course } from "./course.model"

const createCourseIntoDB = async () => {
	const result = await Course.create()
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
const deleteCourseIntoDB = async (id:string) =>{
	const result = Course.findByIdAndUpdate(id,{isDeleted:true},{new:true})
}
export const CourseServices = {
	createCourseIntoDB,
	getAllCourseFromDB,
	getSingleCourseFromDB,
	deleteCourseIntoDB
}