# 🔑 API Setup Guide for Real News Verification

This application supports multiple news APIs to fetch real, live news for verification. You can use one or more of these services.

## 📰 Supported News APIs

### 1. **The Guardian API** ✅ (Works Out of the Box)
- **Status:** Already working! No setup needed
- **Free tier:** Unlimited basic access
- **Website:** https://open-platform.theguardian.com/

The Guardian API is already integrated and works without authentication for basic queries.

---

### 2. **NewsAPI.org** (Recommended)
- **Free tier:** 100 requests/day
- **Setup time:** 2 minutes

#### How to get your API key:
1. Go to https://newsapi.org/register
2. Sign up with your email
3. Verify your email
4. Copy your API key from the dashboard
5. Add to `.env` file: `NEWS_API_KEY=your_key_here`

---

### 3. **GNews.io**
- **Free tier:** 100 requests/day
- **Setup time:** 2 minutes

#### How to get your API key:
1. Go to https://gnews.io/
2. Click "Get API Key"
3. Sign up with your email
4. Copy your API key
5. Add to `.env` file: `GNEWS_API_KEY=your_key_here`

---

### 4. **NewsData.io**
- **Free tier:** 200 requests/day (Best free tier!)
- **Setup time:** 2 minutes

#### How to get your API key:
1. Go to https://newsdata.io/register
2. Sign up with your email
3. Verify your email
4. Copy your API key from the dashboard
5. Add to `.env` file: `NEWSDATA_API_KEY=your_key_here`

---

## 🚀 Quick Start

### Option 1: Use Guardian API Only (No setup)
The app works immediately with The Guardian API. Just start the server!

```bash
npm start
```

### Option 2: Add More APIs (Recommended)
For best results, add at least one paid API key:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your API keys:
   ```
   NEWS_API_KEY=your_newsapi_key_here
   GNEWS_API_KEY=your_gnews_key_here
   NEWSDATA_API_KEY=your_newsdata_key_here
   ```

3. Restart the server:
   ```bash
   npm start
   ```

---

## 🎯 How It Works

The app tries multiple news sources in order:
1. **NewsAPI.org** (if key provided)
2. **GNews.io** (if key provided)
3. **NewsData.io** (if key provided)
4. **The Guardian** (always works)
5. **Mock data** (fallback if all fail)

This ensures:
- ✅ Real-time news verification
- ✅ Multiple reliable sources
- ✅ Fallback if one API fails
- ✅ Works even without API keys

---

## 💡 Tips

- **For Demo:** Just use The Guardian API (already working)
- **For Production:** Add at least 2 API keys for reliability
- **Best Setup:** Add all 3 paid API keys for maximum coverage

---

## 🆓 Free Tier Limits

| Service | Requests/Day | Articles/Request |
|---------|--------------|------------------|
| NewsAPI.org | 100 | 100 |
| GNews.io | 100 | 10 |
| NewsData.io | 200 | 10 |
| The Guardian | Unlimited | 10 |

---

## ❓ Troubleshooting

**No articles found?**
- Check your internet connection
- Verify API keys are correct in `.env`
- Check API quota limits
- The Guardian API will work as fallback

**API key not working?**
- Make sure there are no extra spaces in `.env`
- Restart the server after adding keys
- Check if you've exceeded free tier limits

---

## 📚 More Information

- NewsAPI docs: https://newsapi.org/docs
- GNews docs: https://gnews.io/docs
- NewsData docs: https://newsdata.io/documentation
- Guardian docs: https://open-platform.theguardian.com/documentation/
