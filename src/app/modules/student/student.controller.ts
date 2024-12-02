import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { error } from 'console';
import studentJoiValidationSchema from './student.joiValidation';
import studentValidationSchema from './student.zod.validatoion';




const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      messsage: 'Student retrieve successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      messsage: err.message || 'something went wrong fff',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      messsage: 'Single student get successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      messsage: err.message || 'something went wrong fff',
      error: err,
    });
  }
};
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      messsage: 'delete student  successfully',
      data: result,
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      messsage: err.message || 'something went wrong fff',
      error: err,
    });
  }
};
export const StudentController = {

  getAllStudent,
  getSingleStudent,
  deleteStudent
};
