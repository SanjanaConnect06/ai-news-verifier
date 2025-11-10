# 🔥 FIX RENDER NOW - STOP GETTING WRONG RESULTS

## THE PROBLEM

Your Render deployment is **NOT using AI** because the `GROQ_API_KEY` environment variable is **MISSING**.

Without it, the system falls back to basic pattern matching which gives wrong results.

## THE FIX (DO THIS RIGHT NOW)

### Step 1: Open Render Dashboard
Go to: https://dashboard.render.com/

### Step 2: Click Your Backend Service
Click on your Node.js/Express backend service

### Step 3: Add Environment Variable

1. Click **"Environment"** in the left sidebar
2. Look for `GROQ_API_KEY` - **Is it there? Is it set?**
3. If NO or if empty:
   - Click **"Add Environment Variable"**
   - Key: `GROQ_API_KEY`
   - Value: Copy from `backend/.env` file on your local machine (the line with `GROQ_API_KEY=gsk_...`)
   - Click **"Save"**

### Step 4: Redeploy

After saving the variable:
1. Click **"Manual Deploy"** (top right button)
2. Select **"Deploy latest commit"**
3. **WAIT** until it shows "Live" (2-3 minutes)

### Step 5: CHECK THE LOGS

This is CRITICAL - you MUST check the logs:

1. Click **"Logs"** tab
2. Scroll down and look for when someone verifies news
3. You should see: `✅ Using AI-powered verification`
4. If you see: `⚠️ Using basic verification` - THE API KEY IS STILL MISSING!

### Step 6: Test Your Live Site

Go to your deployed site and test:

**Input:** "Rahul Gandhi is Prime Minister of India"

**Expected Result:**
- Verdict: ❌ FALSE
- Score: 95-100
- You'll see ⚡ AI-Powered badge
- Evidence will mention Modi is the actual PM

**If you're getting wrong results:**
- Score is like 50, 60, 70 → API KEY IS MISSING
- No AI badge → API KEY IS MISSING  
- Generic verdicts → API KEY IS MISSING

## WHY THIS KEEPS HAPPENING

Render **DOES NOT** automatically use environment variables from your code.

You MUST manually add them in the Render dashboard.

Even if you redeploy 100 times, if the environment variable isn't set in Render's dashboard, it will NEVER work.

## HOW TO VERIFY IT'S ACTUALLY FIXED

After doing all steps above:

1. **Check Render Logs** - Should show "Using AI-powered verification"
2. **Test on live site** - Should get FALSE with high score for Rahul claim
3. **Check for AI badge** - Should see ⚡ AI-Powered on results
4. **Check evidence** - Should reference Modi, current facts, news sources

## TROUBLESHOOTING

### "I added the key but still not working"

1. Did you click SAVE after adding the key?
2. Did you REDEPLOY after adding the key?
3. Did you check the LOGS to confirm it's being used?
4. Try removing the key and adding it again
5. Make sure there are NO SPACES before/after the key value

### "Logs still show 'Using basic verification'"

The API key is not being read. Try:
1. Delete the environment variable
2. Re-add it (make sure to copy the FULL key including gsk_ prefix)
3. Save
4. Redeploy
5. Check logs again

### "Getting 500 errors"

1. Check logs for the actual error message
2. Make sure groq-sdk is installed (should be in package.json)
3. Verify the deployment succeeded

## YOUR LOCAL GROQ_API_KEY

Your local key is in: `C:\Users\sanja\OneDrive\Desktop\Ideathon\ai-news-verifier\backend\.env`

Open that file, find the line with `GROQ_API_KEY=gsk_...` and copy the ENTIRE value after the `=`

That's what goes in Render's environment variable value field.

## FINAL CHECK

After setting everything up:

**Localhost (npm start):**
- Input "Rahul is PM" → FALSE with 95+ score ✅

**Render (deployed):**
- Input "Rahul is PM" → FALSE with 95+ score ✅

If localhost works but Render doesn't = API KEY NOT SET IN RENDER

---

**DO THESE STEPS NOW. DON'T SKIP ANY STEP. THIS WILL FIX IT.**
