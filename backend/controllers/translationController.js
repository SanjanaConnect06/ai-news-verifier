import axios from 'axios';
import dotenv from 'dotenv';
import { translateWithAI } from '../services/aiService.js';

dotenv.config();

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

// Fallback public translator (MyMemory) when DeepL is not configured
const MYMEMORY_URL = 'https://api.mymemory.translated.net/get';

export const translateText = async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ error: 'Text and target language are required' });
    }

    // Try AI translation first (best for Indian languages)
    const aiTranslation = await translateWithAI(text, targetLang);
    if (aiTranslation) {
      console.log('✅ Using AI translation');
      return res.json({ translatedText: aiTranslation, provider: 'groq-ai' });
    }

    // Prefer DeepL if API key is set
    if (DEEPL_API_KEY && DEEPL_API_KEY !== 'YOUR_DEEPL_API_KEY') {
      try {
        const response = await axios.post(DEEPL_API_URL, {
          text: [text],
          target_lang: targetLang,
        }, {
          headers: {
            'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 8000,
        });

        if (response.data.translations && response.data.translations.length > 0) {
          return res.json({ translatedText: response.data.translations[0].text, provider: 'deepl' });
        }
      } catch (deeplErr) {
        console.warn('DeepL translation failed, falling back:', deeplErr.message);
      }
    }

    // Fallback: MyMemory (public, rate-limited)
    // Map language codes to ISO 639-1
    const langMap = {
      'HI': 'hi', 'TA': 'ta', 'TE': 'te', 'BN': 'bn', 'MR': 'mr',
      'GU': 'gu', 'KN': 'kn', 'ML': 'ml', 'PA': 'pa', 'UR': 'ur',
      'OR': 'or', 'AS': 'as', 'EN-GB': 'en', 'EN-US': 'en',
      'FR': 'fr', 'ES': 'es', 'DE': 'de', 'IT': 'it', 'PT-PT': 'pt',
      'PT-BR': 'pt', 'RU': 'ru', 'TR': 'tr', 'JA': 'ja', 'KO': 'ko',
      'ZH': 'zh', 'AR': 'ar', 'NL': 'nl', 'PL': 'pl', 'SV': 'sv'
    };
    const targetCode = langMap[targetLang] || targetLang.split('-')[0].toLowerCase();
    
    const mmResp = await axios.get(MYMEMORY_URL, {
      params: { q: text, langpair: `en|${targetCode}` },
      timeout: 8000,
    });

    const translated = mmResp?.data?.responseData?.translatedText;
    if (translated) {
      return res.json({ translatedText: translated, provider: 'mymemory' });
    }

    return res.status(502).json({ error: 'Translation service unavailable' });
  } catch (error) {
    console.error('Error translating text:', error.message);
    res.status(500).json({ 
      error: 'Failed to translate text', 
      message: error.response ? error.response.data : error.message 
    });
  }
};
