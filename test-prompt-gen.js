// Test prompt generation
const { generateStep1Prompt } = require('./src/prompts/step1-problem-analysis.ts');

const testResponses = {
  industry: 'Digital marketing agency',
  efficiencyRating: 'gaps',
  companySize: 'small',
  repetitiveTasks: ['data-entry', 'email-management', 'marketing-content', 'invoice-billing'],
  weeklyTimeBreakdown: 'Data entry between CRM and spreadsheets: 8 hours/week by admin staff. Creating invoices: 4 hours/week. Writing marketing content: 12 hours/week by marketing team. Customer service emails: 10 hours/week. Lead qualification calls: 6 hours/week by sales.',
  businessChallenges: ['slow-responses', 'too-much-manual-work', 'operational-chaos', 'cant-track-performance'],
  monthlyCostBreakdown: 'Manual errors in invoicing: ~£800/month in corrections and refunds. Missed leads from slow follow-up: 4-5 deals worth £2,000 each. Undercharging clients: estimate 15% below market rates. Staff overtime: £1,200/month. Lost productivity from context switching: estimate 20% efficiency loss.',
  currentSystems: 'some-tools',
  moneyLeaks: ['manual-errors', 'missed-opportunities', 'slow-processes', 'inefficient-pricing'],
  desiredOutcome: ['scale-capacity', 'real-time-insights'],
  teamCapability: 'moderately-comfortable',
  monthlyBudget: '2000-5000',
  timeline: 'within-month'
};

try {
  const prompt = generateStep1Prompt(testResponses, 'Test Digital Agency');
  console.log('✅ Prompt generated successfully');
  console.log('   Length:', prompt.length, 'characters');
  console.log('\nFirst 500 characters of prompt:');
  console.log(prompt.substring(0, 500));
} catch (error) {
  console.error('❌ Failed to generate prompt:', error);
}