import { Model } from 'mongoose';

export interface TUser {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}
export interface UserModel extends Model<TUser> {
  isUserExitsByCustomId(id:string):Promise<TUser>;
  isPasswordMatched(plaineTextPasswored:string, hasedPassword:string):Promise<boolean>
}
