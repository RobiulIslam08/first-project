import { Student } from './student.module';
import { TStudent } from './student.interface';
import path from 'path';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { User } from '../user/user.model';
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
  //transaction session start
  const session = await mongoose.startSession();
  try {
    //transaction start
    session.startTransaction();

    //transaction -1
    const deletedStudent = await Student.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(status.BAD_REQUEST, ' failed to delete student');
    }

    //transaction -2
    const deletedUser = await User.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(status.BAD_REQUEST, ' failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};
const updateStudentIntoDB = async (id: string,payload:Partial<TStudent>) => {
  const result = await Student.findOneAndUpdate({id},payload, {
    new: true, // Return the updated document
   
  })
  return result
};
export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
