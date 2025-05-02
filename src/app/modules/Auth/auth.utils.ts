// import jwt from 'jsonwebtoken'
// export const createToken = (jwtPayload:{userId:string, role:string}, secret:string, expiresIn:string) => {
// 	jwt.sign(jwtPayload,secret,{
// 		expiresIn
// 	  });
// }

import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: jwt.Secret,
  expiresIn: string | number
): string => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn
  } as jwt.SignOptions); // Type assertion here
};