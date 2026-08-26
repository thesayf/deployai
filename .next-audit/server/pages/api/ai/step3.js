"use strict";(()=>{var e={};e.id=1389,e.ids=[1389],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},7174:e=>{e.exports=import("@anthropic-ai/sdk")},2079:e=>{e.exports=import("openai")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},2475:(e,t,n)=>{n.a(e,async(e,o)=>{try{n.r(t),n.d(t,{config:()=>u,default:()=>m,routeModule:()=>c});var i=n(1802),s=n(7153),a=n(6249),r=n(8853),l=e([r]);r=(l.then?(await l)():l)[0];let m=(0,a.l)(r,"default"),u=(0,a.l)(r,"config"),c=new i.PagesAPIRouteModule({definition:{kind:s.x.PAGES_API,page:"/api/ai/step3",pathname:"/api/ai/step3",bundlePath:"",filename:""},userland:r});o()}catch(e){o(e)}})},8853:(e,t,n)=>{n.a(e,async(e,o)=>{try{n.r(t),n.d(t,{config:()=>m,default:()=>l});var i=n(3851),s=n(789),a=n(8329),r=e([i]);async function l(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let n;let{problemAnalysis:o,toolResearch:r}=e.body;if(!o||!r)return t.status(400).json({error:"Missing required analysis data"});console.log("[AI Step 3] Starting tool curation...");let l=i.q.getStepConfig(3);console.log("[AI Step 3] Config:",JSON.stringify(l));let m=i.q.getProvider(l.provider,l.model);console.log(`[AI Step 3] Provider: ${m.getName()}, model: ${l.model}`);let u=(0,s.N)(o,r);console.log(`[AI Step 3] Prompt size: ${u.length} characters (approx ${Math.ceil(u.length/4)} tokens)`),u.length>3e4&&console.log("[AI Step 3] Large prompt detected - will use extended 5-minute timeout for processing"),"openai"===l.provider?(console.log("[AI Step 3] Using GPT-5 mini"),n=await m.generateCompletion({prompt:u,temperature:.3,reasoning_effort:l.reasoning_effort,verbosity:l.verbosity})):(console.log("[AI Step 3] Using Claude"),n=await m.generateCompletion({prompt:u,maxTokens:12e3,temperature:.3}));let c=n.content,p=(0,a.M)(c);console.log("[AI Step 3] Curation complete, size:",JSON.stringify(p).length,"bytes"),t.status(200).json({success:!0,data:p})}catch(e){console.error("[AI Step 3] Error:",e),t.status(500).json({error:"Failed to curate tools",details:e instanceof Error?e.message:"Unknown error"})}}i=(r.then?(await r)():r)[0];let m={api:{bodyParser:{sizeLimit:"10mb"},externalResolver:!0}};o()}catch(e){o(e)}})},789:(e,t,n)=>{n.d(t,{N:()=>o});function o(e,t){return`You are a senior AI implementation consultant at DeployAI. Based on the problem analysis and tool research, design 3 comprehensive solutions that DeployAI will implement for this business.

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

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`}},8329:(e,t,n)=>{function o(e){try{return JSON.parse(e)}catch(o){let t=e,n=(t=(t=(t=(t=(t=(t=(t=t.replace(/^```json\s*\n?/gm,"")).replace(/^```\s*$/gm,"")).replace(/\/\*[\s\S]*?\*\//g,"")).replace(/\/\/.*$/gm,"")).replace(/,\s*([}\]])/g,"$1")).replace(/^\uFEFF/,"")).trim()).match(/(\{[\s\S]*\}|\[[\s\S]*\])/);n&&(t=n[1]);try{return JSON.parse(t)}catch(o){let e=t.indexOf("{"),n=t.lastIndexOf("}");if(-1!==e&&-1!==n&&n>e){let o=t.substring(e,n+1);try{return JSON.parse(o)}catch(e){throw console.error("Failed to parse JSON after cleaning:",t),Error(`Failed to parse JSON: ${e instanceof Error?e.message:"Unknown error"}`)}}throw Error(`Failed to parse JSON: ${o instanceof Error?o.message:"Unknown error"}`)}}}n.d(t,{M:()=>o})},7153:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},1802:(e,t,n)=>{e.exports=n(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var n=e=>t(t.s=e),o=t.X(0,[3851],()=>n(2475));module.exports=o})();