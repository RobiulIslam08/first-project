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

    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);
    res.status(200).json({
      success: true,
      messsage: 'Single student get successfully',
      data: result,
    });

})
const deleteStudent = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);
    res.status(200).json({
      success: true,
      messsage: 'delete student  successfully',
      data: result,
    });

});
const updateStudent = catchAsync(async (req: Request, res: Response) => {

  const { id } = req.params;
  const {student} = req.body
  const result = await StudentServices.updateStudentIntoDB(id, student);
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
