import mongoose, { model, Schema } from "mongoose";
import { TSemesterRagistration } from "./semesterRegistration.interface";
import { semesterRegistrationStatus } from "./smesterRegistration.constant";


const semesterRegistrationSchema = new mongoose.Schema<TSemesterRagistration>({
	academicSemester :{
		type:Schema.Types.ObjectId,
		required:true,
		unique:true,
		ref:'AcademicSemester'
	},
	status:{
		type:String,
		enum:semesterRegistrationStatus,
		default:'UPCOMING'
	},
	startDate:{
		type:Date,
		required:true,
	},
	endDate:{
		type:Date,
		required:true,
	},
	minCredit:{
		type:Number,
		default:3
	},
	maxCredit:{
		type:Number,
		default:16
	}
},
{
	timestamps:true
}
)
export const SemesterRegistration = model<TSemesterRagistration>('SemesterRegistration',semesterRegistrationSchema)