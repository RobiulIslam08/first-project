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
	const userData: Partial<TUser> = {};
	userData.password = password || (config.default_pass as string);
	userData.role = 'student';
  
	const admissionSemester = await AcademicSemester.findById(
	  payload.admissionSemester,
	);
  
	const session = await mongoose.startSession(); // সেশন তৈরি
	try {
	  session.startTransaction(); // ট্রানজেকশন শুরু
  
	  // ম্যানুয়ালি আইডি জেনারেট করা
	  userData.id = await generateStudentId(admissionSemester!);
  
	  // ইউজার তৈরি [ট্রানজেকশন - ১]
	  const newUser = await User.create([userData], { session });
	  if (!newUser.length) {
		throw new AppError(status.BAD_REQUEST, 'Failed to create user');
	  }
  
	  // স্টুডেন্টের জন্য রেফারেন্স সেট করা
	  payload.id = newUser[0].id; // অ্যারে থেকে প্রথম আইটেম
	  payload.user = newUser[0]._id;
  
	  // স্টুডেন্ট তৈরি [ট্রানজেকশন - ২]
	  const newStudent = await Student.create([payload], { session });
	  if (!newStudent.length) {
		throw new AppError(status.BAD_REQUEST, 'Failed to create student');
	  }
  
	  await session.commitTransaction(); // সফল হলে ট্রানজেকশন সম্পন্ন করুন
	  return newStudent[0]; // প্রথম ডকুমেন্ট রিটার্ন করুন
	} catch (error:any) {
	  await session.abortTransaction(); // কোনো এরর হলে রোলব্যাক করুন
	  throw new Error(error); // এরর থ্রো করুন
	} finally {
	  await session.endSession(); // সেশন বন্ধ করুন
	}
  };
  
export const UserServices = {
  createStudentIntoDB,
};
