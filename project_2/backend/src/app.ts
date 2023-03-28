require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/connectDB';
import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import questionRouter from './routes/question.route';
import categoryRouter from './routes/category.route';

const app = express();

// Middleware

// 1. Body Parser
app.use(express.json({ limit: '10kb' }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Cors
app.use(
  cors({
    origin: config.get<string[]>('origin'),
    credentials: true,
  })
);

// 4. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// 5. Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/questions', questionRouter)
app.use('/api/categories', categoryRouter)
// Testing
app.get(
  '/api/healthChecker',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to CodevoWeb😂😂👈👈',
    });
  }
);

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});


// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port = config.get<number>('port');
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // 👇 call the connectDB function here
  connectDB();
});
