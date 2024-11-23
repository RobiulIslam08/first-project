import { Schema, model } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student/student.interface';


const userNameSchema = new Schema<UserName>({
	firstName:{
		type: String,
		required:[true, 'first name is required']
	},
	middleName: {
		type: String,
	},
	lastName: {
		type:String,
		required:[true, 'last name is required']
	}
})

const guardianSchema = new Schema<Guardian>({
	fatherName: {
		type: String,
		required: true,
	  },
	  fatherOccupation: {
		type: String,
		required: true,
	  },
	  fatherContactNo: {
		type: String,
		required: true,
	  },
	  motherName: {
		type: String,
		required: true,
	  },
	  motherOccupation: {
		type: String,
		required: true,
	  },
	  motherContactNo: {
		type: String,
		required: true,
	  },
})

const localGuardianSchema = new Schema<LocalGuardian>({
	name: {
		type: String,
		required: true,
	  },
	  occupation: {
		type: String,
		required: true,
	  },
	  contactNo: {
		type: String,
		required: true,
	  },
	  address: {
		type: String,
		required: true,
	  },
})

// 2. Create a Schema corresponding to the document interface.
const studentSchema = new Schema<Student> ({
	id : {type:String, required:true, unique:true},
	name: {
		type:userNameSchema,
		required:[true, "name lagebei lagbei"]
	},
	gender: {
		type:String,
		enum:{
			values:['male', 'female'],
			message: '{VALUE} is not valid'
		},
		required:true
	},
	dateOfBirth:{type:String},
	email:{type:String, required:true,unique:true},	
	contactNo: { type: String, required: true },
	emergencyContactNo: { type: String, required: true },
	bloogGroup: {
		type:String,
		enum:['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
	
	},
	presentAddress: { type: String, required: true },
	permanentAddres: { type: String, required: true },
	guardian: {
		type:guardianSchema,
		required:true,
	},
	localGuardian: {
		type:localGuardianSchema,
		required:true
	},
	profileImg:{type: String},
	isActive:{
		type:String,
		enum: ['active', 'blocked'],
		default:"active" //যখন student create করা তখন এটা active হিসেবে insert হবে। আমরা পরে এটাকে block করে দিতেপারবো
	}

})


// 3. Create a Model.
export const StudentModel = model<Student>('Student',studentSchema)