// 🚀 AI News Verifier backend — final production-safe version
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import path from 'path';
import { fileURLToPath } from 'url';
import newsRoutes from './routes/newsRoutes.js';
import translationRoutes from './routes/translationRoutes.js';
import process from 'node:process';

// ✅ Shared cache instance for controllers
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

// ✅ CORS configuration (Vercel frontend + localhost)
const allowedOrigins = [
  'https://ai-news-verifier-eta.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ Blocked CORS request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Preflight requests
app.options('*', cors());

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use('/api/news', newsRoutes);
app.use('/api/translate', translationRoutes);

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

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message || err);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// ✅ Start Server (must bind to 0.0.0.0 for Railway)
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
