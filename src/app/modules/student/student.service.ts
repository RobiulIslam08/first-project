import { Student } from './student.module';
import { TStudent } from './student.interface';
import path from 'path';


const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .populate('admissionDepartment') // Populate admissionDepartment
    .populate({
      path: 'admissionDepartment', // Ensure admissionDepartment contains academicFaculty
      populate: {
        path: 'academicFaculty',
        model: 'AcademicFaculty', // Explicitly specify the model
      },
    });
  return result;
};

const getSingleStudentFromDB = async (studentId: string) => {
  const result = await Student.findOne({ id: studentId })
  .populate('admissionDepartment') // Populate admissionDepartment
  .populate({
    path: 'admissionDepartment', // Ensure admissionDepartment contains academicFaculty
    populate: {
      path: 'academicFaculty',
      model: 'AcademicFaculty', // Explicitly specify the model
    },
  });
  return result;
};
const deleteStudentFromDB = async (studentId: string) => {
  const result = await Student.updateOne({ id: studentId }, { isDelete: true });
  return result;
};
export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
