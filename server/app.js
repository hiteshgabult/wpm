import express from 'express';
import cors from 'cors';
import convertRoutes from './routes/convertRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/convert', convertRoutes);
app.use('/api/auth', authRoutes);

export default app;
