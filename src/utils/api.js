import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Verify news text
export const verifyNews = async (text) => {
  try {
    const response = await api.post('/news/verify', { text });
    return response.data;
  } catch (error) {
    console.error('Error verifying news:', error);
    throw error;
  }
};

// Search news articles
export const searchNews = async (query) => {
  try {
    const response = await api.get('/news/search', {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};

// Get article details
export const getArticleDetails = async (id) => {
  try {
    const response = await api.get(`/news/article/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
};

// Translate text
export const translateText = async (text, targetLang) => {
  try {
    const response = await api.post('/translate', { text, targetLang });
    return response.data;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

export default api;
