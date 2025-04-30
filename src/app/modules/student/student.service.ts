import { Student } from './student.module';
import { TStudent } from './student.interface';
import path from 'path';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';
const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // console.log('base query', query)
  // const queryObj = {...query} //copy
  // //{email:{$regex:query.searchTerm, $options:'i'}} // search for spesifiq field
  // //{presentAdress:{$regex:query.searchTerm, $options:'i'}} // search for spesifiq field
  // //{'name.firstName':{$regex:query.searchTerm, $options:'i'}} // search for spesifiq field

  // //dynamic ভাবে একসাথে এই তিনটা field এর vlaue এর উপর search query চালানোর জন্য map করতে হবে
  // let searchTerm = ''
  // if(query?.searchTerm){
  //   searchTerm= query?.searchTerm as string
  // }
  // const studentSearchableFields = ['email','name.firstName','presentAddress']
  // //for search
  // const searchQuery =  Student.find({
  //   $or:studentSearchableFields.map(field => (
  //     {
  //       [field]:{$regex:searchTerm, $options:'i'}
  //     }
  //   ))
  // })

  // //for filtering
  // const excludeFields = ['searchTerm','sort', 'limit','page', 'limit','fields']
  // excludeFields.forEach(el => delete queryObj[el])
  // const filterQuery =  searchQuery.find(queryObj) //chaning for filtering
  // .populate('admissionDepartment') // Populate admissionDepartment
  // .populate({
  //   path: 'admissionDepartment', // Ensure admissionDepartment contains academicFaculty
  //   populate: {
  //     path: 'academicFaculty',
  //     model: 'AcademicFaculty', // Explicitly specify the model
  //   },
  // });

  //   //for sorting
  //   let sort = '-createdAt'
  //   if(query.sort){
  //     sort = query.sort as string
  //   }

  //   const sortQurey = filterQuery.sort(sort)

  //   //limit query
  //   let limit = 1;
  //   if(query.limit){
  //     limit = query.limit as number
  //   }
  //   //paginate
  //   let page = 1;
  //   let skip = 1;
  //   if(query.page){
  //     page = query.page as number;
  //     skip = (page - 1) * limit
  //   }
  //   const paginateQuery = sortQurey.skip(skip)
  //   const limitQuery =  paginateQuery.limit(limit)

  //   //field limiting
  //   //f{ fields: 'name,email' } => এইটা query থেকে আসবে এইটাকে convert করতে হবে এইভাবে fields: 'name email'
  //   let fields = '-__v'
  //   if(query.fields){
  //     fields = (query.fields as string).split(',').join(' ')  //fields: 'name email'
  //     console.log({fields})
  //   }
  //   const fieldQuery =await limitQuery.select(fields)
  // return fieldQuery;
  const studentQuery = new QueryBuilder(
    Student.find()
    .populate('user')
      .populate('admissionDepartment') // Populate admissionDepartment
      .populate({
        path: 'admissionDepartment', // Ensure admissionDepartment contains academicFaculty
        populate: {
          path: 'academicFaculty',
          model: 'AcademicFaculty', // Explicitly specify the model
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
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
const deleteStudentFromDB = async (id: string) => {
  //transaction session start
  const session = await mongoose.startSession();
  try {
    //transaction start
    session.startTransaction();

    //transaction -1
    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(status.BAD_REQUEST, ' failed to delete student');
    }

    //transaction -2
    //get user id form deletedStudent
    const userId = deletedStudent.user;
    const deletedUser = await User.findByIdAndUpdate(
      userId,
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
    throw new Error('Failed to delete student');
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

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
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
