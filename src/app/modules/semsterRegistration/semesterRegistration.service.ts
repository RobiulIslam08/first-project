import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRagistration } from './semesterRegistration.interface';
import status from 'http-status';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRagistration,
) => {
  const academicSemester = payload?.academicSemester;

  // check if there any registered semester that is alread 'UPCOMING' / 'ONGOING'.
  const isThereAnyUpcomingOrONgoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });
  if (isThereAnyUpcomingOrONgoingSemester) {
    throw new AppError(
      status.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrONgoingSemester.status} registered semsester!`,
    );
  }

  // check if the semester is exits
  const isAcademicSemesterExits =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExits) {
    throw new AppError(status.NOT_FOUND, 'This academic semester not found');
  }

  // check সেমিস্টার already register কিনা
  const isSemesterRegistrationExits = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExits) {
    throw new AppError(
      status.CONFLICT,
      'This academic semester registration already registered',
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .paginate()
    .sort()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};
const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateSemesterRegistrationIntoDB = async (id: string, payload:Partial<TSemesterRagistration>) => {
  const requestSemester = await SemesterRegistration.findById(id);
  // check if the semester is already registered
  const isSemesterRegistrationExits = await SemesterRegistration.findById(id)
  if(!isSemesterRegistrationExits){
    throw new AppError(status.NOT_FOUND, 'This semester is not found')
  }

  // if requested semester registration is ended, we will not update
  
  if(requestSemester?.status === 'ENDED'){
    throw new AppError(status.BAD_REQUEST, `This semester is already ${requestSemester.status}`)
  }
};
const deleteSemesterRegistrationFromDB = async () => {
  console.log('');
};
export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
