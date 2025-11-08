import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';  // ✅ Corrected: should be NodeCache, not NewsCache
import path from 'path';
import { fileURLToPath } from 'url';
import newsRoutes from './routes/newsRoutes.js';
import translationRoutes from './routes/translationRoutes.js';
import process from 'node:process'; // ✅ Fixes 'process is not defined'

// ✅ Load environment variables
try {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
} catch (err) {
  console.warn('⚠️ Could not load local .env file:', err.message);
}

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
const allowedOrigins = [
  'https://ai-news-verifier-eta.vercel.app', // your frontend domain
  'http://localhost:5173'                    // for local testing
];

// ✅ TEMP FIX — allow all origins (for debugging)
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Initialize cache (1 hour)
export const newsCache = new NodeCache({ stdTTL: 3600 });

// ✅ Routes
app.use('/api/news', newsRoutes);
app.use('/api/translate', translationRoutes);

// ✅ Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI News Verifier API is running' });
});

// ✅ Error handling middleware (keep 'next' even if unused)
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack || err.message);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message,
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
