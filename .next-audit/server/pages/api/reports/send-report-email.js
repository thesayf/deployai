"use strict";(()=>{var e={};e.id=8718,e.ids=[8718],e.modules={2885:e=>{e.exports=require("@supabase/supabase-js")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6326:e=>{e.exports=import("resend")},6249:(e,o)=>{Object.defineProperty(o,"l",{enumerable:!0,get:function(){return function e(o,r){return r in o?o[r]:"then"in o&&"function"==typeof o.then?o.then(o=>e(o,r)):"function"==typeof o&&"default"===r?o:void 0}}})},5299:(e,o,r)=>{r.a(e,async(e,s)=>{try{r.r(o),r.d(o,{config:()=>d,default:()=>p,routeModule:()=>c});var t=r(1802),n=r(7153),i=r(6249),a=r(4656),l=e([a]);a=(l.then?(await l)():l)[0];let p=(0,i.l)(a,"default"),d=(0,i.l)(a,"config"),c=new t.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/reports/send-report-email",pathname:"/api/reports/send-report-email",bundlePath:"",filename:""},userland:a});s()}catch(e){s(e)}})},9930:(e,o,r)=>{r.d(o,{K:()=>s,g:()=>t});let s={senders:{assessment:"AI Assessment <assessment@deployai.studio>",reports:"AI Reports <reports@deployai.studio>",fallback:"deployAI <hello@deployai.studio>"},subjects:{confirmation:"Assessment Received - Processing Your Results",reportReady:e=>`Assessment Report Ready${e?` - ${e}`:""}`},timing:{reportGenerationMinutes:"5-10 minutes",reportAvailabilityDays:30}};function t(e){let o=s.senders[e];return console.log(`[EMAIL] Using ${e} sender: ${o}`),o}},697:(e,o,r)=>{r.d(o,{M:()=>s});function s(e){return`
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
  `}},2394:(e,o,r)=>{r.a(e,async(e,s)=>{try{r.d(o,{Wk:()=>c,Xt:()=>d,rJ:()=>u});var t=r(6326),n=r(3845),i=r(697),a=r(9930),l=r(5634),p=e([t]);let m=new(t=(p.then?(await p)():p)[0]).Resend(process.env.RESEND_API_KEY);async function d({quizId:e,reportId:o,userEmail:r,firstName:s,lastName:t,company:i}){console.log("[CONFIRMATION-EMAIL] Sending confirmation email"),console.log("[CONFIRMATION-EMAIL] Quiz ID:",e),console.log("[CONFIRMATION-EMAIL] Report ID:",o),console.log("[CONFIRMATION-EMAIL] User email:",r);try{let o=(0,n.p)(),{data:t}=await o.from("quiz_responses").select("industry, company_size").eq("id",e).single(),l=`
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
              <p style="color: #666;">Our AI is researching solutions specific to your ${t?.industry||"industry"}</p>
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
    `,{data:p,error:d}=await m.emails.send({from:(0,a.g)("assessment"),to:[r],subject:a.K.subjects.confirmation,html:l,tags:[{name:"type",value:"assessment-confirmation"},{name:"quiz_id",value:e}]});if(d)return console.error("[CONFIRMATION-EMAIL] Failed to send email:",d),console.error("[CONFIRMATION-EMAIL] Error details:",JSON.stringify(d,null,2)),{success:!1,error:d.message||"Failed to send email"};return console.log("[CONFIRMATION-EMAIL] Email sent successfully to:",r),console.log("[CONFIRMATION-EMAIL] Email ID:",p?.id),{success:!0,emailId:p?.id}}catch(e){return console.error("[CONFIRMATION-EMAIL] Exception:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}async function c({reportId:e,userEmail:o,firstName:r,lastName:s,company:t,accessToken:p,req:d}){console.log("[REPORT-EMAIL] Sending report ready email"),console.log("[REPORT-EMAIL] Report ID:",e),console.log("[REPORT-EMAIL] User email:",o);try{let c=d?(0,l.SV)(d):"http://localhost:3000",u=`${c}/report/view/${p}`;console.log("[REPORT-EMAIL] Report URL:",u);let g=(0,i.M)({firstName:r,lastName:s,company:t,reportUrl:u}),{data:y,error:h}=await m.emails.send({from:(0,a.g)("assessment"),to:[o],subject:a.K.subjects.reportReady(t),html:g,tags:[{name:"type",value:"report-ready"},{name:"report_id",value:e}]});if(h)return console.error("[REPORT-EMAIL] Failed to send email:",h),console.error("[REPORT-EMAIL] Error details:",JSON.stringify(h,null,2)),{success:!1,error:h.message||"Failed to send email"};console.log("[REPORT-EMAIL] Email sent successfully!"),console.log("[REPORT-EMAIL] Email ID:",y?.id);let I=(0,n.p)();return await I.from("ai_reports").update({email_sent_at:new Date().toISOString(),report_status:"completed"}).eq("id",e),{success:!0,emailId:y?.id}}catch(e){return console.error("[REPORT-EMAIL] Exception:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}async function u({name:e,company:o,email:r,phone:s,message:t,type:n}){console.log("[CONTACT-EMAIL] Sending contact form email"),console.log("[CONTACT-EMAIL] From:",r);try{let{error:i}=await m.emails.send({from:"hello@deployai.studio",to:"hello@deployai.studio",replyTo:r,subject:`New ${"company"===n?"Company":"Individual"} Inquiry from ${e}`,html:`
        <h2>New Contact Form Submission</h2>
        <p><strong>Type:</strong> ${"company"===n?"Company":"Individual"}</p>
        <p><strong>Name:</strong> ${e}</p>
        ${o?`<p><strong>Company:</strong> ${o}</p>`:""}
        <p><strong>Email:</strong> ${r}</p>
        ${s?`<p><strong>Phone:</strong> ${s}</p>`:""}
        <hr />
        <h3>Message:</h3>
        <p>${t.replace(/\n/g,"<br>")}</p>
      `,text:`
        New Contact Form Submission
        
        Type: ${"company"===n?"Company":"Individual"}
        Name: ${e}
        ${o?`Company: ${o}`:""}
        Email: ${r}
        ${s?`Phone: ${s}`:""}
        
        Message:
        ${t}
      `});if(i)return console.error("[CONTACT-EMAIL] Failed to send email:",i),{success:!1,error:i.message||"Failed to send email"};return console.log("[CONTACT-EMAIL] Email sent successfully"),{success:!0}}catch(e){return console.error("[CONTACT-EMAIL] Exception:",e),{success:!1,error:e instanceof Error?e.message:"Unknown error"}}}s()}catch(e){s(e)}})},3845:(e,o,r)=>{r.d(o,{O:()=>a,p:()=>l});var s=r(2885);let t="https://nwddsjghbyrerhhnciuk.supabase.co",n="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ZGRzamdoYnlyZXJoaG5jaXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzIxMjMsImV4cCI6MjA2OTA0ODEyM30.8aXGuUq7occc15txLZJqQEYiLTKZNJ2Vsqb-oKh-g_U",i=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!t||!n)throw Error("Missing Supabase environment variables");let a=(0,s.createClient)(t,n),l=()=>{if(!i)throw Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");return(0,s.createClient)(t,i,{auth:{autoRefreshToken:!1,persistSession:!1},db:{schema:"public"}})}},5634:(e,o,r)=>{function s(e){return"http://localhost:3000"}r.d(o,{SV:()=>s})},4656:(e,o,r)=>{r.a(e,async(e,s)=>{try{r.r(o),r.d(o,{default:()=>a});var t=r(3845),n=r(2394),i=e([n]);async function a(e,o){if("POST"!==e.method)return o.status(405).json({error:"Method not allowed"});try{let{reportId:r,userEmail:s,firstName:i,lastName:a,company:l}=e.body;if(console.log("[API] Send report email request received"),console.log("[API] Report ID:",r),console.log("[API] User email:",s||"Will fetch from DB"),!r)return console.error("[API] Missing report ID"),o.status(400).json({error:"Report ID is required"});let p=(0,t.p)();console.log("[API] Fetching report and user data...");let{data:d,error:c}=await p.from("ai_reports").select(`
        access_token,
        quiz_responses!inner(
          user_email,
          user_first_name,
          user_last_name,
          user_company
        )
      `).eq("id",r).single();if(c||!d)return console.error("[API] Failed to fetch report:",c),o.status(404).json({error:"Report not found"});console.log("[API] Report access token fetched successfully");let u=Array.isArray(d.quiz_responses)?d.quiz_responses[0]:d.quiz_responses,m=s||u?.user_email,g=i||u?.user_first_name||"there",y=a||u?.user_last_name||"",h=l||u?.user_company;if(!m)return console.error("[API] No email address available"),o.status(400).json({error:"No email address found for this report"});let I=await (0,n.Wk)({reportId:r,userEmail:m,firstName:g,lastName:y,company:h,accessToken:d.access_token,req:e});if(!I.success)return o.status(500).json({error:I.error});o.status(200).json({success:!0,emailId:I.emailId})}catch(e){console.error("Error in send-report-email endpoint:",e),o.status(500).json({error:"Failed to send report email",details:e instanceof Error?e.message:"Unknown error"})}}n=(i.then?(await i)():i)[0],s()}catch(e){s(e)}})},7153:(e,o)=>{var r;Object.defineProperty(o,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1802:(e,o,r)=>{e.exports=r(145)}};var o=require("../../../webpack-api-runtime.js");o.C(e);var r=o(o.s=5299);module.exports=r})();