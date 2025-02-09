import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRagistration } from "./semesterRegistration.interface"
import status from 'http-status';
import { SemesterRegistration } from "./semesterRegistration.model";
const  createSemesterRegistrationIntoDB =async (payload:TSemesterRagistration) => {

	const academicSemester = payload?.academicSemester;
	// check if the semester is exits
	const isAcademicSemesterExits = await AcademicSemester.findById(academicSemester)
	if(!isAcademicSemesterExits){
		throw new AppError(
			status.NOT_FOUND,
			'This academic semester not found'
		)
	}

	// check সেমিস্টার already register কিনা
	const isSemesterRegistrationExits = await SemesterRegistration.findOne({academicSemester})
	if(isSemesterRegistrationExits){
		throw new AppError(
			status.CONFLICT,
			'This academic semester registration already registered'
		)
	}
	const result = await SemesterRegistration.create(payload)
	return result

}
const getAllSemesterRegistrationsFromDB = async() => {

}
const getSingleSemesterRegistrationsFromDB = ()=>{

}
const updateSemesterRegistrationIntoDB = async()=> {

}
const deleteSemesterRegistrationFromDB = async()=> {
	console.log("")
}
export const  SemesterRegistrationServices  = {
	createSemesterRegistrationIntoDB,
	getAllSemesterRegistrationsFromDB,
	getSingleSemesterRegistrationsFromDB,
	updateSemesterRegistrationIntoDB,
	deleteSemesterRegistrationFromDB
}