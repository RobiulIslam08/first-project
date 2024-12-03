import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
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
    res.status(200).json({
      success: true,
      messsage: 'Student is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      messsage: err.message || 'something went wrong fff',
      error: err,
    });
  }
};

export const UserController = {
  createStudent
}