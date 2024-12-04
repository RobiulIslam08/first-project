import { Response } from "express";
type TResponse<T> = {
	statusCode:number,
	success:boolean,
	message:string,
	data:T

}
const sendResponse = <T>(res:Response,data:TResponse<T>) =>{
	res.status(200).json({
		statuscode:200,
		success:data.success,
		messsage:data.message,

	})
}
export default sendResponse