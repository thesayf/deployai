"use strict";(()=>{var e={};e.id=7138,e.ids=[7138],e.modules={2885:e=>{e.exports=require("@supabase/supabase-js")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},7174:e=>{e.exports=import("@anthropic-ai/sdk")},2079:e=>{e.exports=import("openai")},6326:e=>{e.exports=import("resend")},4174:(e,t,o)=>{o.a(e,async(e,s)=>{try{o.r(t),o.d(t,{config:()=>c,default:()=>u,routeModule:()=>m});var n=o(1802),i=o(7153),r=o(6249),a=o(4290),l=e([a]);a=(l.then?(await l)():l)[0];let u=(0,r.l)(a,"default"),c=(0,r.l)(a,"config"),m=new n.PagesAPIRouteModule({definition:{kind:i.x.PAGES_API,page:"/api/ai-analysis/process-pipeline",pathname:"/api/ai-analysis/process-pipeline",bundlePath:"",filename:""},userland:a});s()}catch(e){s(e)}})},9930:(e,t,o)=>{o.d(t,{K:()=>s,g:()=>n});let s={senders:{assessment:"AI Assessment <assessment@deployai.studio>",reports:"AI Reports <reports@deployai.studio>",fallback:"deployAI <hello@deployai.studio>"},subjects:{confirmation:"Assessment Received - Processing Your Results",reportReady:e=>`Assessment Report Ready${e?` - ${e}`:""}`},timing:{reportGenerationMinutes:"5-10 minutes",reportAvailabilityDays:30}};function n(e){let t=s.senders[e];return console.log(`[EMAIL] Using ${e} sender: ${t}`),t}},697:(e,t,o)=>{o.d(t,{M:()=>s});function s(e){return`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Assessment Report - ${e.company||"Analysis Complete"}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: white;">
        
        <div style="border-bottom: 3px solid #457B9D; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #333; font-size: 24px; margin: 0;">Assessment Report Ready</h1>
          <p style="color: #666; margin: 5px 0;">AI Readiness Analysis for ${e.company||"your organization"}</p>
        </div>
        
        <div style="padding: 0 20px;">
          <p>Hi ${e.firstName},</p>
          
          <p>Thank you for completing the AI readiness assessment. Your personalized analysis report has been generated and is ready for review.</p>
          
          <div style="background: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 4px solid #457B9D;">
            <strong>Report Contents:</strong>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Current state analysis</li>
              <li>Industry-specific opportunities</li>
              <li>Implementation roadmap</li>
              <li>Technology recommendations</li>
              <li>Investment projections</li>
              <li>Risk assessment</li>
              <li>Next steps</li>
            </ul>
          </div>
          
          <p>Access your report here:</p>
          <p><a href="${e.reportUrl}" style="color: #457B9D;">View Assessment Report</a></p>
          
          <p style="color: #666; font-size: 14px;">This report will be available for 30 days. We recommend downloading or bookmarking it for future reference.</p>
          
          <p>If you have any questions about your report, please don't hesitate to reach out.</p>
          
          <p>Best regards,<br>
          The deployAI Team</p>
        </div>
        
        <div style="border-top: 1px solid #e0e0e0; margin-top: 40px; padding-top: 20px; text-align: center; color: #999; font-size: 12px;">
          <p>deployAI Studio | AI Implementation Consulting<br>
          This is an automated message. Please do not reply directly to this email.</p>
        </div>
        
      </div>
    </body>
    </html>
  `}},2394:(e,t,o)=>{o.a(e,async(e,s)=>{try{o.d(t,{Wk:()=>m,Xt:()=>c,rJ:()=>p});var n=o(6326),i=o(3845),r=o(697),a=o(9930),l=o(5634),u=e([n]);let d=new(n=(u.then?(await u)():u)[0]).Resend(process.env.RESEND_API_KEY);async function c({quizId:e,reportId:t,userEmail:o,firstName:s,lastName:n,company:r}){console.log("[CONFIRMATION-EMAIL] Sending confirmation email"),console.log("[CONFIRMATION-EMAIL] Quiz ID:",e),console.log("[CONFIRMATION-EMAIL] Report ID:",t),console.log("[CONFIRMATION-EMAIL] User email:",o);try{let t=(0,i.p)(),{data:n}=await t.from("quiz_responses").select("industry, company_size").eq("id",e).single(),l=`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your AI Assessment is Being Processed</title>
        <style>
          body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #457B9D 0%, #3a6a89 100%); padding: 40px 30px; text-align: center; color: white; }
          .content { padding: 30px; background: #f9f9f9; }
          .footer { padding: 30px; background: #1a1a1a; color: white; text-align: center; }
          .button { display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #457B9D 0%, #3a6a89 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
          .score-preview { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
          h1 { margin: 0; }
          h3 { color: #333; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Taking the AI Readiness Assessment!</h1>
          </div>
          
          <div class="content">
            <p>Hi ${s},</p>
            
            <p>Thank you for completing the AI Readiness Assessment${r?` for ${r}`:""}. Our AI is currently analyzing your responses to identify the best opportunities for AI implementation in your business.</p>
            
            <div class="score-preview">
              <h3>Analysis in Progress</h3>
              <p style="font-size: 24px; color: #457B9D; margin: 10px 0;">🔍 Identifying AI Opportunities</p>
              <p style="color: #666;">Our AI is researching solutions specific to your ${n?.industry||"industry"}</p>
            </div>
            
            <h3>What's Next?</h3>
            <ul>
              <li><strong>Report Generation:</strong> Your detailed AI strategy report is being generated and will be sent to this email within the next 5-10 minutes.</li>
              <li><strong>Personalized Insights:</strong> Based on your responses, we'll provide industry-specific recommendations and implementation strategies.</li>
              <li><strong>Action Plan:</strong> Your report will include a practical roadmap for AI adoption in your organization.</li>
            </ul>
            
            <p>The report will include:</p>
            <ul>
              <li>Detailed analysis of your AI readiness</li>
              <li>Industry-specific opportunities</li>
              <li>Recommended AI tools and technologies</li>
              <li>Implementation timeline and priorities</li>
              <li>ROI projections and cost estimates</li>
            </ul>
            
            <p style="margin-top: 30px; padding: 15px; background: #e6f3f7; border-left: 4px solid #457B9D;">
              <strong>Keep an eye on your inbox</strong> - your comprehensive report will arrive shortly!
            </p>
          </div>
          
          <div class="footer">
            <p>Questions? Reply to this email or contact us at hello@deployai.studio</p>
            <p style="font-size: 12px; color: #888; margin-top: 15px;">\xa9 ${new Date().getFullYear()} DeployAI. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,{data:u,error:c}=await d.emails.send({from:(0,a.g)("assessment"),to:[o],subject:a.K.subjects.confirmation,html:l,tags:[{name:"type",value:"assessment-confirmation"},{name:"quiz_id",value:e}]});if(c)return console.error("[CONFIRMATION-EMAIL] Failed to send email:",c),console.error("[CONFIRMATION-EMAIL] Error details:",JSON.stringify(c,null,2)),{success:!1,error:c.message||"Failed to send email"};return console.log("[CONFIRMATION-EMAIL] Email sent successfully to:",o),console.log("[CONFIRMATION-EMAIL] Email ID:",u?.id),{success:!0,emailId:u?.id}}catch(e){return console.error("[CONFIRMATION-EMAIL] Exception:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}async function m({reportId:e,userEmail:t,firstName:o,lastName:s,company:n,accessToken:u,req:c}){console.log("[REPORT-EMAIL] Sending report ready email"),console.log("[REPORT-EMAIL] Report ID:",e),console.log("[REPORT-EMAIL] User email:",t);try{let m=c?(0,l.SV)(c):"http://localhost:3000",p=`${m}/report/view/${u}`;console.log("[REPORT-EMAIL] Report URL:",p);let h=(0,r.M)({firstName:o,lastName:s,company:n,reportUrl:p}),{data:g,error:y}=await d.emails.send({from:(0,a.g)("assessment"),to:[t],subject:a.K.subjects.reportReady(n),html:h,tags:[{name:"type",value:"report-ready"},{name:"report_id",value:e}]});if(y)return console.error("[REPORT-EMAIL] Failed to send email:",y),console.error("[REPORT-EMAIL] Error details:",JSON.stringify(y,null,2)),{success:!1,error:y.message||"Failed to send email"};console.log("[REPORT-EMAIL] Email sent successfully!"),console.log("[REPORT-EMAIL] Email ID:",g?.id);let f=(0,i.p)();return await f.from("ai_reports").update({email_sent_at:new Date().toISOString(),report_status:"completed"}).eq("id",e),{success:!0,emailId:g?.id}}catch(e){return console.error("[REPORT-EMAIL] Exception:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}async function p({name:e,company:t,email:o,phone:s,message:n,type:i}){console.log("[CONTACT-EMAIL] Sending contact form email"),console.log("[CONTACT-EMAIL] From:",o);try{let{error:r}=await d.emails.send({from:"hello@deployai.studio",to:"hello@deployai.studio",replyTo:o,subject:`New ${"company"===i?"Company":"Individual"} Inquiry from ${e}`,html:`
        <h2>New Contact Form Submission</h2>
        <p><strong>Type:</strong> ${"company"===i?"Company":"Individual"}</p>
        <p><strong>Name:</strong> ${e}</p>
        ${t?`<p><strong>Company:</strong> ${t}</p>`:""}
        <p><strong>Email:</strong> ${o}</p>
        ${s?`<p><strong>Phone:</strong> ${s}</p>`:""}
        <hr />
        <h3>Message:</h3>
        <p>${n.replace(/\n/g,"<br>")}</p>
      `,text:`
        New Contact Form Submission
        
        Type: ${"company"===i?"Company":"Individual"}
        Name: ${e}
        ${t?`Company: ${t}`:""}
        Email: ${o}
        ${s?`Phone: ${s}`:""}
        
        Message:
        ${n}
      `});if(r)return console.error("[CONTACT-EMAIL] Failed to send email:",r),{success:!1,error:r.message||"Failed to send email"};return console.log("[CONTACT-EMAIL] Email sent successfully"),{success:!0}}catch(e){return console.error("[CONTACT-EMAIL] Exception:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}s()}catch(e){s(e)}})},3845:(e,t,o)=>{o.d(t,{O:()=>a,p:()=>l});var s=o(2885);let n="https://nwddsjghbyrerhhnciuk.supabase.co",i="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ZGRzamdoYnlyZXJoaG5jaXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzIxMjMsImV4cCI6MjA2OTA0ODEyM30.8aXGuUq7occc15txLZJqQEYiLTKZNJ2Vsqb-oKh-g_U",r=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!n||!i)throw Error("Missing Supabase environment variables");let a=(0,s.createClient)(n,i),l=()=>{if(!r)throw Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");return(0,s.createClient)(n,r,{auth:{autoRefreshToken:!1,persistSession:!1},db:{schema:"public"}})}},5634:(e,t,o)=>{function s(e){return"http://localhost:3000"}o.d(t,{SV:()=>s})},4290:(e,t,o)=>{o.a(e,async(e,s)=>{try{o.r(t),o.d(t,{default:()=>d});var n=o(3845),i=o(2394),r=o(7398),a=o(1661),l=o(789),u=o(4397),c=o(8329),m=o(3851),p=e([i,m]);async function d(e,t){if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});let o=e.headers["x-api-key"];if(e.headers.host?.includes("localhost")||e.headers.host?.includes("127.0.0.1"),!process.env.INTERNAL_API_KEY)return console.error("[PIPELINE] INTERNAL_API_KEY not set in environment"),t.status(500).json({error:"Server configuration error: INTERNAL_API_KEY not set"});if(o!==process.env.INTERNAL_API_KEY)return console.error("[PIPELINE] Invalid API key provided:",o?"key provided but incorrect":"no key provided"),t.status(401).json({error:"Unauthorized"});let{reportId:s,force:p=!1}=e.body;if(!s)return t.status(400).json({error:"Report ID required"});let d=Date.now();console.log("[PIPELINE] Starting processing for report:",s),console.log("[PIPELINE] Force reprocess:",p);let h=(0,n.p)();try{let{data:o,error:n}=await h.from("ai_reports").select(`
        *,
        quiz_responses!inner(
          id,
          responses,
          user_email,
          user_first_name,
          user_last_name,
          user_company,
          industry,
          company_size
        )
      `).eq("id",s).single();if(n||!o)return console.error("[PIPELINE] Failed to fetch report:",n),t.status(404).json({error:"Report not found"});let g=Array.isArray(o.quiz_responses)?o.quiz_responses[0]:o.quiz_responses;if(!g)return console.error("[PIPELINE] No quiz data found for report"),t.status(400).json({error:"No quiz data found"});if(console.log("[PIPELINE] Current report status:",o.report_status),console.log("[PIPELINE] Quiz response ID:",g.id),"completed"===o.report_status&&!p)return console.log("[PIPELINE] Report already completed, skipping"),t.status(200).json({success:!0,message:"Report already completed",status:"completed"});let y=process.env.WRITE_UP_MODEL||"claude-4",f=o.stage1_problem_analysis,I=o.stage2_tool_research,b=o.stage3_tool_selection,v=o.stage4_report_content;if(!f||p){let e;console.log("[PIPELINE] Stage 1: Analyzing problems...");let t=m.q.getStepConfig(1);console.log("[PIPELINE] Step 1 config:",JSON.stringify(t));let o=m.q.getProvider(t.provider,t.model);console.log(`[PIPELINE] Step 1 provider: ${o.getName()}, model: ${t.model}`);let n=(0,r.p)(g.responses,g.user_company);"openai"===t.provider?(console.log("[PIPELINE] Using GPT-5 mini for Stage 1"),e=await o.generateCompletion({prompt:n,temperature:.3,reasoning_effort:t.reasoning_effort,verbosity:t.verbosity})):(console.log("[PIPELINE] Using Claude for Stage 1"),e=await o.generateCompletion({prompt:n,maxTokens:5e3,temperature:.3}));let i=e.content;f=(0,c.M)(i),console.log("[PIPELINE] Stage 1 JSON size:",JSON.stringify(f).length,"bytes");let{error:a}=await h.from("ai_reports").update({stage1_problem_analysis:f,updated_at:new Date().toISOString()}).eq("id",s);if(a)throw console.error("[PIPELINE] Failed to save Stage 1 to database:",a),Error(`Failed to save Stage 1: ${a.message}`);console.log("[PIPELINE] Stage 1 complete and saved")}if(!I||p){console.log("[PIPELINE] Stage 2: Researching tools...");let e=m.q.getStepConfig(2);console.log("[PIPELINE] Step 2 config:",JSON.stringify(e));let t=m.q.getProvider(e.provider,e.model);console.log(`[PIPELINE] Step 2 provider: ${t.getName()}, model: ${e.model}`);let o=(0,a.L)(f);console.log("[PIPELINE] Using Claude for Stage 2 (web search)");let n=(await t.generateCompletion({prompt:o,maxTokens:15e3,temperature:.4})).content;I=(0,c.M)(n),console.log("[PIPELINE] Stage 2 JSON size:",JSON.stringify(I).length,"bytes");let{error:i}=await h.from("ai_reports").update({stage2_tool_research:I,updated_at:new Date().toISOString()}).eq("id",s);if(i)throw console.error("[PIPELINE] Failed to save Stage 2 to database:",i),Error(`Failed to save Stage 2: ${i.message}`);console.log("[PIPELINE] Stage 2 complete and saved")}if(!b||p){let e;console.log("[PIPELINE] Stage 3: Curating tools...");let t=m.q.getStepConfig(3);console.log("[PIPELINE] Step 3 config:",JSON.stringify(t));let o=m.q.getProvider(t.provider,t.model);console.log(`[PIPELINE] Step 3 provider: ${o.getName()}, model: ${t.model}`);let n=(0,l.N)(f,I);"openai"===t.provider?(console.log("[PIPELINE] Using GPT-5 mini for Stage 3"),e=await o.generateCompletion({prompt:n,temperature:.3,reasoning_effort:t.reasoning_effort,verbosity:t.verbosity})):(console.log("[PIPELINE] Using Claude for Stage 3"),e=await o.generateCompletion({prompt:n,maxTokens:12e3,temperature:.3}));let i=e.content;b=(0,c.M)(i),console.log("[PIPELINE] Stage 3 JSON size:",JSON.stringify(b).length,"bytes");let{error:r}=await h.from("ai_reports").update({stage3_tool_selection:b,updated_at:new Date().toISOString()}).eq("id",s);if(r)throw console.error("[PIPELINE] Failed to save Stage 3 to database:",r),Error(`Failed to save Stage 3: ${r.message}`);console.log("[PIPELINE] Stage 3 complete and saved")}if(!v||p){console.log("[PIPELINE] Stage 4: Generating final report...");let e=b?.clientSolution||b,t=(0,u.p)(f,e),o="";if("gpt-5"===y){console.log("[PIPELINE] Using GPT-5 full for final report");let e=m.q.getProvider("openai","gpt-5");o=(await e.generateCompletion({prompt:t,temperature:.3,reasoning_effort:"medium",verbosity:"high"})).content}else{let e=m.q.getStepConfig(4);console.log("[PIPELINE] Step 4 config:",JSON.stringify(e));let s=m.q.getProvider(e.provider,e.model);console.log(`[PIPELINE] Step 4 provider: ${s.getName()}, model: ${e.model}`),"openai"===e.provider?(console.log("[PIPELINE] Using GPT-5 mini for final report"),o=(await s.generateCompletion({prompt:t,temperature:.3,reasoning_effort:e.reasoning_effort,verbosity:e.verbosity})).content):(console.log("[PIPELINE] Using Claude for final report"),o=(await s.generateCompletion({prompt:t,maxTokens:15e3,temperature:.3})).content)}v=(0,c.M)(o),console.log("[PIPELINE] Stage 4 JSON size:",JSON.stringify(v).length,"bytes");let{error:n}=await h.from("ai_reports").update({stage4_report_content:v,updated_at:new Date().toISOString()}).eq("id",s);if(n)throw console.error("[PIPELINE] Failed to save Stage 4 content to database:",n),Error(`Failed to save Stage 4 content: ${n.message}`);console.log("[PIPELINE] Stage 4 content saved successfully");let{error:i}=await h.from("ai_reports").update({report_status:"completed",updated_at:new Date().toISOString()}).eq("id",s);i?(console.error("[PIPELINE] Failed to update status to completed:",i),console.error("[PIPELINE] Error details:",i.message),console.log("[PIPELINE] WARNING: Report content saved but status not updated to completed")):console.log("[PIPELINE] Report status updated to completed"),console.log("[PIPELINE] Stage 4 complete and saved")}if(!o.email_sent_at||p){console.log("[PIPELINE] Sending report ready email...");let t=await (0,i.Wk)({reportId:s,userEmail:g.user_email,firstName:g.user_first_name||"there",lastName:g.user_last_name||"",company:g.user_company,accessToken:o.access_token,req:e});t.success?console.log("[PIPELINE] Email sent successfully:",t.emailId):console.error("[PIPELINE] Failed to send email:",t.error)}let E=(Date.now()-d)/1e3;console.log("[PIPELINE] Processing complete in",E,"seconds"),t.status(200).json({success:!0,message:"Pipeline processing complete",status:"completed",processingTime:E})}catch(e){console.error("[PIPELINE] Critical error:",e),await h.from("ai_reports").update({report_status:"failed",updated_at:new Date().toISOString()}).eq("id",s),t.status(500).json({error:"Pipeline processing failed",details:e instanceof Error?e.message:"Unknown error"})}}[i,m]=p.then?(await p)():p,s()}catch(e){s(e)}})},1661:(e,t,o)=>{o.d(t,{L:()=>s});function s(e){let t=e.businessContext.companyName||"the organization";return`You have identified 3 specific problems for ${t} in the ${e.businessContext.industry} industry. Now use web search to find the EXACT tools that solve THEIR specific problems.

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

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`}}};var t=require("../../../webpack-api-runtime.js");t.C(e);var o=e=>t(t.s=e),s=t.X(0,[1763,3851],()=>o(4174));module.exports=s})();