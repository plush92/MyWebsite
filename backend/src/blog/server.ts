// filepath: /Users/brendanduffy/Documents/MyWebsite/backend/blog/src/server.ts
// to run server: cd '/Users/brendanduffy/Documents/MyWebsite/backend'
// then run 'node dist/blog/server.js'
import express from 'express';
import dotenv from 'dotenv';
import postRouter from './routes/postRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS with environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173'];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use('/api/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
