import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/db';
import AuthRoutes from './routes/AuthRoutes';
import UserRoutes from './routes/UserRoutes';
import PostRoutes from './routes/PostRoutes';
import CommentRoutes from './routes/CommentRoutes';

import cookieSession from 'cookie-session';
import cors from 'cors';

config();
const PORT = process.env.PORT || 7000;
const app = express();
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true, }))
app.use(express.json());
app.use(cookieParser());
app.use(cookieSession({ name: "session", keys: ['bbamp'], maxAge: 24 * 60 * 60 * 100 }));
app.use('/api/auth', AuthRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/posts', PostRoutes);
app.use('/api/comment', CommentRoutes);



const startServer = () => {
  app.listen(PORT, () => {
    console.log(`App Started, Listening to port ${PORT}`);

  });
}

connectDB(startServer);
