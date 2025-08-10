require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function checkSpecificQuiz() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  // Check the quiz that worked
  const workingQuizId = '9f2fa5af-27b0-4e7b-838f-e506f33caefb';
  
  const { data: quiz } = await supabase
    .from('quiz_responses')
    .select('*')
    .eq('id', workingQuizId)
    .single();

  console.log('Working quiz data:');
  console.log('ID:', quiz.id);
  console.log('Responses:', JSON.stringify(quiz.responses, null, 2));
  console.log('\nKeys:', Object.keys(quiz.responses));
}

checkSpecificQuiz().catch(console.error);