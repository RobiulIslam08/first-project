import { model, Schema } from "mongoose";
import { TCourse, TPreRequisteCourses } from "./course.interface";
const preRequisteCoursesSchema = new Schema<TPreRequisteCourses>({
	course:{
		type:Schema.Types.ObjectId,
		
	},
	isDeleted:{
		type:Boolean,
		default:false
	}
})
const courseSchema = new Schema<TCourse>({
	title:{
		type:String,
		unique:true,
		trim:true,
		required:true,
	},
	prefix:{
		type:String,
		
		trim:true,
		required:true,
	},
	code:{
		type:Number,
	
		trim:true,
		required:true,
	},
	credits:{
		type:Number,
		
		trim:true,
		required:true,
	},
	preRequisteCourses:[],
})
export const Course = model<TCourse>('Course', courseSchema)