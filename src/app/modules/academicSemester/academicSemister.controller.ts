import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester  = catchAsync(async (req, res) => {

   const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)

   
    sendResponse(res,{
      statusCode: 200,
      success: true,
      message: "Academic semester is created successfully",
      data: result
    })
  
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semesters are retrieved successfully',
    data: result,
  });
});
const getSingleAcademicSemester = catchAsync(async(req, res)=>{
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(req.params.id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single Academic semesters are retrieved successfully',
    data: result,
  });
})
const updateAcademicSemester = catchAsync(async(req, res)=>{
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(req.params.id, req.body)
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: ' Academic semesters are updated successfully',
    data: result,
  });
})

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester
}