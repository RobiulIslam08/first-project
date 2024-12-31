import { Student } from './student.module';
import { TStudent } from './student.interface';
import path from 'path';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { User } from '../user/user.model';
const getAllStudentFromDB = async (query:Record<string,unknown>) => {
  console.log('base query', query)
  const queryObj = {...query}
  //{email:{$regex:query.searchTerm, $options:'i'}} // search for spesifiq field
  //{presentAdress:{$regex:query.searchTerm, $options:'i'}} // search for spesifiq field
  //{'name.firstName':{$regex:query.searchTerm, $options:'i'}} // search for spesifiq field

  //dynamic ভাবে একসাথে এই তিনটা field এর vlaue এর উপর search query চালানোর জন্য map করতে হবে
  let searchTerm = ''
  if(query?.searchTerm){
    searchTerm= query?.searchTerm as string
  }
  const studentSearchableFields = ['email','name.firstName','presentAddress']
  //for search
  const searchQuery =  Student.find({  
    $or:studentSearchableFields.map(field => (
      {
        [field]:{$regex:searchTerm, $options:'i'}
      }
    ))
  })

  //for filtering
  const excludeFields = ['searchTerm','sort', 'limit']
  excludeFields.forEach(el => delete queryObj[el])
  const filterQuery =  searchQuery.find(queryObj) //chaning for filtering
    .populate('admissionDepartment') // Populate admissionDepartment
    .populate({
      path: 'admissionDepartment', // Ensure admissionDepartment contains academicFaculty
      populate: {
        path: 'academicFaculty',
        model: 'AcademicFaculty', // Explicitly specify the model
      },
    });

    //for sorting
    let sort = '-createdAt'
    if(query.sort){
      sort = query.sort as string
    }
    const sortQurey = filterQuery.sort(sort)


    //limit query
    let limit = 1;
    if(query.limit){
      limit = query.limit as number
    }
    const limitQuery = await filterQuery.limit(limit)
  return limitQuery;
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
    throw new Error('Failed to delete student')
  }
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
