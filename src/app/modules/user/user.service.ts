import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TNewUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password:string,studentData: TStudent) => {
	// const result = await StudentModel.create(student);  // built in static method
	// return result;
	// const student = new Student(studentData); // create custom instance m-9.6
  
	// if (await student.isUserExists(studentData.id)) {
	//   throw new Error('user already exists');
	// }








	//create a user object
	const user:TNewUser = {
		role: "",
		password: "",
		id:""
	}
	user.password = password || (config.default_pass as string)

	//set student role
	user.role = 'student'

	//set manually generated id
	user.id = '20301000001'
	
	//create user
	const result = await User.create(user)

	//create a student 
	if(Object.keys(result).length){
		//set id, _id as user
		studentData.id = result.id
		studentData.user = result._id
	}
	return result;
  };
  export const UserServices = {
	createStudentIntoDB
  }