import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";
import status from "http-status";

const createAcademicFaculty  = catchAsync(async (req, res) => {

   const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body)

   
    sendResponse(res,{
      statusCode: 200,
      success: true,
      message: "Academic faculty is created successfully",
      data: result
    })
  
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic faculty are retrieved successfully',
    data: result,
  });
});
const getSingleAcademicFaculty = catchAsync(async(req, res)=>{
	const {facultyId} = req.params
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Single Academic faculty is retrieved successfully',
    data: result,
  });
})
const updateAcademicFaculty = catchAsync(async(req, res)=>{
	const {facultyId} = req.params
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(facultyId, req.body)
  
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: ' Academic faculty is updated successfully',
    data: result,
  });
})

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty
}