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
    const articlesContext = articles.slice(0, 5).map((article, idx) => 
      `Source ${idx + 1} (${article.source}):\nTitle: ${article.title}\nDescription: ${article.description || 'N/A'}\n`
    ).join('\n');

    const prompt = `You are an expert fact-checker and news analyst. Your job is to determine if a news claim is RIGHT or WRONG and provide clear evidence.

CLAIM TO VERIFY:
"${claim}"

RELATED NEWS SOURCES:
${articlesContext || 'No recent news articles found on this topic.'}

CURRENT DATE: ${new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  weekday: 'long' 
})}

Your Task:
1. Determine if this claim is TRUE or FALSE - NO MIDDLE GROUND
2. Provide CLEAR EVIDENCE with source citations
3. Be DECISIVE - use extreme scores (90-100 for TRUE, 0-20 for FALSE)
4. Check against your knowledge of current world leaders and facts

VERDICT OPTIONS (ONLY USE THESE TWO):
- "TRUE" - Claim is factually correct (Score: 90-100)
- "FALSE" - Claim is factually wrong (Score: 0-20)

SCORING RULES:
- If TRUE: Score must be 90-100 (very high confidence)
- If FALSE: Score must be 0-20 (very low, showing it's wrong)
- NO scores between 21-89 - be decisive!

IMPORTANT:
✓ You have knowledge of current world leaders (Modi is PM of India, Biden is US President, etc.)
✓ If claim says wrong person is in power = FALSE with score 5-10
✓ If claim says correct person is in power = TRUE with score 95-100
✓ Cross-check against provided news sources
✓ Cite specific evidence ("According to Source 1...", "Based on current facts as of {date}...")
✓ Check if claim contradicts well-known facts
✓ Be DEFINITIVE - no hedging on clear facts

Respond in this EXACT JSON format:
{
  "verdict": "TRUE" or "FALSE" (ONLY these two options),
  "credibilityScore": 0-100,
  "isRight": true/false (true if claim is correct),
  "evidence": [
    "Evidence point 1 with source reference",
    "Evidence point 2 with factual basis",
    "Evidence point 3 explaining why"
  ],
  "summary": "One clear sentence: This claim is [TRUE/FALSE] because..."
}`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a professional fact-checker and news analyst. Always provide accurate, well-researched responses in valid JSON format. Use current knowledge and cross-reference with provided sources.'
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
    const evidence = Array.isArray(result.evidence) ? result.evidence : [];
    const analysis = [...evidence];
    
    // Add summary as first item if present
    if (result.summary) {
      analysis.unshift(`✓ ${result.summary}`);
    }
    
    // Normalize verdict to TRUE or FALSE
    let verdict = result.verdict;
    let score = result.credibilityScore || 50;
    
    if (verdict !== 'TRUE' && verdict !== 'FALSE') {
      // If AI didn't give TRUE/FALSE, decide based on score
      verdict = score >= 50 ? 'TRUE' : 'FALSE';
    }
    
    // Force extreme scores for clear verdicts
    if (verdict === 'TRUE' && score < 90) {
      score = 95; // Force high score for TRUE
    } else if (verdict === 'FALSE' && score > 20) {
      score = 10; // Force low score for FALSE
    }
    
    return {
      verdict: verdict,
      credibilityScore: Math.min(100, Math.max(0, score)),
      analysis: analysis,
      isRight: result.isRight,
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
