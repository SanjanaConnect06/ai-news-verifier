import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NewsCache from 'node-cache';
import path from 'path';
import { fileURLToPath } from 'url';
import newsRoutes from './routes/newsRoutes.js';
import translationRoutes from './routes/translationRoutes.js';

// Load env from backend/.env and fallback to project root .env
dotenv.config();
try {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
} catch {}
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize cache
export const newsCache = new NewsCache({ stdTTL: 3600 }); // 1 hour cache

// Routes
app.use('/api/news', newsRoutes);
app.use('/api/translate', translationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI News Verifier API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
