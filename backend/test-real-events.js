import { verifyClaimWithAI } from './services/aiService.js';
import dotenv from 'dotenv';

dotenv.config();

async function testRealEvents() {
  console.log('🧪 Testing Real Event Verification\n');
  console.log('API Key:', process.env.GROQ_API_KEY ? '✅ Found' : '❌ NOT FOUND');
  console.log('Current Date:', new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long' 
  }));
  console.log('\n---\n');

  // Test cases for real events
  const testCases = [
    {
      name: 'Political Leader (India)',
      claim: 'Narendra Modi is Prime Minister of India',
      expectedVerdict: 'TRUE'
    },
    {
      name: 'False Political Claim',
      claim: 'Rahul Gandhi is Prime Minister of India',
      expectedVerdict: 'FALSE'
    },
    {
      name: 'Political Leader (USA)',
      claim: 'Joe Biden is President of USA',
      expectedVerdict: 'TRUE'
    },
    {
      name: 'Simple Fact',
      claim: 'The Earth revolves around the Sun',
      expectedVerdict: 'TRUE'
    },
    {
      name: 'False Claim',
      claim: 'The Earth is flat',
      expectedVerdict: 'FALSE'
    }
  ];

  for (const test of testCases) {
    console.log(`\n📝 Test: ${test.name}`);
    console.log(`Claim: "${test.claim}"`);
    console.log(`Expected: ${test.expectedVerdict}`);
    
    try {
      const result = await verifyClaimWithAI(test.claim, []);
      
      if (result) {
        console.log(`\n✅ Result:`);
        console.log(`   Verdict: ${result.verdict}`);
        console.log(`   Score: ${result.credibilityScore}/100`);
        console.log(`   Evidence:`);
        result.analysis.forEach((item, i) => {
          console.log(`   ${i + 1}. ${item}`);
        });
        
        if (result.verdict === test.expectedVerdict) {
          console.log(`\n✅ PASS - Verdict matches expected!`);
        } else {
          console.log(`\n❌ FAIL - Expected ${test.expectedVerdict} but got ${result.verdict}`);
        }
      } else {
        console.log(`\n❌ AI returned null - check API key`);
      }
    } catch (error) {
      console.log(`\n❌ ERROR: ${error.message}`);
    }
    
    console.log('\n' + '='.repeat(70));
  }

  console.log('\n\n✅ Testing complete!');
  console.log('\nIf all tests passed, your system can verify real events accurately! 🎉');
}

testRealEvents();
