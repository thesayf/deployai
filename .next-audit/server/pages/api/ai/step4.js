"use strict";(()=>{var e={};e.id=6218,e.ids=[6218],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},7174:e=>{e.exports=import("@anthropic-ai/sdk")},2079:e=>{e.exports=import("openai")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},9610:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.r(t),n.d(t,{config:()=>c,default:()=>u,routeModule:()=>m});var r=n(1802),o=n(7153),s=n(6249),a=n(2595),l=e([a]);a=(l.then?(await l)():l)[0];let u=(0,s.l)(a,"default"),c=(0,s.l)(a,"config"),m=new r.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/ai/step4",pathname:"/api/ai/step4",bundlePath:"",filename:""},userland:a});i()}catch(e){i(e)}})},2595:(e,t,n)=>{n.a(e,async(e,i)=>{try{n.r(t),n.d(t,{config:()=>u,default:()=>l});var r=n(3851),o=n(4397),s=n(8329),a=e([r]);async function l(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let{problemAnalysis:n,curatedTools:i,writeUpModel:a}=e.body;if(!n||!i)return t.status(400).json({error:"Missing required analysis data"});console.log("[AI Step 4] Starting report generation...");let l=i.clientSolution||i,u=(0,o.p)(n,l),c=a||process.env.WRITE_UP_MODEL||"claude-4",m="";if("gpt-5"===c){console.log("[AI Step 4] Using GPT-5 full for final report");let e=r.q.getProvider("openai","gpt-5");m=(await e.generateCompletion({prompt:u,temperature:.3,reasoning_effort:"medium",verbosity:"high"})).content}else{let e=r.q.getStepConfig(4);console.log("[AI Step 4] Config:",JSON.stringify(e));let t=r.q.getProvider(e.provider,e.model);console.log(`[AI Step 4] Provider: ${t.getName()}, model: ${e.model}`),"openai"===e.provider?(console.log("[AI Step 4] Using GPT-5 mini for final report"),m=(await t.generateCompletion({prompt:u,temperature:.3,reasoning_effort:e.reasoning_effort,verbosity:e.verbosity})).content):(console.log("[AI Step 4] Using Claude for final report"),m=(await t.generateCompletion({prompt:u,maxTokens:15e3,temperature:.3})).content)}let p=(0,s.M)(m);console.log("[AI Step 4] Report generation complete, size:",JSON.stringify(p).length,"bytes"),t.status(200).json({success:!0,data:p})}catch(e){console.error("[AI Step 4] Error:",e),t.status(500).json({error:"Failed to generate report",details:e instanceof Error?e.message:"Unknown error"})}}r=(a.then?(await a)():a)[0];let u={api:{bodyParser:{sizeLimit:"10mb"},externalResolver:!0}};i()}catch(e){i(e)}})},4397:(e,t,n)=>{n.d(t,{p:()=>i});function i(e,t){let n=e.businessContext.companyName||"Your organization";return`You are creating a persuasive AI readiness report. Your job is to transform solution data into compelling executive communication that feels personalized to ${n} in the ${e.businessContext.industry} industry.

IMPORTANT: You MUST include ALL solutions from clientSolution.implementedSolutions in the report. If there are 3 solutions, the report MUST have 3 solution entries. Each solution addresses specific problems - include them all.

CRITICAL CONTEXT FOR NARRATIVE VOICE:
- Company: ${n}
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
      "problem": "Transform problemAnalysis.topOpportunities[0] into urgent business headline for ${n}. Example: 'At ${n}, customers wait 24+ hours for responses while competitors reply instantly'",
      "currentCost": "Synthesize the financial impact from problem evidence. Make it specific and painful. Examples: 'Costs $5,000 monthly in lost sales' or 'Burns 15 hours weekly of manager time'",
      "potentialGain": "Describe improvement using metrics from the matching solution in natural language. Examples: 'Cut response time to under 2 hours' or 'Free up 12 hours weekly for growth activities'"
    },
    {
      "problem": "Make problem 2 feel like ${n} is falling behind competitors in their industry",
      "currentCost": "Quantify the pain specifically for ${n}'s industry and size in relatable terms",
      "potentialGain": "Describe real improvement from the matching solution using business-friendly language"
    },
    {
      "problem": "Frame problem 3 as missed opportunity or growing risk for ${n}",
      "currentCost": "Use industry-appropriate metrics that ${n} faces, written naturally",
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
    "targetBottleneck": "Describe the urgent problem this addresses in ${n}'s terms",
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

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`}},8329:(e,t,n)=>{function i(e){try{return JSON.parse(e)}catch(i){let t=e,n=(t=(t=(t=(t=(t=(t=(t=t.replace(/^```json\s*\n?/gm,"")).replace(/^```\s*$/gm,"")).replace(/\/\*[\s\S]*?\*\//g,"")).replace(/\/\/.*$/gm,"")).replace(/,\s*([}\]])/g,"$1")).replace(/^\uFEFF/,"")).trim()).match(/(\{[\s\S]*\}|\[[\s\S]*\])/);n&&(t=n[1]);try{return JSON.parse(t)}catch(i){let e=t.indexOf("{"),n=t.lastIndexOf("}");if(-1!==e&&-1!==n&&n>e){let i=t.substring(e,n+1);try{return JSON.parse(i)}catch(e){throw console.error("Failed to parse JSON after cleaning:",t),Error(`Failed to parse JSON: ${e instanceof Error?e.message:"Unknown error"}`)}}throw Error(`Failed to parse JSON: ${i instanceof Error?i.message:"Unknown error"}`)}}}n.d(t,{M:()=>i})},7153:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},1802:(e,t,n)=>{e.exports=n(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var n=e=>t(t.s=e),i=t.X(0,[3851],()=>n(9610));module.exports=i})();