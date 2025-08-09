require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const reportId = '945de120-088b-4fd6-85c1-5542ea00dbe9';

async function testDirectSupabase() {
  console.log('=== DIRECT SUPABASE TEST ===');
  console.log('Report ID:', reportId);
  console.log('URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('Service key exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  console.log('Service key length:', process.env.SUPABASE_SERVICE_ROLE_KEY?.length);

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Missing environment variables!');
    return;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      db: {
        schema: 'public'
      }
    }
  );

  try {
    // Step 1: Read current state
    console.log('\n=== STEP 1: READ CURRENT STATE ===');
    const { data: before, error: beforeError } = await supabase
      .from('ai_reports')
      .select('*')
      .eq('id', reportId)
      .single();

    if (beforeError) {
      console.error('Error reading report:', beforeError);
      return;
    }

    console.log('Report found!');
    console.log('Current stage1_problem_analysis:', before.stage1_problem_analysis);
    console.log('Current stage2_tool_research:', before.stage2_tool_research);
    console.log('Current industry_context:', before.industry_context);

    // Step 2: Update with test data
    console.log('\n=== STEP 2: UPDATE WITH TEST DATA ===');
    const testData = {
      test: 'Direct Node.js test',
      timestamp: new Date().toISOString(),
      nested: { value: 123 }
    };
    console.log('Test data:', testData);

    const { data: updateResult, error: updateError } = await supabase
      .from('ai_reports')
      .update({
        stage1_problem_analysis: testData,
        industry_context: 'NODEJS TEST ' + Date.now(),
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId)
      .select('*')
      .single();

    if (updateError) {
      console.error('Update error:', updateError);
      return;
    }

    console.log('Update successful!');
    console.log('Returned stage1_problem_analysis:', updateResult.stage1_problem_analysis);
    console.log('Returned industry_context:', updateResult.industry_context);

    // Step 3: Verify persistence
    console.log('\n=== STEP 3: VERIFY PERSISTENCE ===');
    await new Promise(resolve => setTimeout(resolve, 500));

    const { data: after, error: afterError } = await supabase
      .from('ai_reports')
      .select('stage1_problem_analysis, industry_context, updated_at')
      .eq('id', reportId)
      .single();

    if (afterError) {
      console.error('Verification error:', afterError);
      return;
    }

    console.log('After verification:');
    console.log('stage1_problem_analysis:', after.stage1_problem_analysis);
    console.log('industry_context:', after.industry_context);
    console.log('Updated timestamp:', after.updated_at);

    // Results
    console.log('\n=== RESULTS ===');
    console.log('String field (industry_context) updated:', after.industry_context?.includes('NODEJS TEST'));
    console.log('JSONB field (stage1_problem_analysis) updated:', !!after.stage1_problem_analysis);
    console.log('JSONB data matches test data:', JSON.stringify(after.stage1_problem_analysis) === JSON.stringify(testData));

  } catch (error) {
    console.error('Test error:', error);
  }
}

testDirectSupabase();