import { ZodError } from "zod";
import { TErrorSourses } from "../interface/error";

  const handleZodError = (err:ZodError)=>{
	const errorSources:TErrorSourses = err.issues.map(issue => {
	 return {
	  path: issue?.path[issue.path.length - 1],
	  message:issue.message
	 }
	})
	const statusCode = 400;

	return {
	  statusCode,
	  message: 'Zod Validation Error',
	  errorSources,
	};
  }

  export default handleZodError