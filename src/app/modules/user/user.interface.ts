import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  id: string;
  email: string;
  password: string;
  needPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: 'superAdmin' |  'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}
export interface UserModel extends Model<TUser> {
  isUserExitsByCustomId(id: string): Promise<TUser>;
  isPasswordMatched(
    plaineTextPasswored: string,
    hasedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(passwordChangedTimestamp:Date,jwtIssuedTimestamp:number ):boolean;
  isDeleted(id: string): Promise<boolean>;
  userStatus(id: string): Promise<string>;

}
export type TUserRole = keyof typeof USER_ROLE;
