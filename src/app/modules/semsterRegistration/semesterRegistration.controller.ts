import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from 'http-status';
import { SemesterRegistrationServices } from "./semesterRegistration.service";
const createSemesterRegistration = catchAsync(async (req,res)=>{
	const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body)

	sendResponse(res, {
		statusCode: status.OK,
		success: true,
		message: 'Semester Registration successfully',
		data: result,
	  });
})
const getAllSemesterRegistrations = catchAsync(async (req,res)=>{

})
const getSingleSemesterRegistration = catchAsync(async (req,res)=>{

})
const updateSemesterRegistration = catchAsync(async (req,res)=>{

})
const deleteSemesterRegistration = catchAsync(async (req,res)=>{

})
export const SemesterRegistrationController = {
	createSemesterRegistration,
	getAllSemesterRegistrations,
	getSingleSemesterRegistration,
	updateSemesterRegistration,
	deleteSemesterRegistration
}