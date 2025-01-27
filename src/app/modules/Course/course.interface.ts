import { Types } from "mongoose";

export type TPreRequisteCourses = {
	course: Types.ObjectId,
	isDeleted:boolean
}
export type TCourse = {
	title:string;
	prefix:string;
	code:number;
	credits:number;
	isDeleted?:boolean;
	preRequisteCourses: []
}