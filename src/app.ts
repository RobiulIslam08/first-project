import { Application, Request, Response } from 'express';
import cors from 'cors';

import express from 'express';
import { StudentRoute } from './app/modules/student/student.route';
import { UserRoute } from './app/modules/user/user.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());
//application route
app.use('/api/v1/students', StudentRoute)
app.use('/api/v1/users', UserRoute)

const getAController = (req: Request, res: Response) => {
  const a = 1;
  res.send(a);
}
app.get('/', getAController );

export default app;
