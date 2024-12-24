import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";


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
    statusCode: 200,
    success: true,
    message: 'Academic faculty are retrieved successfully',
    data: result,
  });
});
const getSingleAcademicFaculty = catchAsync(async(req, res)=>{
	const {facultyId} = req.params
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single Academic faculty are retrieved successfully',
    data: result,
  });
})
const updateAcademicFaculty = catchAsync(async(req, res)=>{
	const {facultyId} = req.params
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(facultyId, req.body)
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Academic faculty are updated successfully',
    data: result,
  });
})

export const AcademicSemesterController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty
}