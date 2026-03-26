// server/app.js

import express from 'express';
import cors from 'cors';
import convertRoutes from './routes/convertRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ ROOT ROUTE (IMPORTANT - 404 fix)
app.get('/', (req, res) => {
  res.send('✅ Doc to WP SaaS API is running');
});

// ✅ API ROUTE
app.use('/api/convert', convertRoutes);

// ❌ 404 handler (optional but clean)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;