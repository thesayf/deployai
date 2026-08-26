"use strict";(()=>{var e={};e.id=1721,e.ids=[1721],e.modules={2885:e=>{e.exports=require("@supabase/supabase-js")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},7174:e=>{e.exports=import("@anthropic-ai/sdk")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,o){return o in t?t[o]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,o)):"function"==typeof t&&"default"===o?t:void 0}}})},5060:(e,t,o)=>{o.a(e,async(e,n)=>{try{o.r(t),o.d(t,{config:()=>u,default:()=>c,routeModule:()=>m});var s=o(1802),r=o(7153),i=o(6249),a=o(7179),l=e([a]);a=(l.then?(await l)():l)[0];let c=(0,i.l)(a,"default"),u=(0,i.l)(a,"config"),m=new s.PagesAPIRouteModule({definition:{kind:r.x.PAGES_API,page:"/api/ai-analysis/step3-curate",pathname:"/api/ai-analysis/step3-curate",bundlePath:"",filename:""},userland:a});n()}catch(e){n(e)}})},3845:(e,t,o)=>{o.d(t,{O:()=>a,p:()=>l});var n=o(2885);let s="https://nwddsjghbyrerhhnciuk.supabase.co",r="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ZGRzamdoYnlyZXJoaG5jaXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzIxMjMsImV4cCI6MjA2OTA0ODEyM30.8aXGuUq7occc15txLZJqQEYiLTKZNJ2Vsqb-oKh-g_U",i=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!s||!r)throw Error("Missing Supabase environment variables");let a=(0,n.createClient)(s,r),l=()=>{if(!i)throw Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");return(0,n.createClient)(s,i,{auth:{autoRefreshToken:!1,persistSession:!1},db:{schema:"public"}})}},7179:(e,t,o)=>{o.a(e,async(e,n)=>{try{o.r(t),o.d(t,{default:()=>c});var s=o(3845),r=o(789),i=o(8329),a=o(7174),l=e([a]);async function c(e,t){if(console.log("[STEP3] Handler called. Method:",e.method),"POST"!==e.method)return console.error("[STEP3] ERROR - Invalid method:",e.method),t.status(405).json({error:"Method not allowed"});let o=e.headers["x-api-key"];if(console.log("[STEP3] API Key check - Received:",o?"Present":"Missing"),o!==process.env.INTERNAL_API_KEY)return console.error("[STEP3] ERROR - Unauthorized. Key mismatch"),t.status(401).json({error:"Unauthorized"});console.log("[STEP3] Authentication passed");try{let o;let{quizResponseId:n,reportId:l,problemAnalysis:c,toolResearch:u}=e.body;console.log("[STEP3] Starting curation for:"),console.log("[STEP3] Report ID:",l),console.log("[STEP3] Quiz Response ID:",n),console.log("[STEP3] ProblemAnalysis received:",!!c),console.log("[STEP3] ToolResearch received:",!!u),console.log("[STEP3] Recommended solutions count:",u?.recommendedSolutions?.length);let m=(0,s.p)(),p=new a.default({apiKey:process.env.ANTHROPIC_API_KEY}),d=(0,r.N)(c,u);console.log("[STEP3] Prompt generated. Length:",d.length),console.log("[STEP3] Calling Claude API...");let h=await p.messages.create({model:"claude-sonnet-4-20250514",max_tokens:15e3,temperature:.2,messages:[{role:"user",content:d}]});console.log("[STEP3] Claude API response received");let y="text"===h.content[0].type?h.content[0].text:"";console.log("[STEP3] Response content length:",y.length);try{console.log("[STEP3] Attempting to parse JSON response..."),o=(0,i.M)(y),console.log("[STEP3] SUCCESS - Parsed curated tools"),console.log("[STEP3] Selected tools count:",o.selectedTools?.length),console.log("[STEP3] Executive summary:",o.executiveSummary?.estimatedAnnualOpportunity)}catch(e){throw console.error("[STEP3] ERROR - Failed to parse AI response"),console.error("[STEP3] Parse error:",e instanceof Error?e.message:e),console.error("[STEP3] Response content preview:",y.substring(0,500)),Error("Invalid AI response format in Step 3")}let{error:g}=await m.from("ai_reports").update({stage3_tool_selection:o,report_status:"stage3_complete",updated_at:new Date().toISOString()}).eq("id",l);if(g)throw console.error("Error updating report:",g),g;let v="http://localhost:3000/api/ai-analysis/step4-generate";console.log("[STEP3->STEP4] Starting Step 4 trigger"),console.log("[STEP3->STEP4] URL:",v),fetch(v,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":process.env.INTERNAL_API_KEY||"dev-key-12345"},body:JSON.stringify({quizResponseId:n,reportId:l,problemAnalysis:c,curatedTools:o})}).catch(e=>{console.error("Failed to trigger step 4:",e)}),t.status(200).json({success:!0,message:"Step 3 curation complete"})}catch(e){console.error("[STEP3] CRITICAL ERROR in step 3 curation"),e instanceof Error?(console.error("[STEP3] Error type:",e.name),console.error("[STEP3] Error message:",e.message),console.error("[STEP3] Error stack:",e.stack)):console.error("[STEP3] Unknown error:",e),t.status(500).json({error:"Failed to curate tools",details:e instanceof Error?e.message:"Unknown error"})}}a=(l.then?(await l)():l)[0],n()}catch(e){n(e)}})},789:(e,t,o)=>{o.d(t,{N:()=>n});function n(e,t){return`You are a senior AI implementation consultant at DeployAI. Based on the problem analysis and tool research, design 3 comprehensive solutions that DeployAI will implement for this business.

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

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`}},8329:(e,t,o)=>{function n(e){try{return JSON.parse(e)}catch(n){let t=e,o=(t=(t=(t=(t=(t=(t=(t=t.replace(/^```json\s*\n?/gm,"")).replace(/^```\s*$/gm,"")).replace(/\/\*[\s\S]*?\*\//g,"")).replace(/\/\/.*$/gm,"")).replace(/,\s*([}\]])/g,"$1")).replace(/^\uFEFF/,"")).trim()).match(/(\{[\s\S]*\}|\[[\s\S]*\])/);o&&(t=o[1]);try{return JSON.parse(t)}catch(n){let e=t.indexOf("{"),o=t.lastIndexOf("}");if(-1!==e&&-1!==o&&o>e){let n=t.substring(e,o+1);try{return JSON.parse(n)}catch(e){throw console.error("Failed to parse JSON after cleaning:",t),Error(`Failed to parse JSON: ${e instanceof Error?e.message:"Unknown error"}`)}}throw Error(`Failed to parse JSON: ${n instanceof Error?n.message:"Unknown error"}`)}}}o.d(t,{M:()=>n})},7153:(e,t)=>{var o;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return o}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(o||(o={}))},1802:(e,t,o)=>{e.exports=o(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var o=t(t.s=5060);module.exports=o})();