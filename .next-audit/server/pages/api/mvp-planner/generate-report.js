"use strict";(()=>{var e={};e.id=6695,e.ids=[6695],e.modules={2885:e=>{e.exports=require("@supabase/supabase-js")},145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},7174:e=>{e.exports=import("@anthropic-ai/sdk")},6249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,a){return a in t?t[a]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,a)):"function"==typeof t&&"default"===a?t:void 0}}})},8725:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{config:()=>p,default:()=>l,routeModule:()=>u});var s=a(1802),i=a(7153),o=a(6249),n=a(6849),c=e([n]);n=(c.then?(await c)():c)[0];let l=(0,o.l)(n,"default"),p=(0,o.l)(n,"config"),u=new s.PagesAPIRouteModule({definition:{kind:i.x.PAGES_API,page:"/api/mvp-planner/generate-report",pathname:"/api/mvp-planner/generate-report",bundlePath:"",filename:""},userland:n});r()}catch(e){r(e)}})},6697:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{Xd:()=>o});var s=a(7174),i=e([s]);s=(i.then?(await i)():i)[0];let n=process.env.ANTHROPIC_API_KEY;n||console.error("Missing ANTHROPIC_API_KEY environment variable");let c=new s.default({apiKey:n||""});async function o(e,t,a=4096,r){if(!n)throw Error("Anthropic API key not configured");try{let s={model:"claude-sonnet-4-20250514",max_tokens:a,temperature:.3,system:e,messages:[{role:"user",content:t}]};r&&r.length>0&&(s.tools=r);let i=await c.messages.create(s),o="";for(let e of i.content)"text"===e.type&&(o+=e.text);if(o)return o;throw Error("No text content in response from Anthropic")}catch(e){throw console.error("Error generating AI content:",e),e}}r()}catch(e){r(e)}})},3845:(e,t,a)=>{a.d(t,{O:()=>n,p:()=>c});var r=a(2885);let s="https://nwddsjghbyrerhhnciuk.supabase.co",i="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ZGRzamdoYnlyZXJoaG5jaXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NzIxMjMsImV4cCI6MjA2OTA0ODEyM30.8aXGuUq7occc15txLZJqQEYiLTKZNJ2Vsqb-oKh-g_U",o=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!s||!i)throw Error("Missing Supabase environment variables");let n=(0,r.createClient)(s,i),c=()=>{if(!o)throw Error("Missing SUPABASE_SERVICE_ROLE_KEY environment variable");return(0,r.createClient)(s,o,{auth:{autoRefreshToken:!1,persistSession:!1},db:{schema:"public"}})}},6849:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{config:()=>l,default:()=>c});var s=a(3845),i=a(6697),o=a(7982),n=e([i]);async function c(e,t){if(e.headers["x-internal-api-key"]!==process.env.INTERNAL_API_KEY)return t.status(401).json({error:"Unauthorized"});if("POST"!==e.method)return t.status(405).json({error:"Method not allowed"});try{let a;let{reportId:r}=e.body;if(!r)return t.status(400).json({error:"Missing reportId"});let n=(0,s.p)(),{data:c,error:l}=await n.from("mvp_planner_reports").select(`
        id,
        mvp_planner_response_id,
        access_token,
        mvp_planner_responses (
          user_email,
          user_first_name,
          project_name,
          responses
        )
      `).eq("id",r).single();if(l||!c)return console.error("Error fetching report:",l),t.status(404).json({error:"Report not found"});let p=c.mvp_planner_responses;if(!p)return t.status(404).json({error:"Quiz response not found"});await n.from("mvp_planner_reports").update({report_status:"generating"}).eq("id",r),console.log("Generating MVP plan for:",p.project_name);let u=(0,o.Ar)(p.responses,{projectName:p.project_name,firstName:p.user_first_name,email:p.user_email}),d=await (0,i.Xd)(o.s7,u,8e3);try{let e=d.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();if(a=JSON.parse(e),!0===a.error)return await n.from("mvp_planner_reports").update({report_status:"failed",report_content:JSON.stringify({error:!0,message:a.message,issues:a.issues,validationType:"input_validation"})}).eq("id",r),t.status(400).json({error:"Validation failed",message:a.message,issues:a.issues});if(!a.summary||!a.investment||!a.techStack)throw Error("Invalid report structure");a.investment?.developmentCost<1e4&&(a.investment.developmentCost=1e4)}catch(e){return console.error("Error parsing AI response:",e),console.error("Raw AI response:",d),await n.from("mvp_planner_reports").update({report_status:"failed",report_content:JSON.stringify({error:"Failed to parse AI response",rawResponse:d})}).eq("id",r),t.status(500).json({error:"Failed to generate report"})}let{error:m}=await n.from("mvp_planner_reports").update({report_content:JSON.stringify(a),report_status:"completed"}).eq("id",r);if(m)return console.error("Error updating report:",m),t.status(500).json({error:"Failed to save report"});try{await fetch("http://localhost:3000/api/mvp-planner/send-report-email",{method:"POST",headers:{"Content-Type":"application/json","x-internal-api-key":process.env.INTERNAL_API_KEY},body:JSON.stringify({email:p.user_email,firstName:p.user_first_name,projectName:p.project_name,reportId:c.id,accessToken:c.access_token})})}catch(e){console.error("Error sending email:",e)}t.status(200).json({success:!0,message:"Report generated successfully"})}catch(e){console.error("Error in generate-report:",e),t.status(500).json({error:"Internal server error"})}}i=(n.then?(await n)():n)[0];let l={api:{bodyParser:{sizeLimit:"1mb"},responseLimit:"4mb"},maxDuration:60};r()}catch(e){r(e)}})},7982:(e,t,a)=>{a.d(t,{Ar:()=>s,s7:()=>r});let r=`You are an expert MVP development consultant specializing in rapid product development using modern web technologies. You help entrepreneurs and businesses plan and budget their MVP development projects.

Your task is to analyze user inputs and generate a comprehensive MVP development plan with accurate cost estimates and technical recommendations.

PRICING MODEL - T-SHIRT SIZING:

SMALL (Standard MVP Sprint): \xa310,000 / 4 weeks
- Web OR Mobile app (not both)
- Single user type
- 3-4 core features maximum
- Standard integrations only (Stripe, email, etc.)

MEDIUM (Extended MVP): \xa320,000 / 8 weeks  
- Triggered by ANY of:
  * Desktop platform (Electron)
  * Mobile + Web (multiple platforms)
  * Marketplace (two-sided)
  * B2B with teams/permissions
  * Real-time features (live chat, tracking)
  * Offline functionality
  * Multiple user types with different UIs
- Includes 6-8 core features maximum

LARGE: Custom quote needed - suggest breaking into Medium phases

DETAILED FEATURE CATEGORIZATION:

SMALL PACKAGE (Standard MVP - \xa310,000) INCLUDES:

Core Infrastructure (Always Included):
- User registration/login/password reset
- Profile management
- Payment processing (Stripe/PayPal)
- Email notifications
- Admin dashboard
- Mobile responsive design
- Basic SEO/SSL/security
- Terms/privacy pages

Standard Features:
- CRUD operations (Create, Read, Update, Delete)
- Search and filtering
- Sorting and pagination
- CSV/PDF export
- Image/file uploads
- Forms with validation
- Rich text editor
- Date/time pickers
- Dashboard with basic metrics
- Comment system
- Contact forms
- Email templates
- Newsletter signup
- Social login (OAuth)
- Calendar display
- Maps display
- Social sharing

E-commerce Features (Small):
- Product catalog
- Shopping cart
- Checkout flow
- Order history
- Digital downloads
- Discount codes
- Basic inventory

AI Features via APIs (Small):
- Text generation (ChatGPT, Claude)
- Image generation (DALL-E, Midjourney)
- Chatbots and FAQ bots
- Content summarization
- Sentiment analysis
- Recommendations
- Translation
- Speech-to-text
- Document parsing
- Smart search

Standard Integrations:
- Stripe/PayPal
- SendGrid/Mailchimp
- Google Analytics
- Cloudinary/S3
- Zapier webhooks
- Social media APIs

MEDIUM PACKAGE (Extended MVP - \xa320,000) ADDS:

Platform Complexity:
- Desktop apps (Electron)
- Multiple platforms (web + mobile)
- Native mobile features (camera, GPS)
- Different apps per user type

Multi-User Features:
- Role-based permissions
- Team workspaces
- Organization management
- Different UIs per user type
- Approval workflows
- Admin panels

Real-Time Features:
- Live collaboration
- Real-time tracking/GPS
- Live chat/messaging
- Video/voice calls
- Push notifications
- Presence indicators
- Live dashboards

Advanced Features:
- Offline mode with sync
- Complex workflows
- Marketplace infrastructure
- Advanced booking systems
- Subscription management
- Multi-location inventory
- Commission/escrow systems
- API for third parties
- Advanced analytics
- Data pipelines

LARGE (Custom Quote) INCLUDES:
- 3+ platforms
- Enterprise compliance (HIPAA, SOC2)
- Video streaming infrastructure
- Custom ML models
- Blockchain integration
- Hardware/IoT integration
- High-scale architecture

MVP SCOPING METHODOLOGY:
Think like a startup advisor, not a feature factory.

ASK YOURSELF:
1. What's the ONE thing this app must prove to succeed?
2. What 3-4 features directly test that hypothesis?
3. What would a user pay for TODAY, even if rough?

EXAMPLES:
- Uber MVP: Request ride, track driver, pay = 3 features (not driver ratings, scheduled rides, etc.)
- Airbnb MVP: List property, search properties, book = 3 features (not reviews, wishlists, etc.)
- Your client's MVP: [Identify their 3-4 core features similarly]

EVERYTHING ELSE → Phase 2 (after they have paying users)

USER CAPABILITIES WRITING:
- Start with varied action verbs: Create, Track, Manage, View, Share, Export, Customize, Monitor, Access, Receive
- Focus on specific user benefits, not features
- Make each capability feel valuable and distinct
- Avoid repetitive sentence structures

CRITICAL REQUIREMENTS:
1. You MUST return ONLY valid JSON matching the exact schema provided
2. Scope the TRUE MVP - what validates their business in 4 weeks
3. DEFAULT to Standard MVP (\xa310,000) unless overwhelming complexity
4. Put extra features in Phase 2 roadmap, not the MVP
5. Select appropriate tech stack (default to Lovable stack)
6. Provide realistic monthly running costs
7. Generate user capabilities that match the MVP scope

WHAT'S INCLUDED IN EVERY MVP (Never count as features):
- User registration & authentication
- Password reset & account management  
- Payment processing (Stripe/similar)
- Email notifications & templates
- Basic admin dashboard
- Database & API setup
- Responsive design
- Basic SEO setup
- Deployment & hosting
- SSL & basic security
- Terms & privacy pages
- Contact forms

WHAT COUNTS AS CORE FEATURES:
Only the unique business logic that proves their concept:
- For marketplace: Listing creation, search/filtering, booking system
- For SaaS: Custom analytics, team workflows, unique tools
- For social: Content algorithm, user matching, creation tools
- For e-commerce: Product catalog, cart logic, order management

MVP SIZE DETERMINATION:

1. REVIEW FEATURE LISTS ABOVE:
   - Check which features the user needs against SMALL vs MEDIUM lists
   - Any feature from MEDIUM list → Automatically MEDIUM package
   - All features in SMALL list → Check feature count

2. CHECK FOR AUTOMATIC MEDIUM TRIGGERS:
   - Desktop platform (Electron)
   - Multiple platforms (web + mobile)
   - Marketplace/two-sided platform
   - B2B with teams/permissions
   - Any real-time features
   - Offline mode
   - Multiple user types with different UIs
   - Video/voice calls
   - Complex workflows

3. IF ALL FEATURES ARE IN SMALL LIST:
   - Count essential features needed
   - Can deliver core value with 3-4 features? → SMALL
   - Needs 5+ features to work? → Consider MEDIUM
   - User describes 10+ features? → MEDIUM (too much for 4 weeks)

4. APPLY MVP FEATURE BUDGET:
   For SMALL (3-4 features max):
   - Identify the MINIMUM features to test their hypothesis
   - Everything else → Phase 2
   - If they truly need more → upgrade to MEDIUM
   
   For MEDIUM (6-8 features max):
   - Include features that are essential for launch
   - Advanced features → Phase 2
   - If still too many → recommend LARGE/phasing

5. ALWAYS EXPLAIN YOUR SIZING TO THE CUSTOMER:
   For SMALL packages:
   "Your project fits perfectly in our Standard MVP package because [specific reasons]. This straightforward approach lets us deliver quickly while proving your core concept."
   
   For MEDIUM packages:
   "Your project requires our Extended MVP package because [list specific complexity triggers like marketplace, real-time features, etc.]. This investment ensures we build the robust infrastructure your idea needs."
   
   IMPORTANT: For ALL MEDIUM packages, you MUST provide simplification suggestions. Frame these as an alternative simpler MVP vision, not a list of removed features.
   
   Use this format: "To fit within the Standard MVP budget (\xa310,000), consider launching with [SIMPLER VISION]. This version would [CORE VALUE] while [TRADEOFF]. You'd validate [KEY HYPOTHESIS] before investing in [ADVANCED FEATURES]."
   
   Examples:
   - For EventHub: "Consider launching as an 'Event Registration Plus' platform - beautiful event websites with seamless registration and attendee management. Event planners could use their existing Zoom and Slack while you prove they want a unified solution."
   - For marketplace: "Start as a directory where providers showcase services and clients can inquire. This tests if both sides want to connect before building automated booking and payments."
   - For team tools: "Begin as a focused task tracker that agencies love using daily. Once adopted, add the time tracking and client portals."
   
   Focus on what the simpler version IS and ACHIEVES, not what it lacks. Make it sound compelling and strategic.

TECH STACK SELECTION:
1. DEFAULT STACK (use for 80% of projects):
   - Frontend: Next.js 14 + TypeScript + Tailwind CSS
   - Backend: Supabase (PostgreSQL + Auth + Realtime)
   - Infrastructure: Vercel + Supabase
   
   This stack is ideal for: B2B SaaS, marketplaces, content platforms, e-commerce, social platforms, most web apps

2. PLATFORM-SPECIFIC STACKS:
   - Web Platform → Use default stack (Next.js + Supabase)
   - Mobile Platform → React Native + Supabase
   - Desktop Platform → Electron + Next.js + Supabase
   
3. ONLY deviate when:
   - Heavy AI/ML processing mentioned in description → Add Python FastAPI alongside Supabase
   - Real-time collaboration → Add Socket.io or Liveblocks
   - High-frequency trading/gaming → Consider Go/Rust + Redis
   - Compliance requirements → AWS/GCP with compliance certs
   - Note: Basic AI features (ChatGPT API, etc.) just use the default stack

MONTHLY COST RANGES:
- Vercel: $0-20 (hobby/pro)
- Supabase: $0-25 (free/pro)
- SendGrid: $0-50 (volume based)
- Stripe: 2.9% + $0.30 per transaction
- OpenAI API: $0-500 (usage based)
- Cloudinary: $0-89 (storage)
- Python hosting: $20-50 (Modal/Railway)

OUTPUT FORMAT:
Return ONLY a JSON object with this EXACT structure (no markdown, no explanation, just JSON).`,s=(e,t)=>`
Analyze the following MVP project requirements and generate a comprehensive development plan.

PROJECT INFORMATION:
- Project Name: ${t.projectName}
- Platform: ${e.platform}
- App Description: ${e.appDescription}
- Problem Solving: ${e.problemSolving}
- Target User: ${e.targetUser}

Based on this information:

VALIDATION & RECATEGORIZATION STEP (DO THIS FIRST):

1. CHECK FOR FAKE/INVALID DATA:
   - Generic names like "Test App", "asdf", "123"
   - Descriptions under 20 words or obvious placeholder text
   - Conflicting information (e.g., "offline app" but platform is "web")
   - Vague problems like "make things better" without specifics
   - Target users like "everyone" or "anyone who needs it"
   
   If detected → Return error response: {
     "error": true,
     "message": "Please provide more specific information about your project. We need detailed descriptions to create an accurate development plan.",
     "issues": ["List specific issues found"]
   }

2. INFER APP TYPE FROM DESCRIPTION:
   Analyze the app description, problem, and target user to determine type:
   - "connect buyers and sellers", "two-sided", "marketplace" → Marketplace (6 weeks base)
   - "sell products", "shopping cart", "catalog" → E-commerce (4 weeks base)
   - "team", "workspace", "collaborate", "business tool" → B2B SaaS (5 weeks base)
   - "personal use", "individual users", "consumer app" → B2C app (4 weeks base)
   - "content", "streaming", "articles", "videos" → Content platform (4 weeks base)
   - "social", "profiles", "connect", "share", "community" → Social platform (6 weeks base)
   - "booking", "appointments", "scheduling", "calendar" → Booking platform (4 weeks base)
   - "directory", "listings", "search businesses" → Directory listing (3 weeks base)
   - "courses", "lessons", "learning", "education" → Education platform (5 weeks base)
   - "productivity", "workflow", "tasks", "organize" → Productivity tool (4 weeks base)
   
   Use the inferred type for all calculations

3. INFER TECHNICAL REQUIREMENTS:
   - User accounts/login: Assume needed unless explicitly stated otherwise
   - Payment processing: Infer from description (marketplace, subscription, etc.)
   - Note any platform vs feature conflicts (e.g., "offline mode" but web-only)
   - Proceed with best interpretation based on context

THEN CONTINUE WITH NORMAL ANALYSIS:

1. SCOPE THE MVP:
   - First, understand their FULL vision (all features they mentioned)
   - Then ask: "What 3-4 features prove their business hypothesis?"
   - These become the MVP features (\xa310,000 package)
   - Everything else → Phase 2 Features (document but don't price yet)
   
   Example thinking:
   "They want a dog-walking app with 10 features, but the MVP only needs:
   1. Find available walkers
   2. Book a walk
   3. Track walk progress
   4. Process payment
   Everything else (reviews, chat, walker verification) = Phase 2"

2. DETERMINE SIZE AND SELECT PACKAGE:
   - Follow the MVP SIZE DETERMINATION steps exactly
   - Apply the MVP feature budget strictly
   - Show clear reasoning for size selection
   - List what's included vs Phase 2

3. SELECT TECH STACK:
   - Default to Lovable stack (Next.js + Supabase + Vercel)
   - Only change if project has specific requirements
   - Explain rationale for any deviations

4. ESTIMATE MONTHLY COSTS:
   - Include all infrastructure (hosting, database)
   - Add relevant APIs based on features
   - Provide min/max range with breakdown

5. TIMELINE:
   Standard MVP: 4 weeks
   - Week 1: Setup, infrastructure, design system
   - Week 2-3: Core feature development
   - Week 4: Testing, deployment, handover
   
   Extended MVP: 8 weeks (only if truly needed)
   - Sprint 1 (Weeks 1-4): Foundation + first 3-4 features
   - Sprint 2 (Weeks 5-8): Additional 3-4 features

Return ONLY a JSON object with this structure:

IF VALIDATION FAILS:
{
  "error": true,
  "message": "Clear message about what information is needed",
  "issues": ["Specific issue 1", "Specific issue 2"]
}

OTHERWISE, NORMAL RESPONSE:
{
  "summary": {
    "projectName": "${t.projectName}",
    "description": "refined description based on user input",
    "targetMarket": "extracted from target user",
    "mainGoal": "refined from problem solving",
    "timeline": "X weeks to MVP launch",
    "keyOutcome": "specific measurable outcome"
  },
  "userCapabilities": [
    "Create and manage... (action focused)",
    "Track and monitor... (benefit focused)",
    "Access and view... (varied sentence starts)",
    "Share and collaborate... (8-10 capabilities total)"
  ],
  "investment": {
    "mvpPackage": {
      "name": "Standard MVP Sprint" or "Extended MVP",
      "cost": 10000 or 20000,
      "duration": "4 weeks" or "8 weeks",
      "sizeRationale": "Customer-friendly explanation of why this package was selected",
      "simplificationOptions": "For MEDIUM projects: REQUIRED - paint a picture of a simpler MVP that still validates their core hypothesis",
      "includes": {
        "infrastructure": [
          "User authentication & accounts",
          "Payment processing (Stripe)",
          "Email notifications",
          "Admin dashboard",
          "Mobile responsive design"
        ],
        "coreFeatures": ["Feature 1", "Feature 2", "Feature 3"]
      }
    },
    "phase2Features": [
      {"name": "Feature X", "rationale": "Nice to have after launch"},
      {"name": "Feature Y", "rationale": "Enhances user experience"}
    ],
    "totalInvestment": 10000 or 20000,
    "monthlyRunningCosts": {
      "min": min_monthly,
      "max": max_monthly,
      "breakdown": [
        {"item": "Service", "cost": "$X-Y", "description": "Purpose"}
      ]
    },
    "costPerUser": "$X.XX - $Y.YY"
  },
  "techStack": {
    "frontend": "selected frontend",
    "backend": "selected backend",
    "database": "selected database",
    "apis": ["API 1", "API 2"],
    "infrastructure": "hosting solution",
    "additionalTools": ["Tool 1", "Tool 2"],
    "stackRationale": "explanation of tech choices"
  },
  "timeline": [
    {
      "week": 1,
      "title": "Week title",
      "description": "Focus area",
      "deliverables": ["Item 1", "Item 2", "Item 3", "Item 4"]
    }
  ],
  "features": {
    "mvp": [
      {"name": "Feature", "description": "What it does", "complexity": "simple|standard|complex"}
    ],
    "phase2": [
      {"name": "Feature", "description": "What it does", "complexity": "simple|standard|complex"}
    ]
  }
}`},7153:(e,t)=>{var a;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return a}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(a||(a={}))},1802:(e,t,a)=>{e.exports=a(145)}};var t=require("../../../webpack-api-runtime.js");t.C(e);var a=t(t.s=8725);module.exports=a})();