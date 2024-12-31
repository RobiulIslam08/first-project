import {  Request,  Response } from 'express';
import { StudentServices } from './student.service';

import catchAsync from '../../utils/catchAsync';




const getAllStudent = catchAsync(async (req: Request, res: Response) => {

    const result = await StudentServices.getAllStudentFromDB(req.query);
    res.status(200).json({
      success: true,
      messsage: 'Student retrieve successfully',
      data: result,
    });
  
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {

    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      messsage: 'Single student get successfully',
      data: result,
    });

})
const deleteStudent = catchAsync(async (req: Request, res: Response) => {

    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      messsage: 'delete student  successfully',
      data: result,
    });

});
const updateStudent = catchAsync(async (req: Request, res: Response) => {

  const { studentId } = req.params;
  const {student} = req.body
  const result = await StudentServices.updateStudentIntoDB(studentId, student);
  res.status(200).json({
    success: true,
    messsage: 'update student  successfully',
    data: result,
  });

});
export const StudentController = {

  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
