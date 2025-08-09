require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function checkQuizData() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: { autoRefreshToken: false, persistSession: false },
      db: { schema: 'public' }
    }
  );

  const { data: quizzes } = await supabase
    .from('quiz_responses')
    .select('*')
    .limit(3);

  console.log('Sample quiz responses:');
  quizzes.forEach((quiz, i) => {
    console.log(`\n=== Quiz ${i + 1} ===`);
    console.log('ID:', quiz.id);
    console.log('Responses type:', typeof quiz.responses);
    console.log('Responses:', JSON.stringify(quiz.responses, null, 2).substring(0, 500));
    
    if (quiz.responses) {
      console.log('Keys:', Object.keys(quiz.responses));
      console.log('Has industry?', 'industry' in quiz.responses);
      console.log('Industry value:', quiz.responses.industry);
    }
  });
}

checkQuizData().catch(console.error);