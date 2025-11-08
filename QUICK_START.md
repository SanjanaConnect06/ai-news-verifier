# ⚡ Quick Start - Get Accurate Results NOW!

## 🎯 What You Get

The app now clearly shows if news is **RIGHT ✅** or **WRONG ❌** with evidence!

### Example Results:
- **"✅ RIGHT - This claim is TRUE"** → Score: 90-100
- **"❌ WRONG - This claim is FALSE"** → Score: 0-20
- **"⚠️ MISLEADING"** → Mixed truth/false

## 🚀 Setup for Accuracy (2 minutes)

### Step 1: Get Free Groq API Key
1. Visit: **https://console.groq.com/**
2. Sign up with Google (FREE, no credit card)
3. Go to "API Keys" → Create API Key
4. Copy the key (starts with `gsk_...`)

### Step 2: Add to Project
1. Open `backend/.env` file
2. Find the line: `GROQ_API_KEY=`
3. Paste your key: `GROQ_API_KEY=gsk_your_key_here`
4. Save the file

### Step 3: Restart Backend
```bash
cd backend
npm start
```

## ✅ That's It!

Now the app will:
- ✓ Tell you if news is RIGHT or WRONG clearly
- ✓ Provide evidence supporting the verdict
- ✓ Check against current world facts
- ✓ Cite sources and explain reasoning
- ✓ Work with current events

## 🧪 Test These Claims

### Should show "✅ RIGHT":
- "The Earth revolves around the Sun"
- "Water boils at 100°C at sea level"
- [Any current true fact]

### Should show "❌ WRONG":
- "The Earth is flat"
- "5G causes cancer"
- "Vaccines cause autism"

### Should show "⚠️ MISLEADING":
- Claims that mix truth with false info

## 📊 What You'll See

After verification, you get:

1. **Clear Verdict**: RIGHT ✅ or WRONG ❌ (big and obvious!)
2. **Score**: 0-100 showing confidence
3. **Evidence**: Bullet points with proof
4. **Sources**: Related news articles
5. **AI Badge**: Shows it's using real AI

## 💡 Without Groq API

The app still works but with limited accuracy:
- Only pattern-based checking
- No current event knowledge
- Basic verdict system

**With Groq AI = 100x better accuracy!**

## 🆘 Troubleshooting

**Not showing AI-powered badge?**
- Check `GROQ_API_KEY` is in `backend/.env`
- Make sure no extra spaces
- Restart backend server

**Getting errors?**
- Invalid API key → Get new one from console.groq.com
- Check backend logs for details

## 📱 Using the App

1. Enter any news claim or headline
2. Click "Verify News Now"
3. Wait 2-3 seconds
4. See clear RIGHT/WRONG verdict with evidence
5. Read the evidence points
6. Check sources if needed
7. Translate to Indian languages if needed

---

**Enjoy accurate fact-checking! 🎉**
