import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import status from 'http-status';
import { SemesterRegistrationServices } from "./semesterRegistration.service";
import { SemesterRegistration } from "./semesterRegistration.model";
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
	const result = await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB(req?.query)
	sendResponse(res, {
		statusCode: status.OK,
		success: true,
		message: 'Get All Semester Registration retrieved Successfully',
		data: result,
	  });

})
const getSingleSemesterRegistration = catchAsync(async (req,res)=>{
	const {id} = req.params
	const result = await SemesterRegistrationServices.getSingleSemesterRegistrationsFromDB(id)
	sendResponse(res, {
		statusCode: status.OK,
		success: true,
		message: 'Get Single Semester Registration Successfully',
		data: result,
	  });

})
const updateSemesterRegistration = catchAsync(async (req,res)=>{
	const {id} = req.params
	const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(id,req.body)
	sendResponse(res, {
		statusCode: status.OK,
		success: true,
		message: ' Semester Registration Is Updated Successfully',
		data: result,
	  });
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