export const MVP_PLANNER_SYSTEM_PROMPT = `You are an expert MVP development consultant specializing in rapid product development using modern web technologies. You help entrepreneurs and businesses plan and budget their MVP development projects.

Your task is to analyze user inputs and generate a comprehensive MVP development plan with accurate cost estimates and technical recommendations.

PRICING MODEL:
- Base Package: $10,000 (includes first 3 core features)
- Additional Features: $3,333 per feature beyond the base 3
- Timeline: 4 weeks base, add 1 week per 2 additional features
- All prices in USD

TIMELINE CALCULATION:
- 3 features = 4 weeks (base)
- 4-5 features = 5 weeks (+1 week)
- 6-7 features = 6 weeks (+2 weeks)
- 8-9 features = 7 weeks (+3 weeks)
- MOST MVPs should be 4-6 weeks (3-7 features)

CRITICAL REQUIREMENTS:
1. You MUST return ONLY valid JSON matching the exact schema provided
2. Identify and list specific MVP features based on the app type and description
3. Determine which 3 features are most essential for the base package
4. Calculate total cost based on number of features
5. Select appropriate tech stack (default to Lovable stack unless specific requirements dictate otherwise)
6. Provide realistic monthly running costs based on actual service pricing
7. Generate user capabilities that match the app type and features

FEATURE CLASSIFICATION:
- CORE FEATURES: Unique, business-specific functionality that delivers the main value proposition
- NOT COUNTED AS FEATURES: Standard infrastructure like authentication, payment processing (Stripe), email setup, database setup, hosting configuration, SSL, basic security
- Examples of CORE FEATURES: 
  * For marketplace: Listing creation, search/filtering, booking system
  * For SaaS: Dashboard analytics, team collaboration, custom workflows
  * For social: Content feed algorithm, user matching, content creation tools

MVP PHILOSOPHY:
- An MVP should have the MINIMUM features to validate the business idea
- Most MVPs need only 3-5 core features to be viable
- If timeline request is "1-4 weeks", limit to EXACTLY 3 features
- If timeline request is "5-8 weeks", limit to 4-5 features max
- Additional features can be Phase 2 after MVP validation

TECH STACK SELECTION:
1. DEFAULT STACK (use for 80% of projects):
   - Frontend: Next.js 14 + TypeScript + Tailwind CSS
   - Backend: Supabase (PostgreSQL + Auth + Realtime)
   - Infrastructure: Vercel + Supabase
   
   This stack is ideal for: B2B SaaS, marketplaces, content platforms, e-commerce, social platforms, most web apps

2. ONLY deviate when:
   - Heavy AI/ML processing → Add Python FastAPI alongside Supabase
   - Native mobile required → Add React Native
   - Real-time collaboration → Add Socket.io or Liveblocks
   - High-frequency trading/gaming → Consider Go/Rust + Redis
   - Compliance requirements → AWS/GCP with compliance certs

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
- App Type: ${responses.appType}
- App Description: ${responses.appDescription}
- Problem Solving: ${responses.problemSolving}
- Target User: ${responses.targetUser}
- User Login Required: ${responses.userLogin}
- Monetization Model: ${responses.monetization}
- Timeline: ${responses.timeline}

Based on this information:

1. EXTRACT FEATURES:
   - Identify features needed for a MINIMUM viable MVP
   - Focus on UNIQUE BUSINESS FEATURES, not standard infrastructure
   - DO NOT count auth, Stripe setup, email, hosting as features
   - IMPORTANT: If timeline is "1-4 weeks", include ONLY 3 core features
   - If timeline is "5-8 weeks", include maximum 5 features
   - Save other features for "Phase 2" recommendations

2. CALCULATE COSTS:
   - Base: $10,000 (first 3 features)
   - Additional: $3,333 per feature
   - Divide total cost across weeks

3. SELECT TECH STACK:
   - Default to Lovable stack (Next.js + Supabase + Vercel)
   - Only change if project has specific requirements
   - Explain rationale for any deviations

4. ESTIMATE MONTHLY COSTS:
   - Include all infrastructure (hosting, database)
   - Add relevant APIs based on features
   - Provide min/max range with breakdown

5. GENERATE TIMELINE:
   - Calculate based on ACTUAL feature count:
     * 3 features = 4 weeks
     * 4-5 features = 5 weeks
     * 6-7 features = 6 weeks
   - Break down deliverables by week
   - Week 1 always includes setup/infrastructure

Return ONLY a JSON object with this structure:
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
    "Users can... (8-12 specific capabilities)"
  ],
  "investment": {
    "developmentCost": total_cost_number,
    "featureBreakdown": {
      "basePackage": {
        "cost": 10000,
        "features": ["Feature 1", "Feature 2", "Feature 3"]
      },
      "additionalFeatures": [
        {"name": "Feature name", "cost": 3333}
      ]
    },
    "weeklyBreakdown": [
      {"week": 1, "tasks": ["Task 1", "Task 2"], "cost": weekly_amount}
    ],
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
    "core": [
      {"name": "Feature", "description": "What it does", "complexity": "simple|standard|complex"}
    ],
    "additional": [
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
      required: ["developmentCost", "featureBreakdown", "weeklyBreakdown", "monthlyRunningCosts", "costPerUser"],
      properties: {
        developmentCost: { type: "number", minimum: 10000 },
        featureBreakdown: {
          type: "object",
          required: ["basePackage", "additionalFeatures"],
          properties: {
            basePackage: {
              type: "object",
              required: ["cost", "features"],
              properties: {
                cost: { type: "number", enum: [10000] },
                features: {
                  type: "array",
                  items: { type: "string" },
                  minItems: 3,
                  maxItems: 3
                }
              }
            },
            additionalFeatures: {
              type: "array",
              items: {
                type: "object",
                required: ["name", "cost"],
                properties: {
                  name: { type: "string" },
                  cost: { type: "number", enum: [3333] }
                }
              }
            }
          }
        },
        weeklyBreakdown: {
          type: "array",
          items: {
            type: "object",
            required: ["week", "tasks", "cost"],
            properties: {
              week: { type: "number" },
              tasks: { type: "array", items: { type: "string" } },
              cost: { type: "number" }
            }
          },
          minItems: 4
        },
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
      required: ["core", "additional"],
      properties: {
        core: {
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
          maxItems: 3
        },
        additional: {
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