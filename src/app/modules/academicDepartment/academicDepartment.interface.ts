import { string } from "joi";
import { Types } from "mongoose";

export type TAcademicDepartment = {
	name:string,
	academicFaculty:Types.ObjectId //for referacing to faculty
}