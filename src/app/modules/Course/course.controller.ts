

import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { CourseServices } from "./course.service";
import sendResponse from "../../utils/sendResponse";

const createAcademicFaculty  = catchAsync(async (req, res) => {

   const result = await CourseServices.createCourseIntoDB(req.body)

   
    sendResponse(res,{
      statusCode: 200,
      success: true,
      message: "course is created successfully",
      data: result
    })
  
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'course are retrieved successfully',
    data: result,
  });
});
const getSingleCourse = catchAsync(async(req, res)=>{
	const {id} = req.params
  const result = await CourseServices.getSingleCourseFromDB(id)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single course is retrieved successfully',
    data: result,
  });
})
const deleteCourse = catchAsync(async(req, res)=>{
	const {id} = req.params
  const result = await CourseServices.deleteCourseFromDB(id)
  
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: ' Academic faculty is updated successfully',
    data: result,
  });
})

export const CourseController = {
  createAcademicFaculty,
  getAllCourse,
  getSingleCourse,
  deleteCourse
}