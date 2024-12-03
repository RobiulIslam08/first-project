import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.module";
import { TUser } from "./user.interface";

import { User } from "./user.model";

const createStudentIntoDB = async (password:string,studentData: TStudent) => {
	// const result = await StudentModel.create(student);  // built in static method
	// return result;
	// const student = new Student(studentData); // create custom instance m-9.6
  
	// if (await student.isUserExists(studentData.id)) {
	//   throw new Error('user already exists');
	// }


	//create a user object
	const userData:Partial<TUser> = {}
	userData.password = password || (config.default_pass as string)

	//set student role
	userData.role = 'student'

	//set manually generated id
	userData.id = '20301000001'
	
	//create user
	const newUser = await User.create(userData)

	//create a student 
	if(Object.keys(newUser).length){
		//set id, _id as user
		studentData.id = newUser.id   // embeded id
		studentData.user = newUser._id  // referance id
		const newStudent = await Student.create(studentData)
		return newStudent
	}


  };
  export const UserServices = {
	createStudentIntoDB
  }