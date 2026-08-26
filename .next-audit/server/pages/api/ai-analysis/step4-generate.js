"use strict";(()=>{var e={};e.id=8478,e.ids=[8478],e.modules={2885:e=>{e.exports=require("@supabase/supabase-js")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},7174:e=>{e.exports=import("@anthropic-ai/sdk")},2079:e=>{e.exports=import("openai")},6326:e=>{e.exports=import("resend")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,o){return o in t?t[o]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,o)):"function"==typeof t&&"default"===o?t:void 0}}})},8761:(e,t,o)=>{o.a(e,async(e,s)=>{try{o.r(t),o.d(t,{config:()=>u,default:()=>c,routeModule:()=>m});var n=o(1802),r=o(7153),i=o(6249),a=o(7983),l=e([a]);a=(l.then?(await l)():l)[0];let c=(0,i.l)(a,"default"),u=(0,i.l)(a,"config"),m=new n.PagesAPIRouteModule({definition:{kind:r.x.PAGES_API,page:"/api/ai-analysis/step4-generate",pathname:"/api/ai-analysis/step4-generate",bundlePath:"",filename:""},userland:a});s()}catch(e){s(e)}})},9930:(e,t,o)=>{o.d(t,{K:()=>s,g:()=>n});let s={senders:{assessment:"AI Assessment <assessment@deployai.studio>",reports:"AI Reports <reports@deployai.studio>",fallback:"deployAI <hello@deployai.studio>"},subjects:{confirmation:"Assessment Received - Processing Your Results",reportReady:e=>`Assessment Report Ready${e?` - ${e}`:""}`},timing:{reportGenerationMinutes:"5-10 minutes",reportAvailabilityDays:30}};function n(e){let t=s.senders[e];return console.log(`[EMAIL] Using ${e} sender: ${t}`),t}},697:(e,t,o)=>{o.d(t,{M:()=>s});function s(e){return`
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
  `}},2394:(e,t,o)=>{o.a(e,async(e,s)=>{try{o.d(t,{Wk:()=>m,Xt:()=>u,rJ:()=>p});var n=o(6326),r=o(3845),i=o(697),a=o(9930),l=o(5634),c=e([n]);let d=new(n=(c.then?(await c)():c)[0]).Resend(process.env.RESEND_API_KEY);async function u({quizId:e,reportId:t,userEmail:o,firstName:s,lastName:n,company:i}){console.log("[CONFIRMATION-EMAIL] Sending confirmation email"),console.log("[CONFIRMATION-EMAIL] Quiz ID:",e),console.log("[CONFIRMATION-EMAIL] Report ID:",t),console.log("[CONFIRMATION-EMAIL] User email:",o);try{let t=(0,r.p)(),{data:n}=await t.from("quiz_responses").select("industry, company_size").eq("id",e).single(),l=`
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
            
            <p>Thank you for completing the AI Readiness Assessment${i?` for ${i}`:""}. Our AI is currently analyzing your responses to identify the best opportunities for AI implementation in your business.</p>
            
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
    `,{data:c,error:u}=await d.emails.send({from:(0,a.g)("assessment"),to:[o],subject:a.K.subjects.confirmation,html:l,tags:[{name:"type",value:"assessment-confirmation"},{name:"quiz_id",value:e}]});if(u)return console.error("[CONFIRMATION-EMAIL] Failed to send email:",u),console.error("[CONFIRMATION-EMAIL] Error details:",JSON.stringify(u,null,2)),{success:!1,error:u.message||"Failed to send email"};return console.log("[CONFIRMATION-EMAIL] Email sent successfully to:",o),console.log("[CONFIRMATION-EMAIL] Email ID:",c?.id),{success:!0,emailId:c?.id}}catch(e){return console.error("[CONFIRMATION-EMAIL] Exception:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}async function m({reportId:e,userEmail:t,firstName:o,lastName:s,company:n,accessToken:c,req:u}){console.log("[REPORT-EMAIL] Sending report ready email"),console.log("[REPORT-EMAIL] Report ID:",e),console.log("[REPORT-EMAIL] User email:",t);try{let m=u?(0,l.SV)(u):"http://localhost:3000",p=`${m}/report/view/${c}`;console.log("[REPORT-EMAIL] Report URL:",p);let g=(0,i.M)({firstName:o,lastName:s,company:n,reportUrl:p}),{data:h,error:y}=await d.emails.send({from:(0,a.g)("assessment"),to:[t],subject:a.K.subjects.reportReady(n),html:g,tags:[{name:"type",value:"report-ready"},{name:"report_id",value:e}]});if(y)return console.error("[REPORT-EMAIL] Failed to send email:",y),console.error("[REPORT-EMAIL] Error details:",JSON.stringify(y,null,2)),{success:!1,error:y.message||"Failed to send email"};console.log("[REPORT-EMAIL] Email sent successfully!"),console.log("[REPORT-EMAIL] Email ID:",h?.id);let f=(0,r.p)();return await f.from("ai_reports").update({email_sent_at:new Date().toISOString(),report_status:"completed"}).eq("id",e),{success:!0,emailId:h?.id}}catch(e){return console.error("[REPORT-EMAIL] Exception:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}async function p({name:e,company:t,email:o,phone:s,message:n,type:r}){console.log("[CONTACT-EMAIL] Sending contact form email"),console.log("[CONTACT-EMAIL] From:",o);try{let{error:i}=await d.emails.send({from:"hello@deployai.studio",to:"hello@deployai.studio",replyTo:o,subject:`New ${"company"===r?"Company":"Individual"} Inquiry from ${e}`,html:`
        <h2>New Contact Form Submission</h2>
        <p><strong>Type:</strong> ${"company"===r?"Company":"Individual"}</p>
        <p><strong>Name:</strong> ${e}</p>
        ${t?`<p><strong>Company:</strong> ${t}</p>`:""}
        <p><strong>Email:</strong> ${o}</p>
        ${s?`<p><strong>Phone:</strong> ${s}</p>`:""}
        <hr />
        <h3>Message:</h3>
        <p>${n.replace(/\n/g,"<br>")}</p>
      `,text:`
        New Contact Form Submission
        
        Type: ${"company"===r?"Company":"Individual"}
        Name: ${e}
        ${t?`Company: ${t}`:""}
        Email: ${o}
        ${s?`Phone: ${s}`:""}
        
        Message:
        ${n}
      `});if(i)return console.error("[CONTACT-EMAIL] Failed to send email:",i),{success:!1,error:i.message||"Failed to send email"};return console.log("[CONTACT-EMAIL] Email sent successfully"),{success:!0}}catch(e){return console.error("[CONTACT-EMAIL] Exception:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}s()}catch(e){s(e)}})},3845:(e,t,o)=>{o.d(t,{O:()=>a,p:()=>l});var s=o(2885);let n="https://nwddsjghbyrerhhnciuk.supabase.co",r="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ZGRzamdoYnlyZXJoaG5jaXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzIxMjMsImV4cCI6MjA2OTA0ODEyM30.8aXGuUq7occc15txLZJqQEYiLTKZNJ2Vsqb-oKh-g_U",i=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!n||!r)throw Error("Missing Supabase environment variables");let a=(0,s.createClient)(n,r),l=()=>{if(!i)throw Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");return(0,s.createClient)(n,i,{auth:{autoRefreshToken:!1,persistSession:!1},db:{schema:"public"}})}},5634:(e,t,o)=>{function s(e){return"http://localhost:3000"}o.d(t,{SV:()=>s})},7983:(e,t,o)=>{o.a(e,async(e,s)=>{try{o.r(t),o.d(t,{default:()=>m});var n=o(3845),r=o(4397),i=o(2394),a=o(8329),l=o(7174),c=o(2079),u=e([i,l,c]);async function m(e,t){if(console.log("[STEP4] Handler called. Method:",e.method),"POST"!==e.method)return console.error("[STEP4] ERROR - Invalid method:",e.method),t.status(405).json({error:"Method not allowed"});let o=e.headers["x-api-key"];if(console.log("[STEP4] API Key check - Received:",o?"Present":"Missing"),o!==process.env.INTERNAL_API_KEY)return console.error("[STEP4] ERROR - Unauthorized. Key mismatch"),t.status(401).json({error:"Unauthorized"});console.log("[STEP4] Authentication passed");let s=Date.now();console.log("[STEP4] Function start time:",new Date().toISOString());let u=setTimeout(()=>{console.error("[STEP4] ⚠️ WARNING: 9 seconds elapsed - Hobby plan timeout in 1 second!")},9e3),m=setTimeout(()=>{console.error("[STEP4] ⚠️ WARNING: 50 seconds elapsed - Pro plan timeout in 10 seconds!")},5e4);try{let o;let{quizResponseId:p,reportId:d,problemAnalysis:g,curatedTools:h}=e.body;console.log("[STEP4] Starting report generation for:"),console.log("[STEP4] Report ID:",d),console.log("[STEP4] Quiz Response ID:",p),console.log("[STEP4] Elapsed time:",(Date.now()-s)/1e3,"seconds"),console.log("[STEP4] ProblemAnalysis received:",!!g),console.log("[STEP4] CuratedTools received:",!!h),console.log("[STEP4] Selected tools count:",h?.selectedTools?.length);let y=(0,n.p)(),f=process.env.WRITE_UP_MODEL||"claude-4";console.log("[STEP4] Using model:",f);let E=(0,r.p)(g,h);console.log("[STEP4] Prompt generated. Length:",E.length);let S="";if("gpt-5"===f){let e=new c.default({apiKey:process.env.OPENAI_API_KEY});console.log("[STEP4] Calling GPT-5 API (full model)...");try{let t=await e.chat.completions.create({model:"gpt-5",messages:[{role:"system",content:"You are an AI business consultant creating professional reports. You must return only valid JSON without any explanations or markdown. The output must be a JSON object."},{role:"user",content:E}],max_completion_tokens:25e3,response_format:{type:"json_object"},reasoning_effort:"medium",verbosity:"medium"});console.log("[STEP4] GPT-5 API response received"),console.log("[STEP4] Finish reason:",t.choices[0].finish_reason),console.log("[STEP4] Model used:",t.model),S=t.choices[0].message.content||""}catch(e){throw console.error("[STEP4] GPT-5 API error:",e),e}}else{let e=new l.default({apiKey:process.env.ANTHROPIC_API_KEY});console.log("[STEP4] Calling Claude API...");let t=await e.messages.create({model:"claude-sonnet-4-20250514",max_tokens:15e3,temperature:.3,messages:[{role:"user",content:E}]});console.log("[STEP4] Claude API response received"),S="text"===t.content[0].type?t.content[0].text:""}console.log("[STEP4] Response content length:",S.length);try{if(console.log("[STEP4] Attempting to parse JSON response..."),o=(0,a.M)(S),console.log("[STEP4] SUCCESS - Parsed final report"),console.log("[STEP4] Final report structure:",Object.keys(o)),console.log("[STEP4] Recommendations count:",o.recommendedSolutions?.length),o.executiveSummary?.readinessLevel){let e=o.executiveSummary.readinessLevel,t=e.split(/[\s—-]/)[0].trim();if(["High","Medium","Low"].includes(t)){if(e.length>t.length&&!o.executiveSummary.readinessExplanation){let s=e.substring(t.length).replace(/^[\s—-]+/,"").trim();s&&(o.executiveSummary.readinessExplanation=s)}o.executiveSummary.readinessLevel=t,console.log("[STEP4] Readiness level validated:",t)}else console.warn("[STEP4] Invalid readiness level received:",e,"- defaulting to Medium"),o.executiveSummary.readinessLevel="Medium",o.executiveSummary.readinessExplanation="Assessment requires further review"}}catch(e){throw console.error("[STEP4] ERROR - Failed to parse AI response"),console.error("[STEP4] Parse error:",e instanceof Error?e.message:e),console.error("[STEP4] Response content preview:",S.substring(0,500)),Error("Invalid AI response format in Step 4")}console.log("[STEP4] About to update report with final content..."),console.log("[STEP4] Report ID:",d),console.log("[STEP4] Post-AI elapsed time:",(Date.now()-s)/1e3,"seconds");let T=new Date().toISOString();console.log("[STEP4] email_sent_at timestamp:",T);let{error:I}=await y.from("ai_reports").update({stage4_report_content:o,report_status:"completed",email_sent_at:T,updated_at:new Date().toISOString()}).eq("id",d);if(I)throw console.error("[STEP4] ❌ Error updating report:",I),console.error("[STEP4] Update error details:",JSON.stringify(I)),I;console.log("[STEP4] ✅ Report update completed successfully"),console.log("[STEP4] Updated: stage4_report_content, report_status, email_sent_at, updated_at"),console.log("[STEP4] Starting email preparation..."),console.log("[STEP4] Getting report and user data for email...");let{data:b,error:A}=await y.from("ai_reports").select(`
        access_token,
        quiz_responses!inner(
          user_email,
          user_first_name,
          user_last_name,
          user_company
        )
      `).eq("id",d).single();if(console.log("[STEP4] Fetch complete. Data returned:",!!b),console.log("[STEP4] Fetch error:",A?JSON.stringify(A):"none"),A||!b)console.error("[STEP4] ERROR - Failed to fetch data for email:",A),console.error("[STEP4] Query failed - no email will be sent");else{console.log("[STEP4] Quiz responses found:",!!b.quiz_responses);let t=Array.isArray(b.quiz_responses)?b.quiz_responses[0]:b.quiz_responses,o=t?.user_email;if(console.log("[STEP4] Extracted user email:",o||"NONE"),o){console.log("[STEP4] About to call sendReportReadyEmail..."),console.log("[STEP4] Email params:",{reportId:d,userEmail:o,firstName:t.user_first_name||"there",lastName:t.user_last_name||"",company:t.user_company,hasAccessToken:!!b.access_token});let s=await (0,i.Wk)({reportId:d,userEmail:o,firstName:t.user_first_name||"there",lastName:t.user_last_name||"",company:t.user_company,accessToken:b.access_token,req:e});console.log("[STEP4] Email send attempt complete"),console.log("[STEP4] Email result:",JSON.stringify(s)),s.success?console.log("[STEP4] SUCCESS - Email sent! ID:",s.emailId):console.error("[STEP4] ERROR - Email failed:",s.error)}else console.error("[STEP4] ERROR - No email address found"),console.error("[STEP4] User data structure:",JSON.stringify(t))}console.log("[STEP4] Function completing, returning success response"),console.log("[STEP4] Total elapsed time:",(Date.now()-s)/1e3,"seconds"),clearTimeout(u),clearTimeout(m),t.status(200).json({success:!0,message:"Report generation complete",reportId:d})}catch(s){console.error("[STEP4] CRITICAL ERROR in step 4 generation"),s instanceof Error?(console.error("[STEP4] Error type:",s.name),console.error("[STEP4] Error message:",s.message),console.error("[STEP4] Error stack:",s.stack)):console.error("[STEP4] Unknown error:",s);let o=(0,n.p)();await o.from("ai_reports").update({report_status:"failed",updated_at:new Date().toISOString()}).eq("id",e.body.reportId),t.status(500).json({error:"Failed to generate report",details:s instanceof Error?s.message:"Unknown error"})}}[i,l,c]=u.then?(await u)():u,s()}catch(e){s(e)}})},4397:(e,t,o)=>{o.d(t,{p:()=>s});function s(e,t){let o=e.businessContext.companyName||"Your organization";return`You are creating a persuasive AI readiness report. Your job is to transform solution data into compelling executive communication that feels personalized to ${o} in the ${e.businessContext.industry} industry.

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

CRITICAL: Return ONLY the JSON object. Do not include any text before or after the JSON. Do not wrap in markdown code blocks. Do not add explanations. Start with { and end with }`}},8329:(e,t,o)=>{function s(e){try{return JSON.parse(e)}catch(s){let t=e,o=(t=(t=(t=(t=(t=(t=(t=t.replace(/^```json\s*\n?/gm,"")).replace(/^```\s*$/gm,"")).replace(/\/\*[\s\S]*?\*\//g,"")).replace(/\/\/.*$/gm,"")).replace(/,\s*([}\]])/g,"$1")).replace(/^\uFEFF/,"")).trim()).match(/(\{[\s\S]*\}|\[[\s\S]*\])/);o&&(t=o[1]);try{return JSON.parse(t)}catch(s){let e=t.indexOf("{"),o=t.lastIndexOf("}");if(-1!==e&&-1!==o&&o>e){let s=t.substring(e,o+1);try{return JSON.parse(s)}catch(e){throw console.error("Failed to parse JSON after cleaning:",t),Error(`Failed to parse JSON: ${e instanceof Error?e.message:"Unknown error"}`)}}throw Error(`Failed to parse JSON: ${s instanceof Error?s.message:"Unknown error"}`)}}}o.d(t,{M:()=>s})},7153:(e,t)=>{var o;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return o}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(o||(o={}))},1802:(e,t,o)=>{e.exports=o(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var o=t(t.s=8761);module.exports=o})();