"use strict";(()=>{var e={};e.id=256,e.ids=[256],e.modules={2885:e=>{e.exports=require("@supabase/supabase-js")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},7174:e=>{e.exports=import("@anthropic-ai/sdk")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,s){return s in t?t[s]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,s)):"function"==typeof t&&"default"===s?t:void 0}}})},6487:(e,t,s)=>{s.a(e,async(e,o)=>{try{s.r(t),s.d(t,{config:()=>u,default:()=>c,routeModule:()=>p});var r=s(1802),n=s(7153),i=s(6249),a=s(3509),l=e([a]);a=(l.then?(await l)():l)[0];let c=(0,i.l)(a,"default"),u=(0,i.l)(a,"config"),p=new r.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/ai-analysis/step2-research",pathname:"/api/ai-analysis/step2-research",bundlePath:"",filename:""},userland:a});o()}catch(e){o(e)}})},3845:(e,t,s)=>{s.d(t,{O:()=>a,p:()=>l});var o=s(2885);let r="https://nwddsjghbyrerhhnciuk.supabase.co",n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ZGRzamdoYnlyZXJoaG5jaXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzIxMjMsImV4cCI6MjA2OTA0ODEyM30.8aXGuUq7occc15txLZJqQEYiLTKZNJ2Vsqb-oKh-g_U",i=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!r||!n)throw Error("Missing Supabase environment variables");let a=(0,o.createClient)(r,n),l=()=>{if(!i)throw Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");return(0,o.createClient)(r,i,{auth:{autoRefreshToken:!1,persistSession:!1},db:{schema:"public"}})}},3509:(e,t,s)=>{s.a(e,async(e,o)=>{try{s.r(t),s.d(t,{default:()=>c});var r=s(3845),n=s(1661),i=s(8329),a=s(7174),l=e([a]);async function c(e,t){if(console.log("[STEP2] Handler called. Method:",e.method),console.log("[STEP2] Headers:",e.headers),"POST"!==e.method)return console.error("[STEP2] ERROR - Invalid method:",e.method),t.status(405).json({error:"Method not allowed"});let s=e.headers["x-api-key"];if(console.log("[STEP2] API Key check - Received:",s?"Present":"Missing"),console.log("[STEP2] API Key check - Expected:",process.env.INTERNAL_API_KEY?"Set":"Not set"),s!==process.env.INTERNAL_API_KEY)return console.error("[STEP2] ERROR - Unauthorized. Key mismatch"),t.status(401).json({error:"Unauthorized"});console.log("[STEP2] Authentication passed");try{let s;let{quizResponseId:o,reportId:l,problemAnalysis:c}=e.body;if(console.log("[STEP2] Starting research for:"),console.log("[STEP2] Report ID:",l),console.log("[STEP2] Quiz Response ID:",o),console.log("[STEP2] ProblemAnalysis received:",!!c),console.log("[STEP2] Top opportunities count:",c?.topOpportunities?.length),!c||!c.businessContext||!c.topOpportunities)return console.error("Invalid problemAnalysis structure:",c),t.status(400).json({error:"Invalid problem analysis data",received:c?Object.keys(c):"null"});let u=(0,r.p)(),p=new a.default({apiKey:process.env.ANTHROPIC_API_KEY});console.log("Step 2 - Processing with business context:",c.businessContext),console.log("Step 2 - Number of opportunities:",c.topOpportunities.length);let d=(0,n.L)(c);console.log("[STEP2] Prompt generated. Length:",d.length),console.log("[STEP2] Calling Claude API with web search tool..."),console.log("[STEP2] Model: claude-sonnet-4-20250514"),console.log("[STEP2] Web search tool: web_search_20250305");let m=await p.messages.create({model:"claude-sonnet-4-20250514",max_tokens:15e3,temperature:.3,system:"You are an AI tools expert. Use web search to find real, current AI tools and their actual pricing, features, and case studies. Search for specific tools that solve the identified business problems.",messages:[{role:"user",content:d}],tools:[{type:"web_search_20250305",name:"web_search",max_uses:10}]});console.log("[STEP2] Claude API response received"),console.log("[STEP2] Stop reason:",m.stop_reason),console.log("[STEP2] Content blocks:",m.content.length);let h="";if("pause_turn"===m.stop_reason){console.log("[STEP2] Handling pause_turn for long-running web search...");let e=(await p.messages.create({model:"claude-sonnet-4-20250514",max_tokens:15e3,temperature:.3,messages:[{role:"user",content:d},{role:"assistant",content:m.content}],tools:[{type:"web_search_20250305",name:"web_search",max_uses:10}]})).content.find(e=>"text"===e.type);h=e?e.text:""}else{let e=m.content.find(e=>"text"===e.type);h=e?e.text:"",console.log("[STEP2] Normal response - extracted text content. Length:",h.length)}try{console.log("[STEP2] Attempting to parse JSON response..."),s=(0,i.M)(h),console.log("[STEP2] SUCCESS - Parsed tool research"),console.log("[STEP2] Annual opportunity:",s.estimatedAnnualOpportunity),console.log("[STEP2] Number of solutions found:",s.recommendedSolutions?.length)}catch(e){throw console.error("[STEP2] ERROR - Failed to parse AI response"),console.error("[STEP2] Parse error:",e instanceof Error?e.message:e),console.error("[STEP2] Response content preview:",h.substring(0,500)),Error("Invalid AI response format in Step 2")}let{error:g}=await u.from("ai_reports").update({stage2_tool_research:s,report_status:"stage2_complete",updated_at:new Date().toISOString()}).eq("id",l);if(g)throw console.error("Error updating report:",g),g;let b="http://localhost:3000/api/ai-analysis/step3-curate";console.log("[STEP2->STEP3] Starting Step 3 trigger"),console.log("[STEP2->STEP3] URL:",b),console.log("[STEP2->STEP3] Sending data - reportId:",l),console.log("[STEP2->STEP3] Sending data - quizResponseId:",o),fetch(b,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":process.env.INTERNAL_API_KEY||"dev-key-12345"},body:JSON.stringify({quizResponseId:o,reportId:l,problemAnalysis:c,toolResearch:s})}).catch(e=>{console.error("Failed to trigger step 3:",e)}),t.status(200).json({success:!0,message:"Step 2 research complete"})}catch(e){console.error("[STEP2] CRITICAL ERROR in step 2 research"),e instanceof Error?(console.error("[STEP2] Error type:",e.name),console.error("[STEP2] Error message:",e.message),console.error("[STEP2] Error stack:",e.stack)):console.error("[STEP2] Unknown error:",e),e&&"object"==typeof e&&"response"in e&&console.error("[STEP2] API Response error:",e.response),t.status(500).json({error:"Failed to research tools",details:e instanceof Error?e.message:"Unknown error"})}}a=(l.then?(await l)():l)[0],o()}catch(e){o(e)}})},1661:(e,t,s)=>{s.d(t,{L:()=>o});function o(e){let t=e.businessContext.companyName||"the organization";return`You have identified 3 specific problems for ${t} in the ${e.businessContext.industry} industry. Now use web search to find the EXACT tools that solve THEIR specific problems.

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

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`}},8329:(e,t,s)=>{function o(e){try{return JSON.parse(e)}catch(o){let t=e,s=(t=(t=(t=(t=(t=(t=(t=t.replace(/^```json\s*\n?/gm,"")).replace(/^```\s*$/gm,"")).replace(/\/\*[\s\S]*?\*\//g,"")).replace(/\/\/.*$/gm,"")).replace(/,\s*([}\]])/g,"$1")).replace(/^\uFEFF/,"")).trim()).match(/(\{[\s\S]*\}|\[[\s\S]*\])/);s&&(t=s[1]);try{return JSON.parse(t)}catch(o){let e=t.indexOf("{"),s=t.lastIndexOf("}");if(-1!==e&&-1!==s&&s>e){let o=t.substring(e,s+1);try{return JSON.parse(o)}catch(e){throw console.error("Failed to parse JSON after cleaning:",t),Error(`Failed to parse JSON: ${e instanceof Error?e.message:"Unknown error"}`)}}throw Error(`Failed to parse JSON: ${o instanceof Error?o.message:"Unknown error"}`)}}}s.d(t,{M:()=>o})},7153:(e,t)=>{var s;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return s}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(s||(s={}))},1802:(e,t,s)=>{e.exports=s(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var s=t(t.s=6487);module.exports=s})();