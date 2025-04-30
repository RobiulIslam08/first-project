
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
const changePassword = catchAsync(async (req, res) => {
  console.log(req.user, req.body)
  const user = req.user
  const {...passwordData} = req.body
  const result = await AuthServices.changePassword(user, passwordData)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: null
  });
});
export const AuthControllers = {
	loginUser,
  changePassword
}