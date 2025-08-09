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

CRITICAL SEARCH INSTRUCTIONS:
1. DO NOT default to generic tools like Zapier/Make.com unless they SPECIFICALLY solve the EXACT problem identified
2. Search for tools that are SPECIFIC to their industry: ${analysis.businessContext.industry}
3. If they need "appointment scheduling for dental clinics", don't recommend "Zapier" - find "Dentrix" or "SimplePractice"
4. If they need "restaurant inventory tracking", don't recommend "Make.com" - find "MarketMan" or "BlueCart"
5. Search for: "[exact problem] software ${analysis.businessContext.industry}"
6. Search for: "${analysis.businessContext.industry} [specific workflow] automation tools"
7. Look for tools that ALREADY integrate with: ${analysis.businessContext.currentSystems}

FOR EACH PROBLEM, FIND:
- Tools built SPECIFICALLY for their industry (not generic automation platforms)
- Tools that solve their EXACT workflow (not just "automation")
- Real pricing for THEIR company size (${analysis.businessContext.companySize})
- Case studies from similar ${analysis.businessContext.industry} businesses
- Tools that work with their tech level (${analysis.businessContext.techCapability})

RESEARCH REQUIREMENTS:
For each problem area, USE WEB SEARCH to find 3-5 real AI tools. For EACH tool, SEARCH FOR:
1. Verbose solution name (search their website for description)
2. Three specific benefit promises (from their website via search)
3. A detailed paragraph explaining the tool (from search results)
4. 1-3 REAL case studies with metrics (search "[tool] case study")
5. Implementation timeline (search "[tool] implementation time")
6. Current pricing (search "[tool] pricing 2025")
7. ROI metrics (search "[tool] ROI savings")

CRITICAL DATA INTEGRITY RULES:
- NEVER make up tools, companies, or case studies
- If you cannot find specific data, use "Data not available"
- Case studies MUST be real and verifiable
- Include source URLs where available
- If fewer than 3 case studies exist, provide what's available
- All metrics must be from actual reports/testimonials

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
          "implementationComplexity": "Low"
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