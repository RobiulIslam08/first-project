import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';


const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //203001   0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  //0001  => 1
  let currentId =  (0).toString();  // 0000 by default
  const lastStudentId = await findLastStudentId();
  //suppose last sutdent id = 2030010001
  const lastStudentSemesterCode = lastStudentId?.substring(4,6)
  const lastStudentSemesterYear = lastStudentId?.substring(0,4)
  const currentStudentSemesterCode = payload.code;
  const currentStudentSemesterYear = payload.year;

  if(lastStudentId && lastStudentSemesterCode === currentStudentSemesterCode && lastStudentSemesterYear === currentStudentSemesterYear){
    currentId = lastStudentId.substring(6) //0001 নিবে এবং পরে এইটার সাথে 1 যোগ করে দিবে
  }
  

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};