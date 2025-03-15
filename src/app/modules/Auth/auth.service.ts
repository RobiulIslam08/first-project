import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import status from 'http-status';
import bcrypt from 'bcrypt';
const loginUser = async (payload: TLoginUser) => {
  // securePassword123

  //   checking if the user is exits
  const user = await User.isUserExitsByCustomId(payload.id);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found');
  }

  //   //    checking if the user is deleted
  //   const isDeleted = isUserExits?.isDeleted;
  //   if (isDeleted) {
  //     throw new AppError(status.NOT_FOUND, 'This user is already deleted');
  //   }
  if(await User.isDeleted(user.id)){
    throw new AppError(status.NOT_FOUND, 'This user is already deleted');
  }

  //   //    checking if the user statas bolcked
  //   const userStatus = isUserExits?.status;
  //   if (userStatus === 'blocked') {
  //     throw new AppError(status.NOT_FOUND, 'This user is already blocked');
  //   }
  const userStatus = await User.userStatus(user.id); 
  console.log(userStatus)
    if(userStatus === 'blocked'){
      throw new AppError(status.NOT_FOUND, 'This user is already blocked !');
    }
  // //   checking if the password is correct
  //   const hashPassword = isUserExits?.password;
  //   const isPasswordMatched =  await bcrypt.compare(payload.password, hashPassword); // true

  //   checking if the password is correct
  console.log(payload.password, user.password);
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(status.FORBIDDEN, 'This user password not matched');
  }

  return {};
};
export const AuthServices = {
  loginUser,
};
