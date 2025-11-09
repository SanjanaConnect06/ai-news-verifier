import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import path from 'path';
import { fileURLToPath } from 'url';
import newsRoutes from './routes/newsRoutes.js';
import translationRoutes from './routes/translationRoutes.js';
import process from 'node:process';

export const newsCache = new NodeCache({ stdTTL: 3600 });

// ✅ Load .env file
try {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
} catch (err) {
  console.warn('⚠️ Could not load .env file:', err.message);
}

const app = express();

// ✅ Allow frontend + local origins
const allowedOrigins = [
  'https://ai-news-verifier-eta.vercel.app',
  'http://localhost:5173'
];

// ✅ FIXED: Proper CORS setup (handles preflight too)
app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ✅ Add explicit preflight handling
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', allowedOrigins.join(','));
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.sendStatus(200);
});

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/news', newsRoutes);
app.use('/api/translate', translationRoutes);

// ✅ Health checks
app.get('/', (req, res) => res.send('✅ AI News Verifier backend is running successfully!'));
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));
app.get('/railway-health', (req, res) => res.send('OK'));

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack || err.message);
  res.status(500).json({ error: 'Server error', message: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server is running on port ${PORT}`));
