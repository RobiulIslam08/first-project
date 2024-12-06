import {  Request,  Response } from 'express';
import { StudentServices } from './student.service';

import catchAsync from '../../utils/catchAsync';




const getAllStudent = catchAsync(async (req: Request, res: Response) => {
 
    const result = await StudentServices.getAllStudentFromDB();
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
export const StudentController = {

  getAllStudent,
  getSingleStudent,
  deleteStudent
};
