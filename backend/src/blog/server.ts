// filepath: /Users/brendanduffy/Documents/MyWebsite/backend/blog/src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import postRouter from './routes/postRoutes'
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

app.use(express.json());
app.use('/api/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});