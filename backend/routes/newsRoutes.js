import express from 'express';
import { verifyNews, searchNews, getArticleDetails } from '../controllers/newsController.js';

const router = express.Router();

// POST /api/news/verify - Verify a news claim
router.post('/verify', verifyNews);

// GET /api/news/search?q=query - Search for news articles
router.get('/search', searchNews);

// GET /api/news/article/:id - Get detailed article information
router.get('/article/:id', getArticleDetails);

export default router;
