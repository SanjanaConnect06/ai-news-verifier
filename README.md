# 🛡️ AI News Verifier

> **Combat misinformation with AI-powered news verification**

An intelligent web application that verifies news claims by analyzing multiple trusted sources in real-time, providing credibility scores and fact-checking results.

---

## ✨ Features

- 🔍 **Real-Time News Verification** - Fetches live news from multiple APIs
- 🤖 **AI-Powered Analysis** - Advanced credibility scoring algorithm
- ✅ **Fact Checking** - Verifies factual claims (dates, scientific facts, etc.)
- 📊 **Multi-Source Analysis** - Cross-references information from trusted sources
- 🎨 **Beautiful UI** - Modern, animated interface with Framer Motion
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Caching system for quick results
- 🌐 **Multiple News APIs** - Guardian, NewsAPI, GNews, NewsData.io

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm

### Installation

1. **Install dependencies**
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd backend
   npm install
   cd ..
   ```

2. **Configure AI (Recommended for Accuracy)**
   
   Get a **FREE** Groq API key for AI-powered fact-checking:
   - Visit: https://console.groq.com/
   - Sign up (takes 30 seconds)
   - Get your API key
   - Add to `backend/.env`:
     ```env
     GROQ_API_KEY=your_key_here
     ```
   
   See **[GROQ_SETUP.md](GROQ_SETUP.md)** for detailed instructions.

3. **Start the application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

---

## 🎯 How It Works

### AI-Powered Verification ⚡
With Groq AI (free), the app provides:
- 🤖 **Real-time AI fact-checking** with current world knowledge
- 🌍 **Accurate verification** of recent events and news
- 📊 **Intelligent analysis** that cross-references sources
- 👨‍🔬 **Context-aware** explanations and verdicts

### News Sources
Fetches **REAL, LIVE NEWS** from:
1. The Guardian API (works immediately!)
2. NewsAPI.org (optional)
3. GNews.io (optional)
4. NewsData.io (optional)

### Features
- ✅ Fact-checks with AI + real news sources
- 🔍 Detects misinformation patterns
- 📰 Analyzes source credibility
- 💯 Generates credibility score (0-100)
- 🇮🇳 Supports 12+ Indian languages

---

## 🧪 Try These Examples

### ✅ TRUE Examples:
- "Today is Wednesday" (on Wednesday)
- "Climate change effects"
- "Earth is round"

### ❌ FALSE Examples:
- "Today is Monday" (on Wednesday)
- "Earth is flat"
- "5G causes cancer"

---

## 🔑 Add More News Sources (Optional)

See `backend/API_SETUP.md` for detailed instructions to add:
- NewsAPI.org (100 req/day free)
- GNews.io (100 req/day free)
- NewsData.io (200 req/day free)

**Note:** The app works immediately with The Guardian API - no setup needed!

---

## 📊 Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS 4, Framer Motion  
**Backend:** Node.js, Express, Axios, Node-Cache  
**APIs:** The Guardian, NewsAPI, GNews, NewsData.io

---

## 🎓 Project Goal

Combat misinformation in the digital age by providing an accessible, AI-powered tool that helps users verify news claims with real, live news sources.

---

Made with ❤️ for the Ideathon
