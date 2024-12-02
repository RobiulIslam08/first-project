import Joi from 'joi';
 // UserName schema
 const userNameSchema = Joi.object({
	firstName: Joi.string()
	  .required()
	  .max(20)
	  .trim()
	  .custom((value, helpers) => {
		const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
		if (value !== capitalized) {
		  return helpers.error('any.custom', {
			message: `'${value}' is not capitalized.`,
		  });
		}
		return value; // Return the valid value if it passes the condition
	  }),

	middleName: Joi.string().allow(null, ''), // Optional
	lastName: Joi.string()
	  .required()
	  .pattern(/^[a-zA-Z]+$/)
	  .message('{#label} must contain only alphabetic characters.'),
  });

  // Guardian schema
  const guardianSchema = Joi.object({
	fatherName: Joi.string().required().messages({
	  'any.required': "Father's name is required.",
	}),
	fatherOccupation: Joi.string().required(),
	fatherContactNo: Joi.string().required(),
	motherName: Joi.string().required(),
	motherOccupation: Joi.string().required(),
	motherContactNo: Joi.string().required(),
  });

  // LocalGuardian schema
  const localGuardianSchema = Joi.object({
	name: Joi.string().required(),
	occupation: Joi.string().required(),
	contactNo: Joi.string().required(),
	address: Joi.string().required(),
  });

  // Student schema
  const studentJoiValidationSchema = Joi.object({
	id: Joi.string().required(),
	name: userNameSchema.required(),
	gender: Joi.string().valid('male', 'female').required().messages({
	  'any.only': '{#label} must be either male or female.',
	}),
	dateOfBirth: Joi.date().iso().messages({
	  'date.format': 'Date of Birth must be in ISO format.',
	}),
	email: Joi.string().email().required().messages({
	  'string.email': 'Email must be a valid email address.',
	}),
	contactNo: Joi.string().required(),
	emergencyContactNo: Joi.string().required(),
	bloogGroup: Joi.string()
	  .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
	  .messages({
		'any.only':
		  'Blood group must be one of A+, A-, B+, B-, AB+, AB-, O+, O-.',
	  }),
	presentAddress: Joi.string().required(),
	permanentAddres: Joi.string().required(),
	guardian: guardianSchema.required(),
	localGuardian: localGuardianSchema.required(),
	profileImg: Joi.string().uri().allow(null, ''), // Optional image as URI
	isActive: Joi.string()
	  .valid('active', 'blocked')
	  .default('active')
	  .messages({
		'any.only': "Status must be either 'active' or 'blocked'.",
	  }),
  });
export default studentJoiValidationSchema