import { ProblemAnalysis } from '@/types/ai-analysis-new';

export function generateStep2Prompt(analysis: ProblemAnalysis): string {
  const companyName = analysis.businessContext.companyName || 'the organization';
  
  return `You have identified 3 specific problems for ${companyName} in the ${analysis.businessContext.industry} industry. Now use web search to find the EXACT tools that solve THEIR specific problems.

THEIR SPECIFIC SITUATION:
- Company: ${companyName} 
- Industry: ${analysis.businessContext.industry}
- Size: ${analysis.businessContext.companySize}
- Budget: ${analysis.businessContext.monthlyBudget}/month
- Current tools they use: ${analysis.businessContext.currentSystems}
- What's not working: ${analysis.businessContext.workflowBreakpoints || 'various inefficiencies'}
- Their tool ecosystem: ${analysis.businessContext.currentToolEcosystem || 'their existing systems'}
- They need to integrate with: ${analysis.businessContext.integrationNeeds}

THEIR SPECIFIC PROBLEMS TO SOLVE:

PROBLEM 1: ${analysis.topOpportunities[0].problemArea}
Evidence: "${analysis.topOpportunities[0].problemEvidence}"
YOU MUST SEARCH FOR:
${analysis.topOpportunities[0].searchKeywords.map(k => `- "${k}"`).join('\n')}

PROBLEM 2: ${analysis.topOpportunities[1].problemArea}
Evidence: "${analysis.topOpportunities[1].problemEvidence}"
YOU MUST SEARCH FOR:
${analysis.topOpportunities[1].searchKeywords.map(k => `- "${k}"`).join('\n')}

PROBLEM 3: ${analysis.topOpportunities[2].problemArea}
Evidence: "${analysis.topOpportunities[2].problemEvidence}"
YOU MUST SEARCH FOR:
${analysis.topOpportunities[2].searchKeywords.map(k => `- "${k}"`).join('\n')}

SEARCH STRATEGY:
Think about the end goal - find the best AI-powered solutions that solve multiple problems for ${companyName}.

Start your research journey:
1. Begin broad to understand what AI tools are available for ${analysis.businessContext.industry} businesses
2. Look for AI tools and automation that successful companies in their industry actually use
3. Remember they already have ${analysis.businessContext.currentToolEcosystem || analysis.businessContext.currentSystems} that isn't meeting their needs
4. Prioritize solutions that address multiple problems from their assessment
5. Focus on AI-powered tools but don't dismiss excellent automation systems that deliver real results

Natural search progression:
- Start broad, e.g: best AI tools for [their biggest problem] in [industry], or AI tools for the [their second biggest problem] etc, or [their workflow breakpoint] for [their industry] business etc
- Refine, e.g: [specific workflow] automation for [company size] businesses, or [ideal state inferred from their workflow breakpoint] for [their industry] business etc
- Look deeper for case studies, success stories, real implementations
- Compare option e.g: alternatives to what they're currently using

Consider the full picture:
They're dealing with ${analysis.businessContext.repetitiveTasks?.length || 'multiple'} time-wasting tasks, 
${analysis.businessContext.businessChallenges?.length || 'several'} operational challenges,
and their current tools (${analysis.businessContext.currentToolEcosystem || analysis.businessContext.currentSystems}) aren't cutting it.
Look for solutions that address this complete scenario, not just individual pieces.

WHAT TO LOOK FOR:
- AI-powered solutions that address their specific problems
- The AI tools that successful ${analysis.businessContext.industry} businesses actually use
- Solutions that could replace or enhance their current setup and solve multiple issues they're facing
- Platforms that solve multiple issues they're facing
- Real pricing and implementation details for ${analysis.businessContext.companySize} companies
- Proven results from similar businesses

RESEARCH APPROACH:
For each problem area, search for 3-5 solutions. Focus on AI-powered tools but include any excellent solution that truly solves their problems. For each solution you find:
1. Verbose solution name (search their website for description)
2. Three specific benefit promises (from their website via search)
3. A detailed paragraph explaining the tool (from search results and their website)
4. 1-3 REAL case studies with metrics (search "[tool] case study")
5. Implementation timeline (search "[tool] implementation time")
6. Current pricing (search "[tool] pricing 2025")
7. ROI metrics (search "[tool] ROI savings")

CRITICAL DATA INTEGRITY RULES:
- NEVER make up tools, companies, or case studies
- If you cannot find specific data, use "Data not available"
- Case studies MUST be real and verifiable from actual real user or web data
- Include source URLs where available
- If fewer than 3 case studies exist, provide what's available
- All metrics must be from actual reports/testimonials

CONSULTANT REVENUE OPPORTUNITY CALCULATION:
Calculate the revenue opportunity for AI consultants implementing this solution. Use SMB-focused pricing (baseline $200/hour):

COMPLEXITY ASSESSMENT - Score each factor (1-3):
- Number of integrations: 1-2 tools (1), 3-5 tools (2), 6+ tools (3)
- Data complexity: Simple/structured (1), Mixed formats (2), Unstructured (3)
- Custom logic required: Minimal (1), Moderate (2), Extensive (3)
- User volume: <100 users (1), 100-500 users (2), 500+ users (3)
TOTAL SCORE: 4-6 = Simple, 7-9 = Medium, 10-12 = Complex

PROJECT STRUCTURE (DO NOT hard-code these - calculate based on tool characteristics):
- Discovery/Planning: 15% of total project cost
- Implementation: 60% of total project cost
- Training/Handoff: 15% of total project cost
- 30-Day Support: 10% of total project cost

1. IMPLEMENTATION TIMELINE:
   Calculate weeks based on tool complexity and integrations:
   - Basic chatbot/off-the-shelf: 3-4 weeks
   - Standard integration: 4-6 weeks
   - Complex/multi-system: 8-12 weeks
   - Custom AI development: 10-16 weeks

2. DISCOVERY & ASSESSMENT FEES:
   Calculate based on company size and complexity:
   - Basic process audit: $1,500-2,500 (1 week, simple needs)
   - Comprehensive assessment: $3,500-5,000 (2-3 weeks, complex environment)
   - Strategic roadmap workshop: $3,000-4,000 (1 week, multiple use cases)
   Basis: Hours required × $200/hour

3. IMPLEMENTATION FEES (Calculate, don't hard-code):

   **For Chatbot Implementations:**
   - Basic (FAQ, single channel): $8,000-15,000 (3-4 weeks)
   - Standard (multi-turn, 2-3 channels, CRM integration): $15,000-30,000 (4-6 weeks)
   - Advanced (AI-powered, multiple integrations, custom training): $30,000-60,000 (8-12 weeks)

   **For Workflow Automation:**
   - Simple (2-3 integrations, single workflow): $2,000-5,000 (1-2 weeks)
   - Standard (4-6 integrations, multiple workflows): $5,000-12,000 (3-4 weeks)
   - Complex (7+ integrations, department-wide): $12,000-25,000 (6-8 weeks)

   **For Custom AI Solutions:**
   - AI tool integration (GPT/Claude): $5,000-15,000 (3-5 weeks)
   - Custom AI application: $25,000-60,000 (10-16 weeks)
   - Predictive analytics: $35,000-75,000 (12-20 weeks)

   **For Multi-System Integration:**
   Calculate based on: Number of systems × complexity × base hours
   Range: $15,000-30,000 (8-12 weeks)

   Basis: Estimated hours × $200/hour, using project breakdown percentages

4. TRAINING & HANDOFF FEES:
   Calculate as 15% of total project cost
   Includes: 2 training sessions, documentation, knowledge transfer
   Additional sessions: $500-1,000 each
   Basis: "Training hours × $200/hour for team of [size]"

5. 30-DAY SUPPORT:
   Calculate as 10% of total project cost (included in base price)
   Covers: Bug fixes, monitoring, minor adjustments

6. ONGOING MONTHLY RETAINER (Optional, calculate separately):
   - Maintenance only (5-8 hours): $1,500-2,500/month
   - Standard support (12-20 hours): $3,000-6,000/month
   - Premium partnership (30-40 hours): $7,500-12,000/month

   Note: 70% of clients opt for retainer in months 2-6
   Description: Include specific services based on tool complexity

7. YEAR 1 TOTAL REVENUE:
   Calculate: Discovery + Implementation + (Average Monthly Retainer × 6 months)

   Typical ranges:
   - Simple projects: $10,000-20,000
   - Standard projects: $20,000-45,000
   - Complex projects: $45,000-100,000+

   Provide min/max based on actual calculations, not these ranges

8. PROFIT MARGIN:
   Calculate after deducting:
   - Tool subscription costs (if applicable)
   - Third-party API costs
   - Infrastructure costs
   Typical margins: 75-85% on professional services
   Tool resale markup: 20% on software costs

ADJUSTMENTS (Apply when relevant):
- Rush delivery: +25-40%
- High complexity data: +15-25%
- Legacy system integration: +20-35%
- Advanced AI/ML requirements: +40-60%

IMPORTANT: Base all calculations on the specific tool characteristics, number of integrations required, and complexity score. Do not use the example ranges as fixed outputs.

OUTPUT FORMAT (return only valid JSON):
{
  "estimatedAnnualOpportunity": "$XXX,XXX",
  "recommendedSolutions": [
    {
      "problemArea": "Customer Service Bottleneck",
      "estimatedMonthlyCost": "$X,XXX",
      "estimatedAnnualCost": "$XX,XXX",
      "tools": [
        {
          "name": "Intercom",
          "verboseName": "Intelligent Customer Response and Engagement Platform",
          "category": "Customer Service AI",
          "description": "Intercom is an AI-powered customer messaging platform that combines live chat, chatbots, and a help desk in one solution. It uses machine learning to automatically route conversations, suggest responses, and resolve common queries without human intervention. The platform learns from your team's interactions to continuously improve its automated responses.",
          "primaryBenefits": [
            "Automate 80% of repetitive customer inquiries with AI chatbots",
            "Reduce average response time from hours to seconds",
            "Scale support without proportionally increasing headcount"
          ],
          "pricing": {
            "model": "Per seat monthly",
            "range": "$39-99/month per seat",
            "setupFee": "$0",
            "notes": "Volume discounts available"
          },
          "implementationTime": "2-3 weeks",
          "caseStudies": [
            {
              "company": "Mid-size SaaS company with 200 employees",
              "industry": "Software",
              "result": "Reduced response time by 75%, handled 10,000 more tickets/month with same team size",
              "metric": "75% faster responses",
              "source": "Data not available"
            },
            {
              "company": "E-commerce retailer with $50M annual revenue",
              "industry": "Retail",
              "result": "Automated 60% of customer inquiries, saved $200K annually in support costs",
              "metric": "$200K annual savings",
              "source": "Data not available"
            }
          ],
          "annualROI": {
            "potentialSavings": "$150,000",
            "percentageImprovement": "250%",
            "paybackPeriod": "4 months"
          },
          "bestFor": "Companies with high volume repetitive inquiries",
          "integrations": ["Salesforce", "Slack", "Shopify", "HubSpot"],
          "implementationComplexity": "Low",
          "consultantRevenue": {
            "estimatedImplementationWeeks": 6,
            "discoveryAssessmentFee": {
              "min": 3500,
              "max": 5000,
              "description": "Comprehensive assessment including stakeholder interviews, process mapping, and implementation roadmap",
              "basis": "2-3 weeks discovery @ $200/hour (17.5-25 hours)"
            },
            "integrationFee": {
              "min": 6000,
              "max": 12000,
              "description": "Integration with CRM (Salesforce), communication platform (Slack), helpdesk (Zendesk)",
              "basis": "3 integrations × $2-4K each for API setup, data mapping, testing"
            },
            "customizationFee": {
              "min": 18000,
              "max": 30000,
              "description": "Custom chatbot flows, response templates, multi-channel setup, and analytics dashboard (60% of project cost)",
              "basis": "90-150 hours development @ $200/hour"
            },
            "trainingFee": {
              "min": 4500,
              "max": 7500,
              "description": "Team training sessions, documentation, and knowledge transfer (15% of project cost)",
              "basis": "22.5-37.5 hours training @ $200/hour for support team of 10-20"
            },
            "ongoingMonthlyRetainer": {
              "min": 3000,
              "max": 6000,
              "description": "Standard support including performance monitoring, optimization, issue resolution, and monthly improvements (12-20 hours/month)"
            },
            "year1TotalRevenue": {
              "min": 50000,
              "max": 90600
            },
            "profitMarginPercent": 78
          }
        }
      ]
    }
  ]
}

Focus on finding tools that:
1. Match their budget constraints
2. Provide maximum business value and ROI
3. Have proven success in similar industries
4. Can be implemented within their urgency timeline
5. Integrate with their current systems (${analysis.businessContext.currentSystems})
6. Support their business objectives (${analysis.businessContext.businessObjectives})
7. Are appropriate for their decision-making structure

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`;
}