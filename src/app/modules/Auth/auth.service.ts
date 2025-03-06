import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import status from 'http-status';
import bcrypt from "bcrypt";
const loginUser = async (payload: TLoginUser) => {
  // securePassword123

  //   checking if the user is exits
  const isUserExits = await User.findOne({ id: payload.id });
  if (!isUserExits) {
    throw new AppError(status.NOT_FOUND, 'This user is not found');
  }
  //    checking if the user is deleted
  const isDeleted = isUserExits?.isDeleted;
  if (isDeleted) {
    throw new AppError(status.NOT_FOUND, 'This user is already deleted');
  }
  //    checking if the user statas bolcked
  const userStatus = isUserExits?.status;
  if (userStatus === 'blocked') {
    throw new AppError(status.NOT_FOUND, 'This user is already blocked');
  }
//   checking if the password is correct 
  const hashPassword = isUserExits?.password;
  const isPasswordMatched =  await bcrypt.compare(payload.password, hashPassword); // true

  if(!isPasswordMatched){
	throw new AppError(status.NOT_FOUND, 'This user password not matched');
  }

  return {};
};
export const AuthServices = {
  loginUser,
};
