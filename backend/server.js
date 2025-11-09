// 🚀 AI News Verifier backend — universal CORS debug version
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

// ✅ Load environment variables
try {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
} catch (err) {
  console.warn('⚠️ Could not load .env file:', err.message);
}

const app = express();

// ✅ UNIVERSAL CORS FIX (for all origins during debugging)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Handle preflight
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use('/api/news', newsRoutes);
app.use('/api/translate', translationRoutes);

// ✅ Health Check
// ✅ Health Check Routes
app.get('/', (req, res) => {
  res.status(200).send('✅ AI News Verifier backend is running successfully!');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'AI News Verifier API is running' });
});

app.get('/railway/health', (req, res) => {
  res.status(200).send('OK');
});

// ✅ Start Server (Railway requires 0.0.0.0 binding)
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
