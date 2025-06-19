import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.module';
import { TUser } from './user.interface';
import status from 'http-status';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';
import { Admin } from '../Admin/admin.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createStudentIntoDB = async ( file: any,password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'student';
  //   set student email
  userData.email = payload?.email;

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  
  if (!admissionSemester) {
    throw new AppError(400, 'Admission semester not found');
  }

  // find department
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Aademic department not found');
  }
  payload.academicFaculty = academicDepartment.academicFaculty;

  const session = await mongoose.startSession(); // সেশন তৈরি
  try {
    session.startTransaction(); // ট্রানজেকশন শুরু

    // ম্যানুয়ালি আইডি জেনারেট করা
    userData.id = await generateStudentId(admissionSemester!);

    if(file){
      // Image তৈরী করার জন্য 
    const imageName = `${userData.id}${payload?.name?.firstName}`; // image এর নাম
    const path = file?.path;
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path) ;
      payload.profileImg = secure_url as string;
    }
    

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
  } catch (error: any) {
    await session.abortTransaction(); // কোনো এরর হলে রোলব্যাক করুন
    throw new Error(error); // এরর থ্রো করুন
  } finally {
    await session.endSession(); // সেশন বন্ধ করুন
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty,file:any) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set faculty role
  userData.role = 'faculty';
  //   set faculty email
  userData.email = payload?.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();
      if(file){
      // Image তৈরী করার জন্য 
    const imageName = `${userData.id}${payload?.name?.firstName}`; // image এর নাম
    const path = file?.path;
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path) ;
      payload.profileImg = secure_url as string;
    }
    

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty, file:any) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set admin role
  userData.role = 'admin';
  //   set admin email
  userData.email = payload?.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();
      if(file){
      // Image তৈরী করার জন্য 
    const imageName = `${userData.id}${payload?.name?.firstName}`; // image এর নাম
    const path = file?.path;
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path) ;
      payload.profileImg = secure_url as string;
    }
    

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const getMe = async (userId: string, role: string) => {
  // const decoded = verifyToken(token, config.jwt_access_secret as string);
  // const { userId, role } = decoded;

  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }

  return result;
};
const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus
};




