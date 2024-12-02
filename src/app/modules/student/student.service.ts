import { Student } from './student.module';
import { TStudent } from './student.interface';


const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (studentId: string) => {
  const result = await Student.findOne({ id: studentId });
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
