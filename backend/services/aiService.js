import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
});

/**
 * Use AI to verify a news claim with real-time knowledge
 * @param {string} claim - The news claim to verify
 * @param {Array} articles - Related news articles from APIs
 * @returns {Promise<Object>} AI analysis result
 */
export async function verifyClaimWithAI(claim, articles) {
  try {
    // If no API key, return basic analysis
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'YOUR_GROQ_API_KEY') {
      console.warn('⚠️  GROQ_API_KEY not configured - using basic analysis');
      return null;
    }

    // Prepare context from articles
    const articlesContext = articles.slice(0, 10).map((article, idx) => 
      `[${idx + 1}] ${article.source} - "${article.title}"\nSummary: ${article.description || 'N/A'}\nURL: ${article.url}\n`
    ).join('\n');

    const prompt = `You are an AI-powered fact-checking system that verifies real-world news claims.

Task:
Determine if the given claim is TRUE, FALSE, or UNCERTAIN based on up-to-date news sources.

Claim:
"${claim}"

Here are recent articles and headlines from verified outlets (BBC, Reuters, AP, The Hindu, NDTV, etc.):
${articlesContext || 'No recent news articles found on this topic.'}

CURRENT DATE: ${new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  weekday: 'long' 
})}

KNOWN FACTS (as of November 2025):
- Narendra Modi is the Prime Minister of India (since 2014)
- Joe Biden is the President of USA (since 2021)
- Rahul Gandhi is NOT the Prime Minister of India (he is a Congress party leader)
- Donald Trump is NOT currently President (term ended 2021)

Instructions:
1. Carefully compare the claim with the news data above.
2. If none of the articles confirm the claim → verdict = FALSE.
3. If some clearly support the claim → verdict = TRUE.
4. If coverage is ambiguous or outdated → verdict = UNCERTAIN.
5. Never assume truth without evidence.
6. Include 2–3 relevant headlines as supporting or contradicting references.

SCORING:
- TRUE: confidence 90-100 (articles support the claim)
- FALSE: confidence 90-100 (articles contradict or don't support the claim)
- UNCERTAIN: confidence 30-60 (ambiguous or insufficient coverage)

For political leader claims:
- Check against known facts above
- If claim says CORRECT person is in power → TRUE with confidence 95-100
- If claim says WRONG person is in power → FALSE with confidence 95-100

Respond only in JSON:
{
  "verdict": "TRUE | FALSE | UNCERTAIN",
  "confidence": number (0-100),
  "reasoning": "Explain concisely why this verdict was reached.",
  "sources": ["headline 1", "headline 2", "headline 3"]
}`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an AI fact-checking system. CRITICAL: Narendra Modi is PM of India (NOT Rahul Gandhi). Joe Biden is US President. Always verify claims against provided news sources and known facts. Never assume truth without evidence. If articles don\'t support a claim, mark it FALSE. Respond only in valid JSON format with verdict, confidence, reasoning, and sources.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile', // Fast and accurate
      temperature: 0.3, // Lower temperature for more factual responses
      max_tokens: 1000,
      response_format: { type: 'json_object' }
    });

    const responseText = completion.choices[0]?.message?.content;
    if (!responseText) {
      throw new Error('No response from AI');
    }

    const result = JSON.parse(responseText);
    
    // Validate and normalize the result
    let verdict = result.verdict || 'UNCERTAIN';
    let confidence = result.confidence || 50;
    
    // Build analysis from reasoning
    const analysis = [];
    if (result.reasoning) {
      analysis.push(`✓ ${result.reasoning}`);
    }
    
    // Add source information if available
    if (result.sources && Array.isArray(result.sources) && result.sources.length > 0) {
      analysis.push(`Sources: ${result.sources.slice(0, 3).join(', ')}`);
    }
    
    // Normalize verdict
    if (!['TRUE', 'FALSE', 'UNCERTAIN'].includes(verdict)) {
      verdict = confidence >= 70 ? 'TRUE' : confidence <= 40 ? 'FALSE' : 'UNCERTAIN';
    }
    
    // Force extreme scores for clear verdicts
    if (verdict === 'TRUE' && confidence < 90) {
      confidence = 95;
    } else if (verdict === 'FALSE' && confidence < 90) {
      confidence = 95;
    } else if (verdict === 'UNCERTAIN' && confidence > 60) {
      confidence = 50;
    }
    
    return {
      verdict: verdict,
      credibilityScore: Math.min(100, Math.max(0, confidence)),
      analysis: analysis,
      sources: result.sources || [],
      aiPowered: true
    };

  } catch (error) {
    console.error('AI verification error:', error.message);
    console.error('Error details:', error.response?.data || error);
    // Return null to fall back to basic analysis
    return null;
  }
}

/**
 * Get AI-powered translation with context
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code
 * @returns {Promise<string>} Translated text
 */
export async function translateWithAI(text, targetLang) {
  try {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'YOUR_GROQ_API_KEY') {
      return null;
    }

    const languageNames = {
      'EN-GB': 'English (UK)',
      'EN-US': 'English (US)',
      'HI': 'Hindi (हिन्दी)',
      'TA': 'Tamil (தமிழ்)',
      'TE': 'Telugu (తెలుగు)',
      'BN': 'Bengali (বাংলা)',
      'MR': 'Marathi (मराठी)',
      'GU': 'Gujarati (ગુજરાતી)',
      'KN': 'Kannada (ಕನ್ನಡ)',
      'ML': 'Malayalam (മലയാളം)',
      'PA': 'Punjabi (ਪੰਜਾਬੀ)',
      'UR': 'Urdu (اردو)',
      'OR': 'Odia (ଓଡ଼ିଆ)',
      'AS': 'Assamese (অসমীয়া)',
      'FR': 'French (Français)',
      'ES': 'Spanish (Español)',
      'DE': 'German (Deutsch)',
      'IT': 'Italian (Italiano)',
      'PT-PT': 'Portuguese (Português)',
      'PT-BR': 'Portuguese Brazil (Português BR)',
      'RU': 'Russian (Русский)',
      'TR': 'Turkish (Türkçe)',
      'JA': 'Japanese (日本語)',
      'KO': 'Korean (한국어)',
      'ZH': 'Chinese (中文)',
      'AR': 'Arabic (العربية)',
      'NL': 'Dutch (Nederlands)',
      'PL': 'Polish (Polski)',
      'SV': 'Swedish (Svenska)',
    };

    const targetLanguage = languageNames[targetLang] || targetLang;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Translate the text accurately to ${targetLanguage}. Maintain the meaning and tone.`
        },
        {
          role: 'user',
          content: `Translate this to ${targetLanguage}:\n\n${text}`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 2000
    });

    return completion.choices[0]?.message?.content || null;
  } catch (error) {
    console.error('AI translation error:', error.message);
    return null;
  }
}
