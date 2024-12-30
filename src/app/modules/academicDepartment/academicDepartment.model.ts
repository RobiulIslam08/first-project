import mongoose, { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';

const AcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
	academicFaculty: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'AcademicFaculty', // Matches AcademicFaculty model
		required: true,
	  },
  },
  {
    timestamps: true,
  },
);


// যদি আগেই একটা department same নামে থাকে তাহলে এইটা আটকায় দিবে
// AcademicDepartmentSchema.pre('save', async function (next) {
// 	const isDepartmentExits = await AcademicDepartment.findOne({
// 		name:this.name
// 	});
// 	if(isDepartmentExits){
// 		throw new AppError(404,'This Department is already exists')
// 	}
// 	next()
// });

// যদি ডিলিট করা কোন  department update করতে চায় তাহলে এই বেটা আটকায় দিবে
AcademicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
	const query = this.getQuery() ;
	// console.log(query) //{ _id: '676a437b3edcb9d9efe295f5' } = id ta dekhabe . jeita amra update korte chassi

	const isDepartmentExits = await AcademicDepartment.findOne({
		query
	});
	if(!isDepartmentExits){
		throw new AppError(404,'This Department is already exists')
	}
	next()
});
export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  AcademicDepartmentSchema,
);
