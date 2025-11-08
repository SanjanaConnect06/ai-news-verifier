import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function testGroq() {
  console.log('Testing Groq API...');
  console.log('API Key:', process.env.GROQ_API_KEY ? 'Found (starts with ' + process.env.GROQ_API_KEY.substring(0, 7) + '...)' : 'NOT FOUND');
  
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: 'Say "Hello, Groq is working!" if you can read this.'
        }
      ],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 50
    });

    console.log('✅ SUCCESS! Groq API is working!');
    console.log('Response:', completion.choices[0]?.message?.content);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    if (error.status === 401) {
      console.error('Invalid API key! Please check your GROQ_API_KEY in .env file');
    }
  }
}

testGroq();
