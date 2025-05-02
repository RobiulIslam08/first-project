import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
const loginUser = async (payload: TLoginUser) => {
  // securePassword123

  //   checking if the user is exits
  const user = await User.isUserExitsByCustomId(payload.id);
  console.log(user);
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found');
  }

  //   //    checking if the user is deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(status.NOT_FOUND, 'This user is already deleted');
  }
  if (await User.isDeleted(user.id)) {
    throw new AppError(status.NOT_FOUND, 'This user is already deleted');
  }

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
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

  // create accestoken, refreshToken and send to the cliend
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createToken(jwtPayload,config.jwt_access_secret as string,config.jwt_access_expires_in as string)
  const refreshToken = createToken(jwtPayload,config.jwt_refresh_secret as string,config.jwt_refresh_expires_in as string)

  return {
    refreshToken,
    accessToken,
    needPasswordChange: user?.needPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  console.log(userData);
  //   checking if the user is exits
  const user = await User.isUserExitsByCustomId(userData.userId);

  if (!user) {
    throw new AppError(status.NOT_FOUND, 'This user is not found');
  }

  //   //    checking if the user is deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(status.NOT_FOUND, 'This user is already deleted');
  }
  if (await User.isDeleted(user.id)) {
    throw new AppError(status.NOT_FOUND, 'This user is already deleted');
  }

  //   //    checking if the user statas bolcked
  // const userStatus = isUserExits?.status;
  // if (userStatus === 'blocked') {
  //   throw new AppError(status.NOT_FOUND, 'This user is already blocked');
  // }
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(status.NOT_FOUND, 'This user is already blocked !');
  }
  // //   checking if the password is correct
  //   const hashPassword = isUserExits?.password;
  //   const isPasswordMatched =  await bcrypt.compare(payload.password, hashPassword); // true

  //   checking if the password is correct
  console.log('Incoming old password:', payload.oldPassword);
  console.log('User hashed password:', user.password);

  if (!(await User.isPasswordMatched(payload?.oldPassword, user?.password))) {
    throw new AppError(status.FORBIDDEN, 'This user password not matched');
  }

  // hash new password
  const hashNewPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_solt_rounds),
  );
  const result = await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: hashNewPassword,
      needPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};
export const AuthServices = {
  loginUser,
  changePassword,
};
