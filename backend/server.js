// 🚀 Trigger redeploy for Railway
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';
import path from 'path';
import { fileURLToPath } from 'url';
import newsRoutes from './routes/newsRoutes.js';
import translationRoutes from './routes/translationRoutes.js';
import process from 'node:process';

// ✅ Export shared cache instance for controllers
export const newsCache = new NodeCache({ stdTTL: 3600 }); // Cache expires in 1 hour

// ✅ Load environment variables
try {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
} catch (err) {
  console.warn('⚠️ Could not load local .env file:', err.message);
}

// ✅ Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed Origins (Frontend + Local)
const allowedOrigins = [
  'https://ai-news-verifier-eta.vercel.app', // Deployed frontend (Vercel)
  'http://localhost:5173'                    // Local dev
];

// ✅ Improved CORS setup (handles preflight + real requests)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like curl or mobile)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ Blocked CORS request from origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'], // Allow preflight
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200 // 👈 Important for legacy browsers
  })
);

// ✅ Handle preflight requests explicitly
app.options('*', cors());

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use('/api/news', newsRoutes);
app.use('/api/translate', translationRoutes);

// ✅ Health Check Routes
app.get('/', (req, res) => {
  res.send('✅ AI News Verifier backend is running successfully!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI News Verifier API is running' });
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack || err.message);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// ✅ Start Server (Railway requires 0.0.0.0 binding)
// ✅ Health Check Routes
app.get('/', (req, res) => {
  res.send('✅ AI News Verifier backend is running successfully!');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI News Verifier API is running' });
});

app.get('/railway-health', (req, res) => {
  res.send('OK');
});

// ✅ Start Server (Railway requires dynamic PORT binding)
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

