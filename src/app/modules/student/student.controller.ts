import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import { error } from 'console';
import studentJoiValidationSchema from './student.joiValidation';
import studentValidationSchema from './student.zod.validatoion';




const getAllStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      messsage: 'Student retrieve successfully',
      data: result,
    });
  } catch (err) {
    next(err)
  }
};

const getSingleStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      messsage: 'Single student get successfully',
      data: result,
    });
  } catch (err:any) {
    next(err)
  }
};
const deleteStudent = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      messsage: 'delete student  successfully',
      data: result,
    });
  } catch (err:any) {
    next(err)
  }
};
export const StudentController = {

  getAllStudent,
  getSingleStudent,
  deleteStudent
};
