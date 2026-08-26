"use strict";exports.id=4484,exports.ids=[4484],exports.modules={4484:(e,t,o)=>{o.a(e,async(e,s)=>{try{o.r(t),o.d(t,{executeStep2Research:()=>m,executeStep3Curation:()=>p,executeStep4Generate:()=>d});var n=o(3845),i=o(1661),r=o(789),a=o(4397),l=o(8329),u=o(3851),c=e([u]);async function m({quizResponseId:e,reportId:t,problemAnalysis:o}){console.log("[PIPELINE-STEP2] Starting research"),console.log("[PIPELINE-STEP2] Report ID:",t),console.log("[PIPELINE-STEP2] Quiz Response ID:",e);try{let s=(0,n.p)(),r=u.q.getStepConfig(2),a=u.q.getProvider(r.provider,r.model);console.log(`[PIPELINE-STEP2] Using provider: ${a.getName()}`),console.log(`[PIPELINE-STEP2] Model: ${r.model}`),console.log("[PIPELINE-STEP2] Step config:",JSON.stringify(r)),console.log("[PIPELINE-STEP2] ENV reasoning effort for step 2:",process.env.GPT5_REASONING_EFFORT_STEP2);let c=(0,i.L)(o);console.log("[PIPELINE-STEP2] Generated prompt length:",c.length),console.log("[PIPELINE-STEP2] Using Claude 4 Sonnet for web search");let m=await a.generateWithTools({prompt:c,maxTokens:15e3,tools:[{type:"web_search"}]}),d=(0,l.M)(m.content);console.log("[PIPELINE-STEP2] Parsed research - Solutions count:",d.recommendedSolutions?.length),m.usage&&console.log("[PIPELINE-STEP2] Token usage:",m.usage);let{error:h}=await s.from("ai_reports").update({stage2_tool_research:d,report_status:"stage2_complete",updated_at:new Date().toISOString()}).eq("id",t);if(h)throw console.error("[PIPELINE-STEP2] Failed to save research:",h),h;return console.log("[PIPELINE-STEP2] Research saved successfully"),await p({quizResponseId:e,reportId:t,problemAnalysis:o,toolResearch:d}),{success:!0}}catch(e){return console.error("[PIPELINE-STEP2] Error:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}async function p({quizResponseId:e,reportId:t,problemAnalysis:o,toolResearch:s}){console.log("[PIPELINE-STEP3] Starting curation"),console.log("[PIPELINE-STEP3] Report ID:",t);try{let i=(0,n.p)(),a=u.q.getStepConfig(3),c=u.q.getProvider(a.provider,a.model);console.log(`[PIPELINE-STEP3] Using provider: ${c.getName()}`),console.log(`[PIPELINE-STEP3] Model: ${a.model}`);let m=(0,r.N)(o,s);console.log("[PIPELINE-STEP3] Generated prompt length:",m.length);let p="openai"===a.provider?await c.generateCompletion({prompt:m,temperature:.7,reasoning_effort:a.reasoning_effort,verbosity:a.verbosity}):await c.generateCompletion({prompt:m,maxTokens:4e3,temperature:.7}),h=(0,l.M)(p.content);console.log("[PIPELINE-STEP3] Parsed solutions - internal tools:",h.internalReference?.tools?.length),console.log("[PIPELINE-STEP3] Parsed solutions - client solutions:",h.clientSolution?.implementedSolutions?.length),p.usage&&console.log("[PIPELINE-STEP3] Token usage:",p.usage);let{error:y}=await i.from("ai_reports").update({stage3_tool_selection:h,report_status:"stage3_complete",updated_at:new Date().toISOString()}).eq("id",t);if(y)throw console.error("[PIPELINE-STEP3] Failed to save curation:",y),y;return console.log("[PIPELINE-STEP3] Curation saved successfully"),await d({quizResponseId:e,reportId:t,problemAnalysis:o,toolResearch:s,clientSolution:h.clientSolution}),{success:!0}}catch(e){return console.error("[PIPELINE-STEP3] Error:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}async function d({quizResponseId:e,reportId:t,problemAnalysis:o,toolResearch:s,clientSolution:i}){console.log("[PIPELINE-STEP4] Starting report generation"),console.log("[PIPELINE-STEP4] Report ID:",t);try{let e=(0,n.p)(),s=u.q.getStepConfig(4),r=u.q.getProvider(s.provider,s.model);console.log(`[PIPELINE-STEP4] Using provider: ${r.getName()}`),console.log(`[PIPELINE-STEP4] Model: ${s.model}`);let c=(0,a.p)(o,i);console.log("[PIPELINE-STEP4] Generated prompt length:",c.length);let m="openai"===s.provider?await r.generateCompletion({prompt:c,temperature:.7,reasoning_effort:s.reasoning_effort,verbosity:s.verbosity}):await r.generateCompletion({prompt:c,maxTokens:8e3,temperature:.7}),p=(0,l.M)(m.content);console.log("[PIPELINE-STEP4] Report generated successfully"),m.usage&&console.log("[PIPELINE-STEP4] Token usage:",m.usage);let{error:d}=await e.from("ai_reports").update({stage4_report_content:p,report_status:"completed",report_generated_at:new Date().toISOString(),updated_at:new Date().toISOString()}).eq("id",t);if(d)throw console.error("[PIPELINE-STEP4] Failed to save report:",d),d;console.log("[PIPELINE-STEP4] Report saved successfully");let{data:h,error:y}=await e.from("ai_reports").select(`
        access_token,
        quiz_responses!inner(
          user_email,
          user_first_name,
          user_last_name,
          user_company
        )
      `).eq("id",t).single();if(y||!h)return console.error("[PIPELINE-STEP4] Failed to fetch report for email:",y),{success:!0};let g=Array.isArray(h.quiz_responses)?h.quiz_responses[0]:h.quiz_responses;if(!g?.user_email)return console.error("[PIPELINE-STEP4] No email found for report"),{success:!0};console.log("[PIPELINE-STEP4] Calling email API endpoint for:",g.user_email);try{let e=await fetch("http://localhost:3000/api/reports/send-report-email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reportId:t,userEmail:g.user_email,firstName:g.user_first_name||"",lastName:g.user_last_name||"",company:g.user_company||""})});if(e.ok){let t=await e.json();console.log("[PIPELINE-STEP4] Email sent successfully via API:",t.emailId)}else{let t=await e.text();console.error("[PIPELINE-STEP4] Email API failed:",e.status,t)}}catch(e){console.error("[PIPELINE-STEP4] Error calling email API:",e)}return{success:!0}}catch(e){return console.error("[PIPELINE-STEP4] Error:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}u=(c.then?(await c)():c)[0],s()}catch(e){s(e)}})},1661:(e,t,o)=>{o.d(t,{L:()=>s});function s(e){let t=e.businessContext.companyName||"the organization";return`You have identified 3 specific problems for ${t} in the ${e.businessContext.industry} industry. Now use web search to find the EXACT tools that solve THEIR specific problems.

THEIR SPECIFIC SITUATION:
- Company: ${t} 
- Industry: ${e.businessContext.industry}
- Size: ${e.businessContext.companySize}
- Budget: ${e.businessContext.monthlyBudget}/month
- Current tools they use: ${e.businessContext.currentSystems}
- What's not working: ${e.businessContext.workflowBreakpoints||"various inefficiencies"}
- Their tool ecosystem: ${e.businessContext.currentToolEcosystem||"their existing systems"}
- They need to integrate with: ${e.businessContext.integrationNeeds}

THEIR SPECIFIC PROBLEMS TO SOLVE:

PROBLEM 1: ${e.topOpportunities[0].problemArea}
Evidence: "${e.topOpportunities[0].problemEvidence}"
YOU MUST SEARCH FOR:
${e.topOpportunities[0].searchKeywords.map(e=>`- "${e}"`).join("\n")}

PROBLEM 2: ${e.topOpportunities[1].problemArea}
Evidence: "${e.topOpportunities[1].problemEvidence}"
YOU MUST SEARCH FOR:
${e.topOpportunities[1].searchKeywords.map(e=>`- "${e}"`).join("\n")}

PROBLEM 3: ${e.topOpportunities[2].problemArea}
Evidence: "${e.topOpportunities[2].problemEvidence}"
YOU MUST SEARCH FOR:
${e.topOpportunities[2].searchKeywords.map(e=>`- "${e}"`).join("\n")}

SEARCH STRATEGY:
Think about the end goal - find the best AI-powered solutions that solve multiple problems for ${t}.

Start your research journey:
1. Begin broad to understand what AI tools are available for ${e.businessContext.industry} businesses
2. Look for AI tools and automation that successful companies in their industry actually use
3. Remember they already have ${e.businessContext.currentToolEcosystem||e.businessContext.currentSystems} that isn't meeting their needs
4. Prioritize solutions that address multiple problems from their assessment
5. Focus on AI-powered tools but don't dismiss excellent automation systems that deliver real results

Natural search progression:
- Start broad, e.g: best AI tools for [their biggest problem] in [industry], or AI tools for the [their second biggest problem] etc, or [their workflow breakpoint] for [their industry] business etc
- Refine, e.g: [specific workflow] automation for [company size] businesses, or [ideal state inferred from their workflow breakpoint] for [their industry] business etc
- Look deeper for case studies, success stories, real implementations
- Compare option e.g: alternatives to what they're currently using

Consider the full picture:
They're dealing with ${e.businessContext.repetitiveTasks?.length||"multiple"} time-wasting tasks, 
${e.businessContext.businessChallenges?.length||"several"} operational challenges,
and their current tools (${e.businessContext.currentToolEcosystem||e.businessContext.currentSystems}) aren't cutting it.
Look for solutions that address this complete scenario, not just individual pieces.

WHAT TO LOOK FOR:
- AI-powered solutions that address their specific problems
- The AI tools that successful ${e.businessContext.industry} businesses actually use
- Solutions that could replace or enhance their current setup and solve multiple issues they're facing
- Platforms that solve multiple issues they're facing
- Real pricing and implementation details for ${e.businessContext.companySize} companies
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
5. Integrate with their current systems (${e.businessContext.currentSystems})
6. Support their business objectives (${e.businessContext.businessObjectives})
7. Are appropriate for their decision-making structure

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`}},789:(e,t,o)=>{o.d(t,{N:()=>s});function s(e,t){return`You are a senior AI implementation consultant at DeployAI. Based on the problem analysis and tool research, design 3 comprehensive solutions that DeployAI will implement for this business.

BUSINESS CONTEXT:
${JSON.stringify(e.businessContext,null,2)}

IDENTIFIED PROBLEMS WITH COSTS:
${JSON.stringify(e.topOpportunities,null,2)}

RESEARCHED TOOLS WITH COMPREHENSIVE DATA:
${JSON.stringify(t,null,2)}

SELECTION CRITERIA:
1. Problem-solution fit (how well the tool addresses their specific issues)
2. Budget alignment (fits within their stated budget range)
3. ROI potential (strong business case with measurable returns)
4. Industry relevance (proven success in similar businesses)
5. Business impact (maximum value regardless of complexity)

CRITICAL INSTRUCTIONS:
1. Select exactly 3 solutions that provide the best overall value
2. Preserve ALL case studies from the research but present them as "our implementations"
3. Calculate which solution should be implemented FIRST based on:
   - Highest immediate impact on revenue/cost savings
   - Fastest time to value
   - Addresses most urgent business bottleneck
   - Best ROI regardless of complexity
4. Map each solution to the specific problems it solves
5. Calculate total annual opportunity from all problems

MATHEMATICAL CONSISTENCY REQUIREMENTS:
- Use consistent time periods throughout all calculations (convert weekly to monthly as: hours/week \xd7 4.33 = hours/month)
- Ensure payback period calculations align: (monthlyInvestment \xf7 (monthlySavings + monthlyRevenue) = paybackMonths)
- Verify that projected savings don't exceed the total cost of the problem being solved
- Use business-friendly round numbers ($5,000 not $4,847) while maintaining accuracy
- Total annual opportunity must equal sum of all individual problem costs identified

REVENUE CALCULATION GUIDANCE:
- Identify revenue opportunities from each solution: faster processes enabling more sales, improved conversion rates, reduced customer churn, ability to handle more volume, etc.
- Calculate monthly revenue gains conservatively: if solution enables 20% more capacity and current revenue is $50k/month, additional revenue potential is $10k/month
- Include revenue from: time savings that can be redirected to revenue activities, improved customer experience leading to higher conversion/retention, automation enabling business scaling
- Always separate savings (cost reduction) from revenue (income increase) in calculations
- Be conservative on revenue projections - use lower estimates when uncertain

BUSINESS LANGUAGE REQUIREMENTS:
- Write all descriptions in natural business language, not technical specifications
- Use "we will implement" or "DeployAI delivers" instead of system feature lists
- Frame benefits in business outcomes, not technical capabilities
- Present proven results as specific, credible examples without exaggeration
- Explain ROI in simple terms: "Pay back your investment in X months, then save $Y monthly"

CRITICAL DATA SEPARATION:
You MUST create two completely separate objects:
1. "internalReference" - Contains real tool names for DeployAI team's database (NEVER shown to clients)
2. "clientSolution" - Contains ONLY DeployAI-branded solutions (this is what the client sees)

NEVER mention tool names, vendor names, or third-party products in the clientSolution.
Present everything as DeployAI's solutions and implementations.

OUTPUT FORMAT (return only valid JSON):
{
  "internalReference": {
    "tools": [
      {
        "priority": 1,
        "realToolName": "Actual tool name (e.g., TenantCloud)",
        "realVendor": "Actual vendor name",
        "internalNotes": "Implementation notes for DeployAI team",
        "apiRequirements": "Technical integration details",
        "planLevel": "Subscription tier needed"
      }
    ]
  },
  "clientSolution": {
    "executiveSummary": {
      "businessProfile": "Brief description of the business and their main challenges",
      "totalInvestmentRange": "$X,XXX - $X,XXX per month",
      "expectedROI": "X-X months payback period",
      "implementationTimeline": "X-X weeks total for all solutions",
      "keyOutcomes": [
        "Primary outcome we'll deliver",
        "Secondary outcome we'll deliver", 
        "Tertiary outcome we'll deliver"
      ],
      "estimatedAnnualOpportunity": "$XXX,XXX (sum of all problem costs)"
    },
    "implementedSolutions": [
      {
        "priority": 1,
        "solutionName": "Descriptive solution name (e.g., 'Automated Property Documentation System')",
        "solutionCategory": "Category of solution (e.g., 'Document & Invoice Automation')",
        "whatWeImplement": "Natural business description: 'DeployAI will build you a system that automatically...' Avoid technical jargon, focus on business outcomes",
        "problemSolved": "Specific problem from original analysis",
        "howItSolvesYourProblem": [
          "Primary way this addresses their pain",
          "Secondary improvement it delivers"
        ],
        "capabilities": [
          "Capability 1 they'll receive",
          "Capability 2 they'll receive",
          "Capability 3 they'll receive"
        ],
        "investment": {
          "monthlyInvestment": "$XXX per month (round to nearest $50)",
          "setupInvestment": "$XXX one-time setup (if any, round to nearest $100)",
          "totalFirstYear": "$X,XXX first year total (monthly \xd7 12 + setup)"
        },
        "businessCase": {
          "currentProblemCost": "Monthly cost of current problem (from problem analysis)",
          "projectedSavings": "Monthly cost savings we'll deliver (must be less than problem cost)", 
          "projectedRevenue": "Monthly new revenue opportunities we'll unlock (from faster processes, more capacity, better conversion, etc.)",
          "paybackPeriod": "X months (calculated: totalFirstYear \xf7 ((projectedSavings + projectedRevenue) \xd7 12))",
          "roiPercentage": "XXX% annual ROI (calculated: (((projectedSavings + projectedRevenue) \xd7 12) - totalFirstYear) \xf7 totalFirstYear \xd7 100)",
          "provenResults": [
            {
              "context": "A similar company we worked with (make relatable to their business size/type)",
              "industry": "Industry (or 'similar business' if different)",
              "outcome": "What we achieved for them (use actual case study data)",
              "metric": "Specific metric improvement (use exact numbers from research)"
            }
          ]
        },
        "ourImplementation": {
          "timeframe": "X weeks to full deployment",
          "approach": "How DeployAI handles the implementation (conversational explanation)",
          "integrationsWeHandle": ["Their existing systems from business context"],
          "training": "How we train your team",
          "ongoingSupport": "Our support model post-implementation"
        },
        "successMetrics": [
          {
            "metric": "Key performance indicator",
            "currentState": "Where they are now (from problem analysis)", 
            "targetState": "Where we'll get them (realistic improvement)",
            "howWeMeasure": "Our measurement approach"
          }
        ]
      }
    ],
    "ourRecommendation": {
      "firstPhase": "Name of priority 1 solution (from implementedSolutions)",
      "rationale": "Why we recommend starting here (business reasoning, not technical)",
      "immediateBottleneck": "The urgent problem this addresses",
      "expectedImpact": "What you'll see immediately", 
      "timeToValue": "X weeks to first results",
      "expectedROI": "Based on similar implementations, expect XXX% ROI in X months (use actual calculation)"
    },
    "implementationRoadmap": {
      "phase1": {
        "timeline": "Week 1-2",
        "whatWeDeliver": "First solution deployment",
        "activities": ["What we do in this phase", "Integration work we handle"],
        "yourMilestone": "What you'll have working"
      },
      "phase2": {
        "timeline": "Week 3-4", 
        "whatWeDeliver": "Second solution deployment",
        "activities": ["What we do next", "Additional capabilities we add"],
        "dependencies": "What needs to be ready"
      },
      "phase3": {
        "timeline": "Week 5-6",
        "whatWeDeliver": "Final solution and optimization",
        "activities": ["Final implementations", "System optimization"],
        "dependencies": "Prerequisites from earlier phases"
      }
    },
    "totalInvestmentSummary": {
      "monthlyInvestment": "$X,XXX total monthly for all solutions (sum of all monthly investments)",
      "implementationInvestment": "$X,XXX one-time implementation fee (sum of all setup costs)",
      "firstYearTotal": "$XX,XXX total first year investment (monthlyInvestment \xd7 12 + implementationInvestment)",
      "projectedAnnualReturn": "$XX,XXX in savings and new revenue (sum of all projectedSavings \xd7 12 + sum of all projectedRevenue \xd7 12)",
      "netROI": "XXX% return on investment ((projectedAnnualReturn - firstYearTotal) \xf7 firstYearTotal \xd7 100)",
      "breakeven": "X months to positive ROI (firstYearTotal \xf7 (projectedAnnualReturn \xf7 12))"
    },
    "nextSteps": {
      "immediate": [
        "Schedule implementation planning call with DeployAI",
        "Gather access to your existing systems",
        "Identify key team members for training"
      ],
      "week1": [
        "Begin Phase 1 implementation",
        "Configure initial integrations",
        "Start team onboarding"
      ],
      "month1": [
        "Complete all solution deployments",
        "Optimize based on initial usage",
        "Measure and report on results"
      ]
    }
  }
}

QUALITY REQUIREMENTS:
- Ensure all calculations are mathematically consistent and use the formulas provided above
- Write all business descriptions in natural, conversational language
- Verify solutions actually work with their stated current systems
- Focus on business value and outcomes DeployAI will deliver
- Position DeployAI as the solution provider, not a tool broker
- Transform case studies into "our similar implementations" with exact metrics preserved
- NEVER mention actual tool/vendor names in clientSolution
- The ourRecommendation section MUST suggest the Priority 1 solution
- Calculate estimatedAnnualOpportunity as the sum of all problem costs
- Each solution must clearly map to which problems it solves

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`}},4397:(e,t,o)=>{o.d(t,{p:()=>s});function s(e,t){let o=e.businessContext.companyName||"Your organization";return`You are creating a persuasive AI readiness report. Your job is to transform solution data into compelling executive communication that feels personalized to ${o} in the ${e.businessContext.industry} industry.

IMPORTANT: You MUST include ALL solutions from clientSolution.implementedSolutions in the report. If there are 3 solutions, the report MUST have 3 solution entries. Each solution addresses specific problems - include them all.

CRITICAL CONTEXT FOR NARRATIVE VOICE:
- Company: ${o}
- They are a ${e.businessContext.companySize} ${e.businessContext.industry} company
- Their budget is ${e.businessContext.monthlyBudget}
- Their timeline urgency is ${e.businessContext.urgency}
- They currently use: ${e.businessContext.currentSystems}
- Their main objectives: ${e.businessContext.businessObjectives}

RAW DATA TO TRANSFORM:
Problems Identified: ${JSON.stringify(e.topOpportunities,null,2)}
Our Solutions: ${JSON.stringify(t,null,2)}

EXECUTIVE COMMUNICATION RULES:
- Write for busy decision-makers who scan first, read second
- Lead with clear outcomes, not technical features
- Use round, memorable numbers ($15,000 not $14,847)
- Write conversationally: "You'll save 20 hours per week" not "20-hour weekly time reduction achieved"
- Explain complex ideas simply: "This pays for itself in 4 months" not "ROI trajectory indicates 4-month amortization"
- Use active voice and confident language
- Avoid jargon: write "customer service software" not "CX automation suite"

NUMBER PRESENTATION RULES:
- Round all figures to executive-friendly numbers
- Present time in simple terms: "15 hours per week" not "≈86 hours/month" 
- Show ROI simply: "300% return in year one" not "≈358% return on investment (net gains over first-year investment)"
- Avoid formula language: use "saves $5,000 monthly on labor costs" not "$5,000/month labor cost reduction"
- Present ranges naturally: "2-3 months payback" not "payback period: 2.3 months"
- Use specific context: "saves $8,000 monthly on staff time" not "delivers $8,000 monthly savings"

WRITING QUALITY STANDARDS:
- Each problem description should be a clear, urgent business story
- Solutions should read like confident consulting recommendations  
- ROI explanations should be simple and credible
- Case studies should feel relevant and achievable
- Next steps should feel actionable and specific
- Vary your language - don't repeat the same phrases

BUSINESS WRITING APPROACH:
1. PROBLEMS: Write as urgent business stories using their industry language
2. SOLUTIONS: Write as confident recommendations focusing on outcomes
3. NUMBERS: Present simply and credibly, avoiding complex ranges
4. PROOF: Make case studies relatable to their business type
5. NEXT STEPS: Write as clear, actionable business advice

WRITING PATTERNS (Use variety, don't repeat):
Problems:
- "At [Company], [specific situation] is costing [clear impact]"
- "[Company] is losing [amount] because [specific issue]"
- "Your team spends [time] on [task] when they could be [better activity]"

Solutions:
- "We'll implement [simple description] that [clear outcome]"
- "Our system automatically [action] so your team can [focus on what]"
- "This solution [eliminates/reduces/improves] [specific problem]"

ROI Presentation:
- "This investment pays for itself in [X] months, then delivers [Y] annually"
- "You'll see [specific improvement] within [timeframe]"
- "Expect [percentage] improvement in [metric] starting [when]"

Proof Examples (Vary these):
- "A similar [industry/size] company saw [specific result]"
- "Another [business type] we worked with achieved [outcome]"  
- "One of our [industry] clients improved [metric] by [amount]"
- "A comparable business increased [result] after implementation"

YOUR TRANSFORMATION TASK:
1. Synthesize numerical data into executive-friendly insights
2. Rewrite everything in language appropriate for their industry
3. Make problems feel urgent using their actual pain points
4. Position DeployAI's solutions as transformative (but stay truthful to data)
5. Transform proven results into relatable business examples
6. Create a narrative arc: current pain → what we'll implement → clear next step
7. MANDATORY: Include ALL solutions from clientSolution.implementedSolutions
8. MANDATORY: Include projectedOutcomes for ALL solutions
9. Present everything as DeployAI's expertise and implementation, not third-party tools

OUTPUT FORMAT (return only valid JSON):
{
  "executiveSummary": {
    "readinessLevel": "MUST be EXACTLY one word: 'High', 'Medium', or 'Low'. NO additional text, NO explanation, NO hyphens, JUST the single word.",
    "readinessExplanation": "One brief sentence explaining the readiness assessment based on: modern systems? AI experience? Clear objectives? Budget allocated? Example: 'Strong digital infrastructure with clear objectives but limited AI experience'",
    "estimatedAnnualOpportunity": "Write the annual opportunity from clientSolution.executiveSummary.estimatedAnnualOpportunity in natural language",
    "immediateROI": "Write the ROI from clientSolution.totalInvestmentSummary.netROI in simple, credible terms"
  },
  
  "keyProblems": [
    {
      "problem": "Transform problemAnalysis.topOpportunities[0] into urgent business headline for ${o}. Example: 'At ${o}, customers wait 24+ hours for responses while competitors reply instantly'",
      "currentCost": "Synthesize the financial impact from problem evidence. Make it specific and painful. Examples: 'Costs $5,000 monthly in lost sales' or 'Burns 15 hours weekly of manager time'",
      "potentialGain": "Describe improvement using metrics from the matching solution in natural language. Examples: 'Cut response time to under 2 hours' or 'Free up 12 hours weekly for growth activities'"
    },
    {
      "problem": "Make problem 2 feel like ${o} is falling behind competitors in their industry",
      "currentCost": "Quantify the pain specifically for ${o}'s industry and size in relatable terms",
      "potentialGain": "Describe real improvement from the matching solution using business-friendly language"
    },
    {
      "problem": "Frame problem 3 as missed opportunity or growing risk for ${o}",
      "currentCost": "Use industry-appropriate metrics that ${o} faces, written naturally",
      "potentialGain": "Describe proven results from the solution in achievable, credible terms"
    }
  ],
  
  "recommendedSolutions": [
    // CREATE ONE ENTRY FOR EACH SOLUTION - synthesize from clientSolution.implementedSolutions
    {
      "solutionName": "Write the solution name from clientSolution in natural business language",
      "directImpact": [
        "Synthesize how this solves their problem from clientSolution howItSolvesYourProblem in conversational terms"
      ],
      "primaryBenefits": [
        "Rewrite the capabilities from clientSolution in outcome-focused language",
        "Transform technical features into business benefits",
        "Focus on what they'll achieve, not what the system does"
      ],
      "description": "Synthesize whatWeImplement into confident consulting language emphasizing DeployAI's role and business outcomes",
      "realWorldProof": [
        {
          "caseStudy": "Transform proven results from clientSolution into relatable business story for their industry/size",
          "metric": "Present the metric in simple, credible terms"
        },
        {
          "caseStudy": "Use different language pattern for variety - avoid repeating same structure",
          "metric": "Round numbers and present naturally"
        }
      ],
      "implementationTime": "Present timeframe from clientSolution in business-friendly terms"
    }
    // Continue pattern for each solution in clientSolution.implementedSolutions
  ],
  
  "projectedOutcomes": [
    // CREATE ONE ENTRY FOR EACH SOLUTION'S PRIMARY SUCCESS METRIC
    {
      "solution": "Solution name in natural language",
      "metric": "Business metric they care about",
      "current": "Where they are now in simple terms",
      "projected": "Where they'll be in achievable terms", 
      "improvementPercentage": "Simple percentage improvement"
    }
    // Continue for each solution
  ],
  
  "whereToStart": {
    "recommendation": "Synthesize clientSolution.ourRecommendation.firstPhase into conversational recommendation",
    "targetBottleneck": "Describe the urgent problem this addresses in ${o}'s terms",
    "immediateImpact": "Describe what they'll see immediately in specific, credible terms",
    "timelineEstimate": "Present timeToValue in business-friendly language",
    "expectedROI": "Synthesize ROI expectation into simple, credible terms",
    "implementationNote": "Our senior engineers handle all technical complexity"
  },
  
  "callToAction": {
    "primaryCTA": "Schedule Your Free Consultation",
    "secondaryCTA": "Retake the Assessment", 
    "urgencyMessage": "Create appropriate urgency based on their timeline (${e.businessContext.urgency}) and business impact, avoiding pushy language"
  }
}

FINAL QUALITY CHECK:
- Read each section aloud - does it sound like a trusted business advisor?
- Remove any technical jargon or awkward phrasing
- Ensure numbers tell a clear, credible story
- Verify the language matches their industry and business size
- Check that urgency feels appropriate, not manipulative
- Confirm all solutions from clientSolution.implementedSolutions are included
- Ensure variety in language patterns and proof examples

Remember: You're translating technical data into THEIR business language while keeping all numbers accurate and credible.

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`}}};