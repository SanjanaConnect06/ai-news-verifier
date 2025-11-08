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
  'https://ai-news-verifier-eta.vercel.app', // your deployed frontend (Vercel)
  'http://localhost:5173'                    // for local testing
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/news', newsRoutes);
app.use('/api/translate', translationRoutes);

// ✅ Health check routes
app.get('/', (req, res) => {
  res.send('✅ AI News Verifier backend is running successfully!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI News Verifier API is running' });
});

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack || err.message);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message,
  });
});

// ✅ Important: bind to 0.0.0.0 (needed for Railway!)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

