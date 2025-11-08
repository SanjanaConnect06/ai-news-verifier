# 🚀 Groq AI Setup Guide

## Why Groq AI?
Groq provides **FREE, ULTRA-FAST AI** with real-time knowledge for accurate fact-checking. It uses Llama 3.3 70B model which has current world information.

## ✨ Benefits
- ✅ **100% FREE** - No credit card required
- ✅ **Lightning Fast** - Responses in under 1 second
- ✅ **Current Knowledge** - Has information about recent events
- ✅ **Accurate Fact-Checking** - Trained on massive datasets
- ✅ **Better Translation** - Especially for Indian languages

## 📝 Setup Steps

### 1. Get Your Free API Key

1. Go to **https://console.groq.com/**
2. Sign up with Google/GitHub (takes 30 seconds)
3. Navigate to **API Keys** section
4. Click **"Create API Key"**
5. Copy your API key

### 2. Add API Key to Project

Open `backend/.env` file and add your key:

```env
GROQ_API_KEY=gsk_your_api_key_here
```

### 3. Restart the Backend

```bash
cd backend
npm start
```

## 🎯 What This Enables

### Without Groq AI (Basic Mode):
- ❌ Limited fact-checking based on patterns
- ❌ No current event knowledge
- ❌ Basic translation (rate-limited)
- ❌ Cannot verify recent news

### With Groq AI (Powered Mode):
- ✅ **Real-time fact-checking** with current knowledge
- ✅ **Accurate verification** of recent events
- ✅ **Context-aware analysis** from news sources
- ✅ **Better translations** for all Indian languages
- ✅ **Detailed explanations** of verdicts
- ✅ **Cross-reference** claims with provided sources

## 🧪 Test It

Try these queries to see the difference:

### Current Events:
- "Who won the latest cricket world cup?"
- "What is the current US president?"
- "Latest developments in AI technology"

### Fact-Checking:
- "The earth is flat"
- "5G causes cancer"
- "COVID-19 is a hoax"

### Indian Languages:
- Translate results to Hindi, Tamil, Telugu, etc.

## 💡 Tips

- **API Limits**: Free tier has generous limits (don't worry about it)
- **Speed**: Groq is extremely fast - responses in < 1 second
- **Accuracy**: Much more accurate than pattern-based checking
- **Privacy**: Groq doesn't store your queries

## 🆘 Troubleshooting

If you see "⚠️ Using basic verification":
1. Check if `GROQ_API_KEY` is set in `backend/.env`
2. Make sure there's no extra spaces in the key
3. Restart the backend server
4. Check backend logs for errors

## 📚 More Info

- Groq Console: https://console.groq.com/
- API Documentation: https://console.groq.com/docs
- Models Available: Llama 3.3 70B (default), Mixtral, etc.

---

**Note**: The app works without Groq AI but with limited accuracy. For best results and current world information, add your free Groq API key!
