import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
const auth = (...requiredRules: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //  যদি টোকেন না থাকে
    if (!token) {
      throw new AppError(
        status.UNAUTHORIZED,
        'You are not authorized not token',
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, userId, iat } = decoded;
    //   checking if the user is exits
    const user = await User.isUserExitsByCustomId(userId);
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
    //token যদি চুরি হয়ে যায় আর এটা user বুঝার পরে password change করে ফেলবে। ফলে আবার database এই passwordChangedAt field  এর  সাথে jwtIssuedTimeStamp এর সাথে তুলনা করে hacked করা token আটকানো যাবে। passwordChangedTimestamp যদি jwtIssuedTimestamp এর চেয়ে বড় হয় তাহলে বুঝতে পারবো password change হয়েছে । যদি টোকেন আগে তৈরী হয় পরে password change হয় তাহলে আমরা token কে invalid করে দিবো
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        status.UNAUTHORIZED,
        'You are not authorized token hacked ',
      );
    }

    if (requiredRules && !requiredRules.includes(role)) {
      throw new AppError(status.UNAUTHORIZED, 'You are not authorized rul');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
