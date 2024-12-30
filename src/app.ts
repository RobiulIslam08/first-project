import { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import express from 'express';
import { StudentRoute } from './app/modules/student/student.route';
import { UserRoute } from './app/modules/user/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());
app.use('/api/v1',router)

const test =  (req: Request, res: Response) => {
  const a = 1;
  res.send(a);
}
app.get('/', test );

//global error handaling
app.use(globalErrorHandler)
app.use(notFound)

export default app;
