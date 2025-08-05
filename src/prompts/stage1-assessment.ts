import { QuizResponseData, ScoreCalculation } from '@/types/quiz';
import { formatResponseForDisplay } from '@/utils/scoring';
import quizData from '@/data/quiz-questions.json';

export function generateStage1SystemPrompt(): string {
  return `You are an AI transformation expert analyzing company readiness for AI adoption. 
Your role is to provide a comprehensive assessment based on quiz responses.

Focus on:
1. Current state analysis
2. Key strengths and gaps
3. Industry-specific insights
4. Practical recommendations
5. Risk factors and mitigation strategies

Be specific, actionable, and realistic. Avoid generic advice.
Use a professional but approachable tone.
Format your response in clean markdown with clear sections.`;
}

export function generateStage1UserPrompt(
  responses: QuizResponseData,
  scoreResult: ScoreCalculation
): string {
  // Format all responses for the prompt
  const formattedResponses = quizData.questions
    .map((question) => {
      const response = responses[question.id as keyof QuizResponseData];
      if (response === undefined || response === null) return null;

      const formattedValue = formatResponseForDisplay(question.id, response);
      return `**${question.title}**: ${formattedValue}`;
    })
    .filter(Boolean)
    .join('\n');

  return `Please analyze this company's AI readiness assessment:

## Assessment Score
- Total Score: ${scoreResult.totalScore}/85
- Category: ${scoreResult.category}

## Company Responses
${formattedResponses}

## Additional Context
- Industry: ${responses.industry}
- Company Size: ${responses.companySize}
- Primary Objectives: ${formatResponseForDisplay('businessObjectives', responses.businessObjectives)}
- Key Challenges: ${formatResponseForDisplay('biggestChallenge', responses.biggestChallenge)}

Please provide a comprehensive AI readiness assessment with:

1. **Executive Summary** (2-3 paragraphs)
   - Overall readiness level
   - Key findings
   - Strategic recommendations

2. **Strengths Analysis**
   - Current capabilities that support AI adoption
   - Competitive advantages
   - Foundation elements in place

3. **Gap Analysis**
   - Critical missing elements
   - Infrastructure needs
   - Skill gaps
   - Process improvements needed

4. **Industry-Specific Insights**
   - How their readiness compares to industry standards
   - Sector-specific opportunities
   - Regulatory considerations

5. **Risk Assessment**
   - Potential implementation challenges
   - Common pitfalls to avoid
   - Mitigation strategies

6. **Recommended Next Steps**
   - Immediate actions (0-3 months)
   - Short-term goals (3-6 months)
   - Long-term strategy (6-12 months)

7. **ROI Potential**
   - Expected impact areas
   - Timeline for value realization
   - Key metrics to track

Ensure your analysis is specific to their responses and provides actionable insights.`;
}

export function generateStage1AnalysisPrompt(
  responses: QuizResponseData,
  scoreResult: ScoreCalculation
): string {
  return `${generateStage1UserPrompt(responses, scoreResult)}

Additional analysis requirements:
- Highlight quick wins based on their current state
- Identify potential partnerships or vendor solutions
- Consider their budget constraints (${responses.budget || 'Not specified'})
- Factor in their timeline expectations (${responses.timeline || 'Not specified'})
- Address change management needs based on company size`;
}