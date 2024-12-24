import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.module';
import { TUser } from './user.interface';
import status from "http-status";
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
	
  // const result = await StudentModel.create(student);  // built in static method
  // return result;
  // const student = new Student(studentData); // create custom instance m-9.6

  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('user already exists');
  // }

  //create a user object
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  const session = await mongoose.startSession() // session create for  transaction 
  try {
	session.startTransaction() // transaction start
    //set manually generated id
    userData.id = await generateStudentId(admissionSemester!);

    //create user = [transation -1]
    const newUser = await User.create([userData], {session}); // transaction এর ক্ষেত্রে ডাটা array তে করে পাঠাতে হয়, এবং  paremeter দুইটা নেয়

    //create a student
    if (!newUser.length) {
      //set id, _id as user
     throw new AppError(status.BAD_REQUEST,'Failed to create user')
    }

	payload.id = newUser[0].id; // embeded id
	payload.user = newUser[0]._id; // referance id

	//create a student [transaction - 2]
	const newStudent = await Student.create([payload],{session});
	if(!newStudent.length){
		throw new AppError(status.BAD_REQUEST,'Failed to create student')
	}
	session.commitTransaction();
	session.endSession()
	return newStudent;
  } catch (error) {
	await session.abortTransaction();
	await session.endSession()
  }
};
export const UserServices = {
  createStudentIntoDB,
};
