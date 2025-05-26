import { z } from 'zod';

// UserName Zod Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .nonempty('First name is required.')
    .max(20, 'First name cannot be more than 20 characters.')
    .trim()
    .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
      message: 'First name must be capitalized.',
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty('Last name is required.')
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name is not valid.',
    }),
});

// Guardian Zod Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father's name is required."),
  fatherOccupation: z.string().nonempty("Father's occupation is required."),
  fatherContactNo: z.string().nonempty("Father's contact number is required."),
  motherName: z.string().nonempty("Mother's name is required."),
  motherOccupation: z.string().nonempty("Mother's occupation is required."),
  motherContactNo: z.string().nonempty("Mother's contact number is required."),
});

// Local Guardian Zod Schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty("Local guardian's name is required."),
  occupation: z.string().nonempty("Local guardian's occupation is required."),
  contactNo: z
    .string()
    .nonempty("Local guardian's contact number is required."),
  address: z.string().nonempty("Local guardian's address is required."),
});

// Student Zod Schema
const createSudentValidationSchema = z.object({
body:z.object({
    password: z.string().nonempty('password ID is required.').max(20).optional(),
  student: z.object({
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female'], {
      errorMap: (issue, _ctx) => ({
        message: `${issue.path[0]} is not a valid gender. Accepted values: male, female.`,
      }),
    }),
    dateOfBirth: z.string().optional(),
    email: z
      .string()
      .nonempty('Email address is required.')
      .email('Invalid email address.'),
    contactNo: z.string().nonempty('Contact number is required.'),
    emergencyContactNo: z
      .string()
      .nonempty('Emergency contact number is required.'),
    bloogGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: (issue, _ctx) => ({
          message: `${issue.path[0]} is not a valid blood group. Accepted values: A+, A-, B+, B-, AB+, AB-, O+, O-.`,
        }),
      })
      .optional(),
    presentAddress: z.string().nonempty('Present address is required.'),
    permanentAddres: z.string().nonempty('Permanent address is required.'),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    // profileImg: z.string().optional(),
    admissionSemester:z.string()
  }),
})
});
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});
export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
})
// Export the schema
export const studentValidations = {
  studentValidationSchema: createSudentValidationSchema,
  updateStudentValidationSchema
};
