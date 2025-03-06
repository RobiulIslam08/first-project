
import status from 'http-status';

import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';


const loginUser = catchAsync(async (req, res) => {
 const result = await AuthServices.loginUser(req.body)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
   result
    },
  });
});
export const AuthControllers = {
	loginUser
}