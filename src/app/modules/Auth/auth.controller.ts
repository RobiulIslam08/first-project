
import status from 'http-status';

import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import config from '../../config';


const loginUser = catchAsync(async (req, res) => {
 const result = await AuthServices.loginUser(req.body)
 const {refreshToken,accessToken,needPasswordChange} = result
 res.cookie('refreshToken', refreshToken, {
  secure:config.NODE_ENV === 'production',
  httpOnly:true
 })

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
      
      needPasswordChange
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  

  
  const {...passwordData} = req.body
  const result = await AuthServices.changePassword(req.user, passwordData)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Password is updated successfully succesfully!',
    data: result
  });
});
export const AuthControllers = {
	loginUser,
  changePassword
}