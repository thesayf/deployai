"use strict";(()=>{var e={};e.id=9593,e.ids=[9593],e.modules={2885:e=>{e.exports=require("@supabase/supabase-js")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},787:e=>{e.exports=import("@upstash/workflow/nextjs")},6326:e=>{e.exports=import("resend")},6249:(e,o)=>{Object.defineProperty(o,"l",{enumerable:!0,get:function(){return function e(o,t){return t in o?o[t]:"then"in o&&"function"==typeof o.then?o.then(o=>e(o,t)):"function"==typeof o&&"default"===t?o:void 0}}})},5176:(e,o,t)=>{t.a(e,async(e,s)=>{try{t.r(o),t.d(o,{config:()=>c,default:()=>p,routeModule:()=>d});var r=t(1802),a=t(7153),n=t(6249),i=t(2823),l=e([i]);i=(l.then?(await l)():l)[0];let p=(0,n.l)(i,"default"),c=(0,n.l)(i,"config"),d=new r.PagesAPIRouteModule({definition:{kind:a.x.PAGES_API,page:"/api/workflow/process-pipeline",pathname:"/api/workflow/process-pipeline",bundlePath:"",filename:""},userland:i});s()}catch(e){s(e)}})},9930:(e,o,t)=>{t.d(o,{K:()=>s,g:()=>r});let s={senders:{assessment:"AI Assessment <assessment@deployai.studio>",reports:"AI Reports <reports@deployai.studio>",fallback:"deployAI <hello@deployai.studio>"},subjects:{confirmation:"Assessment Received - Processing Your Results",reportReady:e=>`Assessment Report Ready${e?` - ${e}`:""}`},timing:{reportGenerationMinutes:"5-10 minutes",reportAvailabilityDays:30}};function r(e){let o=s.senders[e];return console.log(`[EMAIL] Using ${e} sender: ${o}`),o}},697:(e,o,t)=>{t.d(o,{M:()=>s});function s(e){return`
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
  `}},2394:(e,o,t)=>{t.a(e,async(e,s)=>{try{t.d(o,{Wk:()=>d,Xt:()=>c,rJ:()=>u});var r=t(6326),a=t(3845),n=t(697),i=t(9930),l=t(5634),p=e([r]);let g=new(r=(p.then?(await p)():p)[0]).Resend(process.env.RESEND_API_KEY);async function c({quizId:e,reportId:o,userEmail:t,firstName:s,lastName:r,company:n}){console.log("[CONFIRMATION-EMAIL] Sending confirmation email"),console.log("[CONFIRMATION-EMAIL] Quiz ID:",e),console.log("[CONFIRMATION-EMAIL] Report ID:",o),console.log("[CONFIRMATION-EMAIL] User email:",t);try{let o=(0,a.p)(),{data:r}=await o.from("quiz_responses").select("industry, company_size").eq("id",e).single(),l=`
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
            
            <p>Thank you for completing the AI Readiness Assessment${n?` for ${n}`:""}. Our AI is currently analyzing your responses to identify the best opportunities for AI implementation in your business.</p>
            
            <div class="score-preview">
              <h3>Analysis in Progress</h3>
              <p style="font-size: 24px; color: #457B9D; margin: 10px 0;">🔍 Identifying AI Opportunities</p>
              <p style="color: #666;">Our AI is researching solutions specific to your ${r?.industry||"industry"}</p>
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
    `,{data:p,error:c}=await g.emails.send({from:(0,i.g)("assessment"),to:[t],subject:i.K.subjects.confirmation,html:l,tags:[{name:"type",value:"assessment-confirmation"},{name:"quiz_id",value:e}]});if(c)return console.error("[CONFIRMATION-EMAIL] Failed to send email:",c),console.error("[CONFIRMATION-EMAIL] Error details:",JSON.stringify(c,null,2)),{success:!1,error:c.message||"Failed to send email"};return console.log("[CONFIRMATION-EMAIL] Email sent successfully to:",t),console.log("[CONFIRMATION-EMAIL] Email ID:",p?.id),{success:!0,emailId:p?.id}}catch(e){return console.error("[CONFIRMATION-EMAIL] Exception:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}async function d({reportId:e,userEmail:o,firstName:t,lastName:s,company:r,accessToken:p,req:c}){console.log("[REPORT-EMAIL] Sending report ready email"),console.log("[REPORT-EMAIL] Report ID:",e),console.log("[REPORT-EMAIL] User email:",o);try{let d=c?(0,l.SV)(c):"http://localhost:3000",u=`${d}/report/view/${p}`;console.log("[REPORT-EMAIL] Report URL:",u);let m=(0,n.M)({firstName:t,lastName:s,company:r,reportUrl:u}),{data:y,error:f}=await g.emails.send({from:(0,i.g)("assessment"),to:[o],subject:i.K.subjects.reportReady(r),html:m,tags:[{name:"type",value:"report-ready"},{name:"report_id",value:e}]});if(f)return console.error("[REPORT-EMAIL] Failed to send email:",f),console.error("[REPORT-EMAIL] Error details:",JSON.stringify(f,null,2)),{success:!1,error:f.message||"Failed to send email"};console.log("[REPORT-EMAIL] Email sent successfully!"),console.log("[REPORT-EMAIL] Email ID:",y?.id);let h=(0,a.p)();return await h.from("ai_reports").update({email_sent_at:new Date().toISOString(),report_status:"completed"}).eq("id",e),{success:!0,emailId:y?.id}}catch(e){return console.error("[REPORT-EMAIL] Exception:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}async function u({name:e,company:o,email:t,phone:s,message:r,type:a}){console.log("[CONTACT-EMAIL] Sending contact form email"),console.log("[CONTACT-EMAIL] From:",t);try{let{error:n}=await g.emails.send({from:"hello@deployai.studio",to:"hello@deployai.studio",replyTo:t,subject:`New ${"company"===a?"Company":"Individual"} Inquiry from ${e}`,html:`
        <h2>New Contact Form Submission</h2>
        <p><strong>Type:</strong> ${"company"===a?"Company":"Individual"}</p>
        <p><strong>Name:</strong> ${e}</p>
        ${o?`<p><strong>Company:</strong> ${o}</p>`:""}
        <p><strong>Email:</strong> ${t}</p>
        ${s?`<p><strong>Phone:</strong> ${s}</p>`:""}
        <hr />
        <h3>Message:</h3>
        <p>${r.replace(/\n/g,"<br>")}</p>
      `,text:`
        New Contact Form Submission
        
        Type: ${"company"===a?"Company":"Individual"}
        Name: ${e}
        ${o?`Company: ${o}`:""}
        Email: ${t}
        ${s?`Phone: ${s}`:""}
        
        Message:
        ${r}
      `});if(n)return console.error("[CONTACT-EMAIL] Failed to send email:",n),{success:!1,error:n.message||"Failed to send email"};return console.log("[CONTACT-EMAIL] Email sent successfully"),{success:!0}}catch(e){return console.error("[CONTACT-EMAIL] Exception:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}s()}catch(e){s(e)}})},3845:(e,o,t)=>{t.d(o,{O:()=>i,p:()=>l});var s=t(2885);let r="https://nwddsjghbyrerhhnciuk.supabase.co",a="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ZGRzamdoYnlyZXJoaG5jaXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzIxMjMsImV4cCI6MjA2OTA0ODEyM30.8aXGuUq7occc15txLZJqQEYiLTKZNJ2Vsqb-oKh-g_U",n=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!r||!a)throw Error("Missing Supabase environment variables");let i=(0,s.createClient)(r,a),l=()=>{if(!n)throw Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");return(0,s.createClient)(r,n,{auth:{autoRefreshToken:!1,persistSession:!1},db:{schema:"public"}})}},5634:(e,o,t)=>{function s(e){return"http://localhost:3000"}t.d(o,{SV:()=>s})},2823:(e,o,t)=>{t.a(e,async(e,s)=>{try{t.r(o),t.d(o,{default:()=>c});var r=t(787),a=t(3845),n=t(2394),i=e([r,n]);[r,n]=i.then?(await i)():i;let l=(()=>{if(process.env.UPSTASH_WORKFLOW_URL)return console.log("[Workflow] Using UPSTASH_WORKFLOW_URL:",process.env.UPSTASH_WORKFLOW_URL),process.env.UPSTASH_WORKFLOW_URL;{let e="http://localhost:3000";return e.startsWith("http://")||e.startsWith("https://")||(e=`https://${e}`),console.log("[Workflow] Using NEXT_PUBLIC_APP_URL:",e),e}})();console.log("[Workflow Init] Base URL:",l||"auto-detect");let{handler:p}=(0,r.servePagesRouter)(async e=>{let{reportId:o,force:t=!1}=e.requestPayload,s=Date.now();console.log("[Workflow] Starting pipeline for report:",o),console.log("[Workflow] Force reprocess:",t);let r=await e.run("fetch-report",async()=>{let e=(0,a.p)(),{data:s,error:r}=await e.from("ai_reports").select(`
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
        `).eq("id",o).single();if(r||!s)throw Error(`Report not found: ${o}`);let n=Array.isArray(s.quiz_responses)?s.quiz_responses[0]:s.quiz_responses;if(!n)throw Error("No quiz data found for report");return(console.log("[Workflow] Report fetched, status:",s.report_status),"generating"!==s.report_status||t)?"completed"!==s.report_status||t?{alreadyCompleted:!1,alreadyProcessing:!1,report:s,quizData:n}:(console.log("[Workflow] Report already completed, skipping"),{alreadyCompleted:!0,report:s,quizData:n}):(console.log("[Workflow] Report already being generated, skipping duplicate"),{alreadyProcessing:!0})});if(r.alreadyProcessing)return{success:!0,message:"Report already being generated",status:"generating"};if(r.alreadyCompleted)return{success:!0,message:"Report already completed",status:"completed"};let{report:i,quizData:l}=r;await e.run("set-processing",async()=>{let e=(0,a.p)(),{error:t}=await e.from("ai_reports").update({report_status:"generating",updated_at:new Date().toISOString()}).eq("id",o);t?console.error("[Workflow] Failed to set processing status:",t):console.log("[Workflow] Set report status to generating")});let p="http://localhost:3000";!p&&process.env.VERCEL_URL&&(p=`https://${process.env.VERCEL_URL}`),p||(p="http://localhost:3002"),p.startsWith("http://")||p.startsWith("https://")||(p=`https://${p}`),console.log("[Workflow] Base URL for API calls:",p),console.log("[Workflow] Environment check - NEXT_PUBLIC_APP_URL:","http://localhost:3000"),console.log("[Workflow] Environment check - VERCEL_URL:",process.env.VERCEL_URL);let c=i.stage1_problem_analysis;if(!c||t){console.log("[Workflow] Stage 1: Analyzing problems...");let{body:t}=await e.call("stage1-analysis",{url:`${p}/api/ai/step1`,method:"POST",headers:{"Content-Type":"application/json"},body:{responses:l.responses,company:l.user_company}});if(!t.success)throw Error("Stage 1 failed");c=t.data,await e.run("save-stage1",async()=>{let e=(0,a.p)(),{error:t}=await e.from("ai_reports").update({stage1_problem_analysis:c,updated_at:new Date().toISOString()}).eq("id",o);if(t)throw Error(`Failed to save Stage 1: ${t.message}`);console.log("[Workflow] Stage 1 complete and saved")})}let d=i.stage2_tool_research;if(!d||t){console.log("[Workflow] Stage 2: Researching tools...");let{body:t}=await e.call("stage2-research",{url:`${p}/api/ai/step2`,method:"POST",headers:{"Content-Type":"application/json"},body:{problemAnalysis:c}});if(!t.success)throw Error("Stage 2 failed");d=t.data,await e.run("save-stage2",async()=>{let e=(0,a.p)(),{error:t}=await e.from("ai_reports").update({stage2_tool_research:d,updated_at:new Date().toISOString()}).eq("id",o);if(t)throw Error(`Failed to save Stage 2: ${t.message}`);console.log("[Workflow] Stage 2 complete and saved")})}let u=i.stage3_tool_selection;if(!u||t){console.log("[Workflow] Stage 3: Curating tools...");let{body:t}=await e.call("stage3-curation",{url:`${p}/api/ai/step3`,method:"POST",headers:{"Content-Type":"application/json"},body:{problemAnalysis:c,toolResearch:d}});if(!t.success)throw Error("Stage 3 failed");u=t.data,await e.run("save-stage3",async()=>{let e=(0,a.p)(),{error:t}=await e.from("ai_reports").update({stage3_tool_selection:u,updated_at:new Date().toISOString()}).eq("id",o);if(t)throw Error(`Failed to save Stage 3: ${t.message}`);console.log("[Workflow] Stage 3 complete and saved")})}let g=i.stage4_report_content;if(!g||t){console.log("[Workflow] Stage 4: Generating final report...");let{body:t}=await e.call("stage4-report",{url:`${p}/api/ai/step4`,method:"POST",headers:{"Content-Type":"application/json"},body:{problemAnalysis:c,curatedTools:u,writeUpModel:process.env.WRITE_UP_MODEL}});if(!t.success)throw Error("Stage 4 failed");g=t.data,await e.run("save-stage4",async()=>{let e=(0,a.p)(),{error:t}=await e.from("ai_reports").update({stage4_report_content:g,updated_at:new Date().toISOString()}).eq("id",o);if(t)throw Error(`Failed to save Stage 4 content: ${t.message}`);let{error:s}=await e.from("ai_reports").update({report_status:"completed",updated_at:new Date().toISOString()}).eq("id",o);s&&console.error("[Workflow] Failed to update status:",s.message),console.log("[Workflow] Stage 4 complete and saved")})}(!i.email_sent_at||t)&&await e.run("send-email",async()=>{console.log("[Workflow] Sending report ready email...");let e=await (0,n.Wk)({reportId:o,userEmail:l.user_email,firstName:l.user_first_name||"there",lastName:l.user_last_name||"",company:l.user_company,accessToken:i.access_token,req:{headers:{host:"http://localhost:3000".replace(/https?:\/\//,"")||0}}});e.success?console.log("[Workflow] Email sent successfully:",e.emailId):console.error("[Workflow] Failed to send email:",e.error)});let m=(Date.now()-s)/1e3;return console.log("[Workflow] Pipeline complete in",m,"seconds"),{success:!0,message:"Pipeline processing complete",status:"completed",processingTime:m}},{...l?{baseUrl:l}:{},failureFunction:async({context:e,failStatus:o,failResponse:t})=>{console.error("[Workflow] Pipeline failed:",o,t);let{reportId:s}=e.requestPayload,r=(0,a.p)();await r.from("ai_reports").update({report_status:"failed",updated_at:new Date().toISOString()}).eq("id",s)}}),c=p;s()}catch(e){s(e)}})},7153:(e,o)=>{var t;Object.defineProperty(o,"x",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},1802:(e,o,t)=>{e.exports=t(145)}};var o=require("../../../webpack-api-runtime.js");o.C(e);var t=o(o.s=5176);module.exports=t})();