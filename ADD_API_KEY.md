# 🔑 Add Groq API Key in 60 Seconds

## Why You're Seeing Same Scores

You're currently using **basic mode** without AI. The app works but has limited accuracy.

**With Groq API = Different scores for true vs false + real evidence!**

## ⚡ Super Quick Setup

### Step 1: Get API Key (30 seconds)
1. Click: **https://console.groq.com/**
2. Click "Sign in with Google" or "Sign in with GitHub"
3. After login, you'll see "API Keys" on the left
4. Click "Create API Key"
5. Copy the key (starts with `gsk_`)

### Step 2: Add to Project (30 seconds)
1. Open this file: `backend/.env`
2. Find line 16 that says: `GROQ_API_KEY=`
3. Paste your key after the `=`:
   ```
   GROQ_API_KEY=gsk_your_key_here
   ```
4. Save the file (Ctrl+S)

### Step 3: Restart Backend
In the terminal where backend is running:
1. Press `Ctrl+C` to stop
2. Run: `npm start`
3. Done!

## ✅ How to Verify It's Working

When you verify a news claim, you should see:
- **"⚡ AI-Powered Analysis"** badge on the result
- Different scores for true vs false claims
- Evidence with "According to..." or "Based on..."
- Backend console shows: "✅ Using AI-powered verification"

## 🎯 Test Cases

### After adding API key, try:

**Should show HIGH score (90-100):**
```
"The Earth revolves around the Sun"
"Water is wet"
"Humans need oxygen to survive"
```

**Should show LOW score (0-10):**
```
"The Earth is flat"
"5G causes cancer"
"Vaccines cause autism"
```

If you see correct different scores, it's working!

## 💡 Without API Key (Current)

You'll get:
- Basic pattern matching
- Same-ish scores for everything
- Limited accuracy
- No real-time knowledge
- No AI badge

## 🆘 Troubleshooting

**Still showing same scores?**
1. Check `backend/.env` has the key with no spaces
2. Make sure you restarted the backend
3. Check backend terminal for "✅ Using AI-powered verification"
4. If you see "⚠️ Using basic verification", the key is not working

**Invalid API key error?**
- Copy the key again (no extra spaces)
- Make sure it starts with `gsk_`
- Generate a new key if needed

## 🚀 Why Groq?

- ✓ 100% FREE (no credit card)
- ✓ Super fast (< 1 second response)
- ✓ Current knowledge (knows recent events)
- ✓ Accurate (uses Llama 3.3 70B model)
- ✓ Generous limits (you won't hit them)

---

**Takes 60 seconds to set up. Worth it for 100x better accuracy!** 🎉
