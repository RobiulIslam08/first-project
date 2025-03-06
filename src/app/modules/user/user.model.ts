import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { boolean } from 'joi';
const userSchema = new Schema<TUser, UserModel>({
  id: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  needPasswordChange: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'faculty'],
  },
  status: {
    type: String,
    enum: ['in-progress', 'blocked'],
	default: 'in-progress'
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},{
	timestamps: true
}
);

//pre save middleware / hook: will work create() or save() // document middleware for password bcrypt
userSchema.pre('save', async function (next) {
  // console.log(this,'pre hook: will save data')
  const user = this;
  //hashing password and save into data
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_solt_rounds),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
userSchema.statics.isUserExitsByCustomId = async function(id){
  return await User.findOne({ id })
}
userSchema.statics.isPasswordMatched = async function(plaineTextPasswored,hasedPassword){
  return await bcrypt.compare(plaineTextPasswored, hasedPassword)
}
userSchema.statics.isDeleted = async function(id){
  const user = await User.findOne({ id })
  return user?user.isDeleted:false
}
export const User = model<TUser,UserModel>('User', userSchema)
