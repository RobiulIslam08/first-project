import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import status from 'http-status';
const createStudent  = catchAsync(async (req, res) => {

    //using joi
    // const {error, value} = studentJoiValidationSchema.validate(studentData)
    // console.log({error})

    //const student = req.body.student
    //or
    const {password, student: studentData } = req.body;
    //data validation using zod
    // const zodParseData = studentValidationSchema.parse(studentData)
    const result = await UserServices.createStudentIntoDB(password,studentData);
    //  if(error){
    // 	res.status(500).json({
    // 		success: false,
    // 		messsage: 'something went wrong',
    // 		data: error,
    // 	  });

    //  }
    //will call service func to send this data
    // send response
    sendResponse(res,{
      statusCode: 200,
      success: true,
      message: "student is created successfully",
      data: result
    })
  
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};