import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import status from "http-status";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDeparment  = catchAsync(async (req, res) => {

   const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body)

   
    sendResponse(res,{
      statusCode: status.OK,
      success: true,
      message: "Academic faculty is created successfully",
      data: result
    })
  
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic faculty are retrieved successfully',
    data: result,
  });
});
const getSingleAcademicDepartment = catchAsync(async(req, res)=>{
	const {departmentId} = req.params
  const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single Academic faculty is retrieved successfully',
    data: result,
  });
})
const updateAcademicDepartment = catchAsync(async(req, res)=>{
	const {departmentId} = req.params
  const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(departmentId, req.body)
  
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: ' Academic faculty is updated successfully',
    data: result,
  });
})

export const AcademicDepartmentController = {
   createAcademicDeparment,
   getAllAcademicDepartment,
   getSingleAcademicDepartment,
   updateAcademicDepartment
}