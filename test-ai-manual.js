require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');

const reportId = '945de120-088b-4fd6-85c1-5542ea00dbe9';

async function manualAITest() {
  console.log('=== MANUAL AI PROCESSING TEST ===');
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  // Get quiz data
  const { data: report } = await supabase
    .from('ai_reports')
    .select('*, quiz_responses!inner(*)')
    .eq('id', reportId)
    .single();

  console.log('Quiz data found:', !!report.quiz_responses);
  console.log('Current stage1:', report.stage1_problem_analysis);

  // Generate the prompt
  const quizData = report.quiz_responses.responses;
  const prompt = `You are an AI business consultant. Analyze this assessment and identify the top 3 AI opportunity areas for tool research.

ASSESSMENT DATA:
${JSON.stringify(quizData, null, 2)}

ANALYSIS INSTRUCTIONS:
1. Identify the 3 biggest problems/opportunities based on their responses
2. For each, determine the specific AI solution category needed  
3. Extract key business context for tool research

OUTPUT FORMAT (return only valid JSON):
{
  "businessContext": {
    "industry": "specific industry from responses",
    "companySize": "employee count range", 
    "monthlyBudget": "budget range from responses",
    "urgency": "timeline from responses",
    "techCapability": "team skill level"
  },
  "topOpportunities": [
    {
      "problemArea": "Customer Service Bottleneck",
      "aiSolutionType": "customer-service-chatbots",
      "problemEvidence": "Takes next business day to respond, customers often wait too long",
      "searchKeywords": ["customer service AI", "business chatbots", "[industry] customer support automation"],
      "expectedOutcome": "Reduce response time from days to minutes"
    }
  ]
}

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON.`;

  console.log('\nCalling Claude...');
  
  const anthropic = new Anthropic.Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    temperature: 0.2,
    messages: [
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  const content = response.content[0].text;
  console.log('\nClaude response length:', content.length);
  console.log('First 100 chars:', content.substring(0, 100));

  // Parse the response
  let parsed;
  try {
    // Try direct parse first
    parsed = JSON.parse(content.trim());
  } catch (e) {
    // Clean and try again
    let cleaned = content.trim();
    cleaned = cleaned.replace(/^```(?:json)?\s*/gm, '');
    cleaned = cleaned.replace(/```\s*$/gm, '');
    
    const jsonStart = cleaned.search(/[{[]/);
    if (jsonStart > 0) {
      cleaned = cleaned.substring(jsonStart);
    }
    
    const lastClose = Math.max(cleaned.lastIndexOf('}'), cleaned.lastIndexOf(']'));
    if (lastClose > -1 && lastClose < cleaned.length - 1) {
      cleaned = cleaned.substring(0, lastClose + 1);
    }
    
    parsed = JSON.parse(cleaned);
  }

  console.log('\nParsed data keys:', Object.keys(parsed));
  console.log('Has businessContext:', !!parsed.businessContext);
  console.log('Has topOpportunities:', !!parsed.topOpportunities);

  // Now update the database
  console.log('\nUpdating database...');
  const { data: updated, error: updateError } = await supabase
    .from('ai_reports')
    .update({
      stage1_problem_analysis: parsed,
      report_status: 'stage1_complete',
      updated_at: new Date().toISOString()
    })
    .eq('id', reportId)
    .select('id, stage1_problem_analysis, report_status')
    .single();

  if (updateError) {
    console.error('Update error:', updateError);
    return;
  }

  console.log('\nUpdate successful!');
  console.log('Status:', updated.report_status);
  console.log('Data saved:', !!updated.stage1_problem_analysis);

  // Verify persistence
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const { data: final } = await supabase
    .from('ai_reports')
    .select('stage1_problem_analysis')
    .eq('id', reportId)
    .single();

  console.log('\n=== FINAL VERIFICATION ===');
  console.log('Data persisted:', !!final.stage1_problem_analysis);
  console.log('Business context:', final.stage1_problem_analysis?.businessContext);
  console.log('Number of opportunities:', final.stage1_problem_analysis?.topOpportunities?.length);
}

manualAITest().catch(console.error);