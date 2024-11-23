import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req:Request, res:Response) =>{
	try{
		//const student = req.body.student
		//or
		const {student:studentData} = req.body
		//will call service func to send this data
		const result = await StudentServices.createStudentIntoDB(studentData)
		// send response
		res.status(200).json({
			success:true,
			messsage:"Student is created successfully",
			data: result
		})
	}catch(err){
		console.log(err)
	}
}

const getAllStudent = async (req:Request, res:Response) => {
	try{
		const result = await StudentServices.getAllStudentFromDB()
		res.status(200).json({
			success:true,
			messsage:"Student retrieve successfully",
			data: result
		})
	}catch(err){
		console.log(err)
	}
}
const getSingleStudent = async(req:Request, res:Response) => {
	const {studentId} = req.params
	const result = await StudentServices.getSingleStudentFromDB(studentId)
	res.status(200).json({
		success:true,
		messsage:"Single student get successfully",
		data: result
	})
}
export const StudentController = {
	createStudent,
	getAllStudent,
	getSingleStudent
}