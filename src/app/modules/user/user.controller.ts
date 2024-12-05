import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

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

export const UserController = {
  createStudent
}