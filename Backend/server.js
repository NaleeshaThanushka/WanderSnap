// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';

import userRouter from './routes/userRoute.js';
import photoRouter from './routes/photoRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // serve static images

// Routes
app.use('/api/users', userRouter);
app.use('/api/photos', photoRouter); // ✅ Add this

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
