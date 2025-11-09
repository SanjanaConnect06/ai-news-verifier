# 🚀 Render Deployment - Complete Guide

## ⚠️ CRITICAL: Why Your Deployed App Doesn't Work

Your deployed app on Render is **NOT using AI** because the `GROQ_API_KEY` environment variable is **missing or incorrect**.

## 📋 Step-by-Step Fix

### 1. Go to Render Dashboard
Visit: https://dashboard.render.com/

### 2. Find Your Backend Service
Click on your backend service (the Node.js/Express app)

### 3. Add Environment Variable

Click **"Environment"** in the left sidebar, then:

1. Click **"Add Environment Variable"**
2. Set:
   - **Key**: `GROQ_API_KEY`
   - **Value**: (Use the API key from your local `backend/.env` file)
3. Click **"Save Changes"**

### 4. Redeploy

After adding the variable:
1. Click **"Manual Deploy"** button (top right)
2. Select **"Deploy latest commit"**
3. Wait 2-3 minutes for deployment to complete

### 5. Check Logs

After deployment:
1. Click **"Logs"** tab
2. Look for these messages:
   - ✅ `✅ Using AI-powered verification` (GOOD!)
   - ❌ `⚠️ Using basic verification` (BAD - API key missing!)

## 🧪 Test After Deployment

Go to your deployed site and try:
- **"Rahul is prime minister of India"**
  - Should show: ❌ **FALSE** with **5/100**
  - Should have evidence: "Narendra Modi is the PM..."
  
- **"Narendra Modi is prime minister of India"**
  - Should show: ✅ **TRUE** with **98/100**
  - Should have evidence with sources

## ❌ Common Issues

### Issue 1: "Still showing wrong results"
**Solution**: 
- Clear your browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+F5)
- Try incognito mode

### Issue 2: "Backend logs show 'Using basic verification'"
**Solution**:
- Environment variable is missing or wrong
- Go back to step 3 and add/fix the GROQ_API_KEY
- Make sure there are NO SPACES before or after the key
- Redeploy after fixing

### Issue 3: "No sources/articles showing"
**Solution**:
- This is normal if you don't have news API keys
- The Guardian API works automatically
- AI verification still works without news APIs

### Issue 4: "Getting 500 errors"
**Solution**:
- Check Render logs for error messages
- Make sure all dependencies are installed
- Verify the deployment succeeded

## 🔍 How to Verify It's Working

### Test on Your Live Site:

1. **Test FALSE claim**:
   - Input: "Rahul Gandhi is Prime Minister of India"
   - Expected: FALSE, score 5/100
   - Should see ⚡ AI-Powered badge
   
2. **Test TRUE claim**:
   - Input: "Narendra Modi is Prime Minister of India"  
   - Expected: TRUE, score 98/100
   - Should see ⚡ AI-Powered badge

3. **Check for evidence**:
   - Should see 3-5 bullet points with ✓ marks
   - Should reference current facts
   - Should mention specific leaders by name

## 📞 If Still Not Working

Check these in Render:

1. **Environment Tab**:
   - GROQ_API_KEY exists ✓
   - Value starts with `gsk_` ✓
   - No extra spaces ✓

2. **Logs Tab**:
   - No error messages ✓
   - Shows "Using AI-powered verification" ✓
   - No "API key not configured" warnings ✓

3. **Deploy Tab**:
   - Latest commit is deployed ✓
   - Build succeeded ✓
   - Service is live (green dot) ✓

## 🎯 Expected Behavior After Fix

### Before (WITHOUT API Key):
- ❌ Generic scores (like 50, 60, 70)
- ❌ No AI-powered badge
- ❌ Basic pattern matching only
- ❌ Can't verify real events
- ❌ Wrong verdicts

### After (WITH API Key):
- ✅ Extreme scores (5 or 98)
- ✅ ⚡ AI-Powered badge visible
- ✅ Real-time fact checking
- ✅ Accurate verdicts
- ✅ Detailed evidence with sources
- ✅ Current world knowledge

## 💡 Pro Tip

After setting the environment variable, **always redeploy**. Render doesn't automatically restart the service when you add/change environment variables.

---

**Once you follow these steps, your deployed app will work exactly like localhost!** 🚀
