import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

// মেজবা ভাই এর টা যেকানে ভাই try catch use করছিলো
// const auth = (...requiredRules: TUserRole[]) => {
//   let decoded
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization;
//     //  যদি টোকেন না থাকে
//     if (!token) {
//       throw new AppError(
//         status.UNAUTHORIZED,
//         'You are not authorized not token',
//       );
//     }

//    try{
//       decoded = jwt.verify(
//       token,
//       config.jwt_access_secret as string,
//     ) as JwtPayload;
//    }catch{
//     throw new  AppError(status.UNAUTHORIZED, 'Unauthorized');
//    }

//     const { role, userId, iat } = decoded;
//     //   checking if the user is exits
//     const user = await User.isUserExitsByCustomId(userId);
//     console.log(user);
//     if (!user) {
//       throw new AppError(status.NOT_FOUND, 'This user is not found');
//     }

//     //   //    checking if the user is deleted
//     const isDeleted = user?.isDeleted;
//     if (isDeleted) {
//       throw new AppError(status.NOT_FOUND, 'This user is already deleted');
//     }
//     if (await User.isDeleted(user.id)) {
//       throw new AppError(status.NOT_FOUND, 'This user is already deleted');
//     }

//     const userStatus = user?.status;

//     if (userStatus === 'blocked') {
//       throw new AppError(status.NOT_FOUND, 'This user is already blocked !');
//     }
//     //token যদি চুরি হয়ে যায় আর এটা user বুঝার পরে password change করে ফেলবে। ফলে আবার database এই passwordChangedAt field  এর  সাথে jwtIssuedTimeStamp এর সাথে তুলনা করে hacked করা token আটকানো যাবে। passwordChangedTimestamp যদি jwtIssuedTimestamp এর চেয়ে বড় হয় তাহলে বুঝতে পারবো password change হয়েছে । যদি টোকেন আগে তৈরী হয় পরে password change হয় তাহলে আমরা token কে invalid করে দিবো
//     if (
//       user.passwordChangedAt &&
//       User.isJWTIssuedBeforePasswordChanged(
//         user.passwordChangedAt,
//         iat as number,
//       )
//     ) {
//       throw new AppError(
//         status.UNAUTHORIZED,
//         'You are not authorized token hacked ',
//       );
//     }

//     if (requiredRules && !requiredRules.includes(role)) {
//       throw new AppError(status.UNAUTHORIZED, 'You are not authorized rul');
//     }
//     req.user = decoded as JwtPayload;
//     next();
//   });
// };
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    // checking if the user is exist
    const user = await User.isUserExitsByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }

    req.user = decoded as JwtPayload & { role: string };
    next();
  });
};
export default auth;
