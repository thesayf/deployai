"use strict";(()=>{var e={};e.id=7664,e.ids=[7664],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6326:e=>{e.exports=import("resend")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},3300:(e,t,r)=>{r.a(e,async(e,o)=>{try{r.r(t),r.d(t,{config:()=>p,default:()=>d,routeModule:()=>c});var n=r(1802),i=r(7153),a=r(6249),l=r(6371),s=e([l]);l=(s.then?(await s)():s)[0];let d=(0,a.l)(l,"default"),p=(0,a.l)(l,"config"),c=new n.PagesAPIRouteModule({definition:{kind:i.x.PAGES_API,page:"/api/mvp-planner/send-report-email",pathname:"/api/mvp-planner/send-report-email",bundlePath:"",filename:""},userland:l});o()}catch(e){o(e)}})},6371:(e,t,r)=>{r.a(e,async(e,o)=>{try{r.r(t),r.d(t,{default:()=>a});var n=r(6326),i=e([n]);let l=new(n=(i.then?(await i)():i)[0]).Resend(process.env.RESEND_API_KEY);async function a(e,t){if(e.headers["x-internal-api-key"]!==process.env.INTERNAL_API_KEY)return t.status(401).json({error:"Unauthorized"});if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let{email:r,firstName:o,projectName:n,accessToken:i}=e.body;if(!r||!o||!n||!i)return t.status(400).json({error:"Missing required fields"});let a=`http://localhost:3000/mvp-planner/report/${i}`,s=`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your MVP Development Plan is Ready</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border: 3px solid #000000; box-shadow: 8px 8px 0px rgba(0, 0, 0, 1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #000000; padding: 40px 40px 30px 40px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px;">
                deployAI studio
              </h1>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #212121; font-size: 28px; margin: 0 0 10px 0; font-weight: 800;">
                Hey ${o}! 🎉
              </h2>
              
              <p style="color: #212121; font-size: 20px; line-height: 1.5; margin: 0 0 30px 0; font-weight: 600;">
                Your MVP development plan for <strong>${n}</strong> is ready!
              </p>
              
              <p style="color: #666666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                We've analyzed your requirements and created a comprehensive development plan including:
              </p>
              
              <ul style="color: #666666; font-size: 16px; line-height: 1.8; margin: 0 0 30px 0; padding-left: 20px;">
                <li><strong>Detailed cost breakdown</strong> with feature prioritization</li>
                <li><strong>Recommended tech stack</strong> optimized for your needs</li>
                <li><strong>4-week development timeline</strong> with weekly deliverables</li>
                <li><strong>Monthly running costs</strong> with service breakdown</li>
                <li><strong>User capabilities</strong> for your MVP</li>
              </ul>
              
              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 40px 0;">
                <tr>
                  <td>
                    <a href="${a}" style="display: inline-block; background-color: #F97316; color: #ffffff; text-decoration: none; padding: 16px 32px; font-size: 18px; font-weight: 700; border: 3px solid #000000; box-shadow: 4px 4px 0px rgba(0, 0, 0, 1); text-transform: uppercase;">
                      View Your MVP Plan →
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                This report will be available for 30 days. We recommend downloading or printing it for your records.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f5f5; padding: 30px 40px; text-align: center; border-top: 3px solid #000000;">
              <p style="color: #666666; font-size: 14px; margin: 0 0 10px 0;">
                Ready to build your MVP? Reply to this email to schedule a consultation.
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0;">
                \xa9 ${new Date().getFullYear()} deployAI studio. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,d=`
Hey ${o}!

Your MVP development plan for ${n} is ready!

We've analyzed your requirements and created a comprehensive development plan including:
- Detailed cost breakdown with feature prioritization
- Recommended tech stack optimized for your needs
- 4-week development timeline with weekly deliverables
- Monthly running costs with service breakdown
- User capabilities for your MVP

View your plan here: ${a}

This report will be available for 30 days. We recommend downloading or printing it for your records.

Ready to build your MVP? Reply to this email to schedule a consultation.

Best regards,
deployAI studio team
    `,{error:p}=await l.emails.send({from:"deployAI studio <noreply@deployai.studio>",to:r,subject:`Your MVP Development Plan for ${n} is Ready!`,html:s,text:d,tags:[{name:"category",value:"mvp-planner-report"}]});if(p)return console.error("Error sending email:",p),t.status(500).json({error:"Failed to send email"});t.status(200).json({success:!0})}catch(e){console.error("Error in send-report-email:",e),t.status(500).json({error:"Internal server error"})}}o()}catch(e){o(e)}})},7153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1802:(e,t,r)=>{e.exports=r(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var r=t(t.s=3300);module.exports=r})();