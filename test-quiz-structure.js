// Test script to verify quiz structure
const quizData = require('./src/data/quiz-questions.json');

console.log('\n========================================');
console.log('QUIZ STRUCTURE VERIFICATION');
console.log('========================================\n');

console.log(`Total questions: ${quizData.questions.length}`);
console.log('Expected: 13\n');

console.log('Question breakdown:');
console.log('----------------------------------------');

quizData.questions.forEach(q => {
  console.log(`Q${q.questionNumber}: ${q.id} (${q.type})`);
  console.log(`    "${q.title.substring(0, 60)}..."`);
  
  // Highlight the new questions
  if ([5, 6, 7].includes(q.questionNumber)) {
    console.log(`    ⭐ NEW QUESTION - Type: ${q.type}`);
  }
  
  // Check for required fields
  if (!q.id || !q.title || !q.type || !q.questionNumber) {
    console.log(`    ❌ MISSING FIELDS!`);
  }
});

console.log('\n----------------------------------------');
console.log('NEW QUESTIONS DETAIL:');
console.log('----------------------------------------');

const newQuestions = [5, 6, 7];
newQuestions.forEach(num => {
  const q = quizData.questions.find(question => question.questionNumber === num);
  if (q) {
    console.log(`\nQuestion ${num}: ${q.id}`);
    console.log(`Type: ${q.type}`);
    console.log(`Title: ${q.title}`);
    console.log(`Required: ${q.required}`);
    if (q.type === 'multi-select') {
      console.log(`Options: ${q.options.length} choices`);
    }
    if (q.type === 'textarea') {
      console.log(`Max length: ${q.maxLength}`);
    }
  } else {
    console.log(`\n❌ Question ${num} NOT FOUND!`);
  }
});

console.log('\n========================================\n');