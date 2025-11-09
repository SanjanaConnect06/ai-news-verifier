import axios from 'axios';

const API_BASE_URL = "https://ai-news-verifier-1.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Verify news text
export const verifyNews = async (text) => {
  try {
    const response = await api.post('/api/news/verify', { text }); // <-- added /api
    return response.data;
  } catch (error) {
    console.error('Error verifying news:', error);
    throw error;
  }
};

// ✅ Search news articles
export const searchNews = async (query) => {
  try {
    const response = await api.get('/api/news/search', {  // <-- added /api
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

// ✅ Get article details
export const getArticleDetails = async (id) => {
  try {
    const response = await api.get(`/api/news/article/${id}`); // <-- added /api
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

// ✅ Translate text
export const translateText = async (text, targetLang) => {
  try {
    const response = await api.post('/api/translate', { text, targetLang }); // <-- added /api
    return response.data;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
};

// ✅ Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health'); // <-- added /api
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

export default api;
