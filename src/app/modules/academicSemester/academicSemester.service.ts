import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester code ultapalte dile error dibe
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();

  return result;
};

const getSingleAcademicSemesterFromDB  = async (id:string)=>{
	const result = await AcademicSemester.findById(id)
	return result
}
const updateAcademicSemesterIntoDB = async (id:string, payload:Partial<TAcademicSemester>) =>{
	const result = await AcademicSemester.findByIdAndUpdate(id, payload, {
		new:true
	})
	if (
		payload.name &&
		payload.code &&
		academicSemesterNameCodeMapper[payload.name] !== payload.code
	  ) {
		throw new Error('Invalid Semester Code');
	  }
	return result
}
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB
};
