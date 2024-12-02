import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethod,
  StudentModel,
  TUserName,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';
import { boolean } from 'joi';
// Define the UserName schema
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    maxlength: [20, 'first name can not be more than 20'],
    trim: true,
    validate: {
      validator: function (value) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameStr;
      },
      message: '{VALUE} is not capitalize',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    validate: {
      validator: (value) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

// Define the Guardian schema
const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
});

// Define the Local Guardian schema
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required."],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
  },
});

// Define the Student schema
const studentSchema = new Schema<TStudent, StudentModel, StudentMethod>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password  is required.'],

      maxlength: [20, 'password cannot be more than 20 character'],
    },
    name: {
      type: userNameSchema,
      required: [true, "Student's name is required."],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message:
          '{VALUE} is not a valid gender. Accepted values: male, female.',
      },
      required: [true, 'Gender is required.'],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email address is required.'],
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: '{VALUE} is not valid email',
      },
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required.'],
    },
    bloogGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message:
          '{VALUE} is not a valid blood group. Accepted values: A+, A-, B+, B-, AB+, AB-, O+, O-.',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required.'],
    },
    permanentAddres: {
      type: String,
      required: [true, 'Permanent address is required.'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian details are required.'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian details are required.'],
    },
    profileImg: {
      type: String,
    },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message:
          '{VALUE} is not a valid status. Accepted values: active, blocked.',
      },
      default: 'active', // Default value for new students
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true, // aita studentSchema এর মধ্যে দিয়ে  দিতে হবে
    },
  },
);

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName}  ${this.name.lastName} `;
});

//pre save middleware / hook: will work create() or save() // document middleware
studentSchema.pre('save', async function (next) {
  // console.log(this,'pre hook: will save data')
  const user = this;
  //hashing password and save into data
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_solt_rounds),
  );
  next();
});
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.find({ isDelete: { $ne: true } });
  next();
});

//aggregate query
//
studentSchema.pre('aggregate', function (next) {
  console.log(this.pipeline().unshift({ $match: { isDelete: { $ne: true } } }));
  next();
});

//implement custom instant mehtod m-9.6
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// Create the Student Model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
