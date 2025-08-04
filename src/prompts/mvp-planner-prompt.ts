export const MVP_PLANNER_SYSTEM_PROMPT = `You are an expert MVP development consultant specializing in rapid product development using modern web technologies. You help entrepreneurs and businesses plan and budget their MVP development projects.

Your task is to analyze user inputs and generate a comprehensive MVP development plan with accurate cost estimates and technical recommendations.

PRICING MODEL - T-SHIRT SIZING:

SMALL (Standard MVP Sprint): £10,000 / 4 weeks
- Web OR Mobile app (not both)
- Single user type
- 3-4 core features maximum
- Standard integrations only (Stripe, email, etc.)

MEDIUM (Extended MVP): £20,000 / 8 weeks  
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

SMALL PACKAGE (Standard MVP - £10,000) INCLUDES:

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

MEDIUM PACKAGE (Extended MVP - £20,000) ADDS:

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
3. DEFAULT to Standard MVP (£10,000) unless overwhelming complexity
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

5. ALWAYS EXPLAIN YOUR SIZING:
   "Size: SMALL - This is a straightforward web app with standard features"
   OR
   "Size: MEDIUM - This requires a marketplace infrastructure with real-time tracking"

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
Return ONLY a JSON object with this EXACT structure (no markdown, no explanation, just JSON).`;

export const MVP_PLANNER_USER_PROMPT = (responses: any, userInfo: any) => `
Analyze the following MVP project requirements and generate a comprehensive development plan.

PROJECT INFORMATION:
- Project Name: ${userInfo.projectName}
- Platform: ${responses.platform}
- App Description: ${responses.appDescription}
- Problem Solving: ${responses.problemSolving}
- Target User: ${responses.targetUser}

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
   - These become the MVP features (£10,000 package)
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
    "projectName": "${userInfo.projectName}",
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
      "sizeRationale": "Clear explanation of why this is SMALL or MEDIUM",
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
}`;

export const MVP_PLANNER_JSON_SCHEMA = {
  type: "object",
  required: ["summary", "userCapabilities", "investment", "techStack", "timeline", "features"],
  properties: {
    summary: {
      type: "object",
      required: ["projectName", "description", "targetMarket", "mainGoal", "timeline", "keyOutcome"],
      properties: {
        projectName: { type: "string" },
        description: { type: "string" },
        targetMarket: { type: "string" },
        mainGoal: { type: "string" },
        timeline: { type: "string" },
        keyOutcome: { type: "string" }
      }
    },
    userCapabilities: {
      type: "array",
      items: { type: "string" },
      minItems: 8,
      maxItems: 12
    },
    investment: {
      type: "object",
      required: ["mvpPackage", "phase2Features", "totalInvestment", "monthlyRunningCosts", "costPerUser"],
      properties: {
        mvpPackage: {
          type: "object",
          required: ["name", "cost", "duration", "sizeRationale", "includes"],
          properties: {
            name: { type: "string", enum: ["Standard MVP Sprint", "Extended MVP"] },
            cost: { type: "number", enum: [10000, 20000] },
            duration: { type: "string", enum: ["4 weeks", "8 weeks"] },
            sizeRationale: { type: "string" },
            includes: {
              type: "object",
              required: ["infrastructure", "coreFeatures"],
              properties: {
                infrastructure: { 
                  type: "array", 
                  items: { type: "string" },
                  minItems: 4
                },
                coreFeatures: {
                  type: "array",
                  items: { type: "string" },
                  minItems: 3,
                  maxItems: 8
                }
              }
            }
          }
        },
        phase2Features: {
          type: "array",
          items: {
            type: "object",
            required: ["name", "rationale"],
            properties: {
              name: { type: "string" },
              rationale: { type: "string" }
            }
          }
        },
        totalInvestment: { type: "number", enum: [10000, 20000] },
        monthlyRunningCosts: {
          type: "object",
          required: ["min", "max", "breakdown"],
          properties: {
            min: { type: "number", minimum: 0 },
            max: { type: "number", minimum: 0 },
            breakdown: {
              type: "array",
              items: {
                type: "object",
                required: ["item", "cost", "description"],
                properties: {
                  item: { type: "string" },
                  cost: { type: "string" },
                  description: { type: "string" }
                }
              }
            }
          }
        },
        costPerUser: { type: "string", pattern: "^\\$\\d+\\.\\d{2} - \\$\\d+\\.\\d{2}$" }
      }
    },
    techStack: {
      type: "object",
      required: ["frontend", "backend", "database", "apis", "infrastructure", "additionalTools", "stackRationale"],
      properties: {
        frontend: { type: "string" },
        backend: { type: "string" },
        database: { type: "string" },
        apis: { type: "array", items: { type: "string" } },
        infrastructure: { type: "string" },
        additionalTools: { type: "array", items: { type: "string" } },
        stackRationale: { type: "string" }
      }
    },
    timeline: {
      type: "array",
      items: {
        type: "object",
        required: ["week", "title", "description", "deliverables"],
        properties: {
          week: { type: "number" },
          title: { type: "string" },
          description: { type: "string" },
          deliverables: {
            type: "array",
            items: { type: "string" },
            minItems: 3
          }
        }
      },
      minItems: 4
    },
    features: {
      type: "object",
      required: ["mvp", "phase2"],
      properties: {
        mvp: {
          type: "array",
          items: {
            type: "object",
            required: ["name", "description", "complexity"],
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              complexity: { type: "string", enum: ["simple", "standard", "complex"] }
            }
          },
          minItems: 3,
          maxItems: 8
        },
        phase2: {
          type: "array",
          items: {
            type: "object",
            required: ["name", "description", "complexity"],
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              complexity: { type: "string", enum: ["simple", "standard", "complex"] }
            }
          }
        }
      }
    }
  }
};