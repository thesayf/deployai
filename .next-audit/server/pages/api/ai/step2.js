"use strict";(()=>{var e={};e.id=1966,e.ids=[1966],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},7174:e=>{e.exports=import("@anthropic-ai/sdk")},2079:e=>{e.exports=import("openai")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,s){return s in t?t[s]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,s)):"function"==typeof t&&"default"===s?t:void 0}}})},6061:(e,t,s)=>{s.a(e,async(e,o)=>{try{s.r(t),s.d(t,{config:()=>c,default:()=>u,routeModule:()=>p});var r=s(1802),n=s(7153),i=s(6249),a=s(5091),l=e([a]);a=(l.then?(await l)():l)[0];let u=(0,i.l)(a,"default"),c=(0,i.l)(a,"config"),p=new r.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/ai/step2",pathname:"/api/ai/step2",bundlePath:"",filename:""},userland:a});o()}catch(e){o(e)}})},5091:(e,t,s)=>{s.a(e,async(e,o)=>{try{s.r(t),s.d(t,{config:()=>u,default:()=>l});var r=s(3851),n=s(1661),i=s(8329),a=e([r]);async function l(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let{problemAnalysis:s}=e.body;if(!s)return t.status(400).json({error:"Missing problem analysis data"});console.log("[AI Step 2] Starting tool research...");let o=r.q.getStepConfig(2);console.log("[AI Step 2] Config:",JSON.stringify(o));let a=r.q.getProvider(o.provider,o.model);console.log(`[AI Step 2] Provider: ${a.getName()}, model: ${o.model}`);let l=(0,n.L)(s);console.log("[AI Step 2] Using Claude Sonnet 4 with web search");let u=(await a.generateCompletion({prompt:l,maxTokens:15e3,temperature:.4})).content,c=(0,i.M)(u);console.log("[AI Step 2] Research complete, size:",JSON.stringify(c).length,"bytes"),t.status(200).json({success:!0,data:c})}catch(e){console.error("[AI Step 2] Error:",e),t.status(500).json({error:"Failed to research tools",details:e instanceof Error?e.message:"Unknown error"})}}r=(a.then?(await a)():a)[0];let u={api:{bodyParser:{sizeLimit:"10mb"},externalResolver:!0}};o()}catch(e){o(e)}})},1661:(e,t,s)=>{s.d(t,{L:()=>o});function o(e){let t=e.businessContext.companyName||"the organization";return`You have identified 3 specific problems for ${t} in the ${e.businessContext.industry} industry. Now use web search to find the EXACT tools that solve THEIR specific problems.

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

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`}},8329:(e,t,s)=>{function o(e){try{return JSON.parse(e)}catch(o){let t=e,s=(t=(t=(t=(t=(t=(t=(t=t.replace(/^```json\s*\n?/gm,"")).replace(/^```\s*$/gm,"")).replace(/\/\*[\s\S]*?\*\//g,"")).replace(/\/\/.*$/gm,"")).replace(/,\s*([}\]])/g,"$1")).replace(/^\uFEFF/,"")).trim()).match(/(\{[\s\S]*\}|\[[\s\S]*\])/);s&&(t=s[1]);try{return JSON.parse(t)}catch(o){let e=t.indexOf("{"),s=t.lastIndexOf("}");if(-1!==e&&-1!==s&&s>e){let o=t.substring(e,s+1);try{return JSON.parse(o)}catch(e){throw console.error("Failed to parse JSON after cleaning:",t),Error(`Failed to parse JSON: ${e instanceof Error?e.message:"Unknown error"}`)}}throw Error(`Failed to parse JSON: ${o instanceof Error?o.message:"Unknown error"}`)}}}s.d(t,{M:()=>o})},7153:(e,t)=>{var s;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return s}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(s||(s={}))},1802:(e,t,s)=>{e.exports=s(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var s=e=>t(t.s=e),o=t.X(0,[3851],()=>s(6061));module.exports=o})();