import { QuizResponseData } from '@/types/quiz';
import quizData from '@/data/quiz-questions.json';

export function generateStep1Prompt(responses: QuizResponseData, companyName?: string | null): string {
  // Handle missing or incomplete responses
  if (!responses || Object.keys(responses).length === 0) {
    throw new Error('Quiz responses are empty or missing');
  }

  // Parse quantification data - handle both text and JSON formats
  let weeklyTimeBreakdown = '';
  let monthlyCostBreakdown = '';
  
  // Handle weeklyTimeBreakdown - could be string or JSON object
  if (typeof responses.weeklyTimeBreakdown === 'object' && responses.weeklyTimeBreakdown !== null) {
    // Convert JSON metrics to readable text
    const timeData = responses.weeklyTimeBreakdown as Record<string, string>;
    const timeItems: string[] = [];
    
    for (const [taskId, timeRange] of Object.entries(timeData)) {
      if (taskId === '_notes') continue; // Skip notes field
      if (!timeRange || timeRange === 'none') continue;
      
      // Get task label from quiz data
      const task = quizData.questions
        .find(q => q.id === 'repetitiveTasks')
        ?.options?.find(opt => opt.value === taskId);
      const taskLabel = task?.label || taskId;
      
      // Convert natural language range to specific hours for calculation
      let hours = '0';
      switch(timeRange) {
        case 'none': hours = '0 hours'; break;
        case '<10hrs': hours = '8 hours'; break; // Conservative estimate
        case '10-40hrs': hours = '25 hours'; break; // Mid-point
        case '40-120hrs': hours = '80 hours'; break; // 2 people mid-point
        case '120-400hrs': hours = '260 hours'; break; // 6.5 people mid-point
        case '400-1000hrs': hours = '700 hours'; break; // 17.5 people mid-point
        case '1000+hrs': hours = '1200 hours'; break; // 30 people estimate
        default: hours = timeRange;
      }
      
      timeItems.push(`${taskLabel}: ${hours}/week`);
    }
    
    if (timeData._notes) {
      timeItems.push(`Additional context: ${timeData._notes}`);
    }
    
    weeklyTimeBreakdown = timeItems.join('. ') || 'No time data provided';
  } else {
    weeklyTimeBreakdown = responses.weeklyTimeBreakdown || '';
  }
  
  // Handle monthlyCostBreakdown - could be string or JSON object
  if (typeof responses.monthlyCostBreakdown === 'object' && responses.monthlyCostBreakdown !== null) {
    // Convert JSON metrics to readable text
    const costData = responses.monthlyCostBreakdown as Record<string, string>;
    const costItems: string[] = [];
    
    for (const [problemId, costRange] of Object.entries(costData)) {
      if (problemId === '_notes') continue; // Skip notes field
      if (!costRange || costRange === '$0') continue;
      
      // Get problem label from quiz data
      const problem = quizData.questions
        .find(q => q.id === 'businessChallenges')
        ?.options?.find(opt => opt.value === problemId);
      const problemLabel = problem?.label || problemId;
      
      // Convert cost range to specific value for calculations
      let costValue = costRange;
      switch(costRange) {
        case '$0': costValue = '$0'; break;
        case '<$2k': costValue = '$1,500'; break;
        case '$2-10k': costValue = '$6,000'; break;
        case '$10-50k': costValue = '$30,000'; break;
        case '$50-200k': costValue = '$125,000'; break;
        case '$200-500k': costValue = '$350,000'; break;
        case '$500k+': costValue = '$750,000'; break;
        default: costValue = costRange;
      }
      
      costItems.push(`${problemLabel}: ${costValue}/month`);
    }
    
    if (costData._notes) {
      costItems.push(`Additional context: ${costData._notes}`);
    }
    
    monthlyCostBreakdown = costItems.join('. ') || 'No cost data provided';
  } else {
    monthlyCostBreakdown = responses.monthlyCostBreakdown || '';
  }
  
  const quizJson = {
    companyName: companyName || 'Your Organization',
    industry: responses.industry || 'not specified',
    companySize: responses.companySize || 'not specified',
    monthlyBudget: responses.monthlyBudget || 'not specified',
    timeline: responses.timeline || 'not specified',
    // Core questions
    efficiencyRating: responses.efficiencyRating || 'not specified',
    repetitiveTasks: responses.repetitiveTasks || [],
    // NEW quantification fields
    weeklyTimeBreakdown: weeklyTimeBreakdown,
    businessChallenges: responses.businessChallenges || [],
    monthlyCostBreakdown: monthlyCostBreakdown,
    // Modified field - now single value
    currentSystems: responses.currentSystems || 'not specified',
    // Remaining fields
    moneyLeaks: responses.moneyLeaks || [],
    desiredOutcome: responses.desiredOutcome || [],
    teamCapability: responses.teamCapability || 'not specified',
    // Old fields (may be undefined from old data)
    customerExperienceIssues: responses.customerExperienceIssues || [],
    growthBottlenecks: responses.growthBottlenecks || [],
    pastAttempts: responses.pastAttempts || [],
    additionalContext: responses.additionalContext || 'none provided'
  };

  return `Deeply analyze this business assessment with CONCRETE QUANTIFICATION. Think carefully about their SPECIFIC situation and the TIME/COST data they provided.

THEIR ACTUAL RESPONSES WITH QUANTIFICATION:
${JSON.stringify(quizJson, null, 2)}

CRITICAL QUANTIFICATION DATA TO EXTRACT:

TIME COSTS (from weeklyTimeBreakdown):
"${weeklyTimeBreakdown}"
Extract specific hours per week for each task mentioned. Calculate monthly hours (weekly x 4.3).
If they mention staff doing tasks, calculate labor cost at $30-50/hour depending on role.

FINANCIAL COSTS (from monthlyCostBreakdown):
"${monthlyCostBreakdown}"
Extract specific monthly costs for each problem. Look for:
- Direct costs (e.g., "£500/month in corrections")
- Lost opportunities (e.g., "2-3 clients worth £1,000 each")
- Inefficiencies (e.g., "undercharging by 10%")

YOUR TASK:
Based on their QUANTIFIED data:
- Business efficiency rating: ${JSON.stringify(responses.efficiencyRating || 'not specified')}
- TIME they waste on: ${JSON.stringify(weeklyTimeBreakdown)}
- MONEY they're losing on: ${JSON.stringify(monthlyCostBreakdown)}
- Operational challenges: ${JSON.stringify(responses.businessChallenges || [])}
- Where they think money is leaking: ${JSON.stringify(responses.moneyLeaks || [])}
- Current systems: ${JSON.stringify(responses.currentSystems || 'not specified')}
- Desired outcomes: ${JSON.stringify(responses.desiredOutcome || [])}

Now identify their 3 BIGGEST, MOST EXPENSIVE problems using THEIR NUMBERS. Be SPECIFIC with quantification.

Example: If they said "Data entry: 6 hours/week", calculate:
- 6 hours/week = 26 hours/month
- At $40/hour = $1,040/month labor cost
- Annual cost = $12,480

OUTPUT FORMAT (return only valid JSON):
{
  "businessContext": {
    "companyName": ${JSON.stringify(companyName || 'Your Organization')},
    "industry": ${JSON.stringify(responses.industry || 'not specified')},
    "companySize": ${JSON.stringify(responses.companySize || 'not specified')}, 
    "monthlyBudget": ${JSON.stringify(responses.monthlyBudget || 'not specified')},
    "urgency": ${JSON.stringify(responses.timeline || 'not specified')},
    "techCapability": ${JSON.stringify(responses.teamCapability || 'not specified')},
    "currentSystems": ${JSON.stringify(responses.currentSystems || 'not specified')},
    "businessObjectives": "Based on their responses, infer their main business goals",
    "integrationNeeds": "What systems they need to integrate with based on currentSystems"
  },
  "topOpportunities": [
    {
      "problemArea": "The EXACT problem with TIME QUANTIFICATION. E.g., 'Staff spending 26 hours/month on manual data entry between ${responses.currentSystems || 'systems'}'",
      "monthlyTimeCost": "Extract from weeklyTimeBreakdown. E.g., '26 hours/month'",
      "monthlyFinancialCost": "Calculate or extract from monthlyCostBreakdown. E.g., '$1,040/month in labor costs'",
      "annualCost": "Multiply monthly by 12. E.g., '$12,480/year'",
      "aiSolutionType": "SPECIFIC type of solution for this exact problem",
      "problemEvidence": "Direct quote from their weeklyTimeBreakdown or monthlyCostBreakdown showing this problem",
      "searchKeywords": [
        "Very specific search terms including their industry and quantified problem",
        "Include their current systems that need integration: ${responses.currentSystems || 'their systems'}",
        "Search for automation that saves X hours per week",
        "Search for '[their exact workflow] automation [their industry] [company size]'"
      ],
      "expectedOutcome": "Specific, measurable improvement. E.g., 'Reduce 26 hours/month to 2 hours/month, saving $960/month'"
    }
  ]
}

CRITICAL RULES:
1. ALWAYS use their actual numbers from weeklyTimeBreakdown and monthlyCostBreakdown
2. If they didn't provide specific numbers, estimate based on industry standards but note it's an estimate
3. Calculate annual costs by multiplying monthly costs by 12
4. For time costs, assume $30-50/hour depending on the task complexity
5. Make search keywords VERY specific to their quantified problems

Think about THIS business with THESE specific costs. What makes THEIR situation unique based on the numbers they provided?

CRITICAL: Return ONLY the JSON object. Start with { and end with }`
}