-- Seed data for Social Finance Limited tenant assessments
-- Run this in Supabase SQL Editor to populate test data

-- Assessment 1: This AI Now (Utility Broker)
INSERT INTO quiz_responses (
  id,
  tenant_id,
  user_email,
  user_first_name,
  user_last_name,
  user_company,
  industry,
  company_size,
  responses,
  created_at,
  completed_at,
  updated_at
) VALUES
(
  '2ddf3b8a-6b40-4d7f-b894-f3a5767e7188',
  '91578a15-9c62-4e64-a73d-b3974c232824',
  'kyle.davey@example.com',
  'Kyle',
  'Davey',
  'This AI Now',
  'Business SME Utility, Telecoms, Internet and Energy brokerage',
  'micro',
  '{"industry":"Business SME Utility, Telecoms, Internet and Energy brokerage","timeline":"within-month","moneyLeaks":["missed-opportunities","inefficient-pricing","wasted-marketing","slow-processes"],"companySize":"micro","monthlyBudget":"500-2000","currentSystems":"mostly-manual","desiredOutcome":["focus-strategy","work-life-balance"],"systemsReality":"Use VAT ANNA for accounts. Have website custom chatbot with AI. No receptionist. Using an AI to manage social media content. Need more sales enquiries.","teamCapability":"moderately-comfortable","repetitiveTasks":["data-entry","invoice-billing","document-creation","quality-checking","lead-followup","competitor-monitoring"],"efficiencyRating":"gaps","idealSystemVision":"More customers enquire online, we have more spare time for sales, sending quotes can be time consuming, doing the bill run can also be time consuming.","businessChallenges":["cant-track-issues","too-much-manual-work","operational-chaos","cant-track-performance"],"weeklyTimeBreakdown":{"data-entry":"10-20hrs","lead-followup":"5-10hrs","invoice-billing":"1-5hrs","quality-checking":"5-10hrs","document-creation":"5-10hrs","competitor-monitoring":"5-10hrs"},"monthlyCostBreakdown":{"cant-track-issues":"$1-2.5k","operational-chaos":"$500-1k","too-much-manual-work":"$500-1k","cant-track-performance":"$1-2.5k"}}'::jsonb,
  '2025-10-09 12:14:50.452712+00',
  '2025-10-09 12:20:15+00',
  '2025-10-09 12:20:15+00'
)
ON CONFLICT (id) DO UPDATE SET
  tenant_id = EXCLUDED.tenant_id,
  user_first_name = EXCLUDED.user_first_name,
  user_last_name = EXCLUDED.user_last_name;

-- Insert AI Report for Assessment 1 with full stage data
INSERT INTO ai_reports (
  id,
  quiz_response_id,
  report_status,
  access_token,
  email_sent_at,
  final_report,
  created_at,
  updated_at
) VALUES (
  'rep_thisainow_001',
  '2ddf3b8a-6b40-4d7f-b894-f3a5767e7188',
  'completed',
  'demo-token-thisainow',
  '2025-10-09 12:22:00+00',
  '{
    "stage1": {
      "scores": {
        "automationPotential": 8,
        "dataRichness": 7,
        "processMaturity": 6,
        "aiReadiness": 7,
        "scalabilityOpportunity": 8
      },
      "industryProfile": "SME utility brokerage with high customer interaction volume, quote generation, and pricing complexity. Heavy reliance on manual processes for lead follow-up and billing.",
      "painPoints": [
        {
          "problem": "Manual quote generation taking 45+ minutes per customer",
          "severity": "critical",
          "cost": "high",
          "aiSuitability": "excellent"
        },
        {
          "problem": "Lead follow-up delays causing 30% prospect drop-off",
          "severity": "high",
          "cost": "high",
          "aiSuitability": "excellent"
        },
        {
          "problem": "Billing run consuming 8-12 hours monthly with errors",
          "severity": "high",
          "cost": "medium",
          "aiSuitability": "good"
        },
        {
          "problem": "Unable to track which marketing channels drive quality leads",
          "severity": "medium",
          "cost": "medium",
          "aiSuitability": "excellent"
        },
        {
          "problem": "Manual competitor price monitoring taking 5-10 hours weekly",
          "severity": "medium",
          "cost": "medium",
          "aiSuitability": "good"
        }
      ],
      "businessImpact": "Critical revenue leakage from slow quote turnaround and lost leads. High operational burden preventing focus on strategic growth activities.",
      "monthlyOpportunity": "$4,500 - $8,000 / month"
    },
    "stage2": {
      "marketIntelligence": {
        "recommendedSolutions": [
          {
            "category": "Quote Automation & CRM",
            "tools": [
              {
                "name": "Pipedrive",
                "vendor": "Pipedrive Inc.",
                "description": "Sales CRM with workflow automation and quote generation. Integrates with email, calendar, and billing systems to streamline sales processes.",
                "industryFit": "Excellent fit for service-based SMEs",
                "solvesPainPoints": ["Manual quote generation", "Lead follow-up delays", "Cannot track performance"],
                "pricing": {
                  "model": "month",
                  "cost": 99,
                  "currency": "USD",
                  "perUser": true,
                  "additionalCosts": "Implementation: $500-1,000"
                },
                "roi": {
                  "metric": "time savings",
                  "value": 320,
                  "unit": "%",
                  "timeframe": "3 months"
                },
                "implementation": {
                  "complexity": "medium",
                  "timeToValue": "2-3 weeks",
                  "integrationRequired": ["Email", "Calendar", "VAT ANNA"],
                  "trainingRequired": "moderate"
                },
                "confidence": "high"
              },
              {
                "name": "HubSpot Sales Hub",
                "vendor": "HubSpot",
                "description": "Comprehensive sales automation platform with quote builder, email tracking, and automated follow-up sequences.",
                "solvesPainPoints": ["Lead follow-up delays", "Manual quote generation", "Marketing channel tracking"],
                "pricing": {
                  "model": "month",
                  "cost": 90,
                  "currency": "USD",
                  "perUser": true
                },
                "roi": {
                  "metric": "lead conversion",
                  "value": 45,
                  "unit": "%",
                  "timeframe": "6 months"
                },
                "implementation": {
                  "complexity": "medium",
                  "timeToValue": "3-4 weeks",
                  "integrationRequired": ["Email", "Website", "Calendar"],
                  "trainingRequired": "moderate"
                },
                "confidence": "high"
              }
            ]
          },
          {
            "category": "Billing Automation",
            "tools": [
              {
                "name": "Xero",
                "vendor": "Xero Limited",
                "description": "Cloud accounting software with automated billing, invoicing, and reconciliation. Reduces manual data entry and billing errors.",
                "solvesPainPoints": ["Billing run errors", "Manual data entry", "Invoice billing time"],
                "pricing": {
                  "model": "month",
                  "cost": 35,
                  "currency": "USD",
                  "perUser": false
                },
                "roi": {
                  "metric": "time savings",
                  "value": 85,
                  "unit": "%",
                  "timeframe": "1 month"
                },
                "implementation": {
                  "complexity": "low",
                  "timeToValue": "1-2 weeks",
                  "integrationRequired": ["Bank accounts", "VAT ANNA", "CRM"],
                  "trainingRequired": "minimal"
                },
                "confidence": "high"
              }
            ]
          },
          {
            "category": "Lead Intelligence & Analytics",
            "tools": [
              {
                "name": "Google Analytics 4 + Looker Studio",
                "vendor": "Google",
                "description": "Free analytics suite with custom dashboards. Track lead sources, conversion rates, and marketing ROI in real-time.",
                "solvesPainPoints": ["Cannot track performance", "Marketing channel attribution", "Competitor monitoring"],
                "pricing": {
                  "model": "month",
                  "cost": 0,
                  "currency": "USD",
                  "perUser": false,
                  "additionalCosts": "Setup consulting: $500-1,500"
                },
                "roi": {
                  "metric": "marketing efficiency",
                  "value": 60,
                  "unit": "%",
                  "timeframe": "3 months"
                },
                "implementation": {
                  "complexity": "low",
                  "timeToValue": "1 week",
                  "integrationRequired": ["Website", "CRM", "Ad platforms"],
                  "trainingRequired": "minimal"
                },
                "confidence": "high"
              },
              {
                "name": "Databox",
                "vendor": "Databox",
                "description": "Business analytics platform that consolidates KPIs from multiple sources into unified dashboards.",
                "solvesPainPoints": ["Performance tracking", "Marketing attribution", "Operational chaos"],
                "pricing": {
                  "model": "month",
                  "cost": 72,
                  "currency": "USD",
                  "perUser": false
                },
                "roi": {
                  "metric": "decision speed",
                  "value": 200,
                  "unit": "%",
                  "timeframe": "1 month"
                },
                "implementation": {
                  "complexity": "low",
                  "timeToValue": "3-5 days",
                  "integrationRequired": ["CRM", "Analytics", "Ad platforms"],
                  "trainingRequired": "minimal"
                },
                "confidence": "medium"
              }
            ]
          }
        ]
      }
    },
    "stage3": {
      "financialAnalysis": {
        "currentCosts": {
          "annualWaste": 78000,
          "monthlyWaste": 6500,
          "breakdown": [
            { "category": "Lost leads from slow follow-up", "cost": 36000, "percentage": 46 },
            { "category": "Manual quote generation time", "cost": 24000, "percentage": 31 },
            { "category": "Billing errors and rework", "cost": 12000, "percentage": 15 },
            { "category": "Manual data entry overhead", "cost": 6000, "percentage": 8 }
          ]
        },
        "scenarios": [
          {
            "name": "Conservative Scenario",
            "description": "Minimal automation adoption, basic tooling only",
            "year1": {
              "toolsCost": 2400,
              "implementationCost": 3000,
              "totalInvestment": 5400,
              "projectedSavings": 31200,
              "netBenefit": 25800,
              "roi": 478,
              "paybackMonths": 2
            },
            "year3": {
              "cumulativeSavings": 109200,
              "totalInvestment": 8400,
              "netBenefit": 100800,
              "roi": 1200
            }
          },
          {
            "name": "Realistic Scenario",
            "description": "Core automation stack with CRM, billing, and analytics",
            "year1": {
              "toolsCost": 4800,
              "implementationCost": 6000,
              "totalInvestment": 10800,
              "projectedSavings": 54600,
              "netBenefit": 43800,
              "roi": 405,
              "paybackMonths": 2
            },
            "year3": {
              "cumulativeSavings": 187200,
              "totalInvestment": 20400,
              "netBenefit": 166800,
              "roi": 817
            }
          },
          {
            "name": "Optimistic Scenario",
            "description": "Full automation suite with premium integrations",
            "year1": {
              "toolsCost": 7200,
              "implementationCost": 9000,
              "totalInvestment": 16200,
              "projectedSavings": 70200,
              "netBenefit": 54000,
              "roi": 333,
              "paybackMonths": 3
            },
            "year3": {
              "cumulativeSavings": 234000,
              "totalInvestment": 30600,
              "netBenefit": 203400,
              "roi": 665
            }
          }
        ]
      }
    },
    "stage4": {
      "strategicRecommendations": {
        "priorityRanking": [
          {
            "recommendation": "Implement CRM with quote automation (Pipedrive or HubSpot)",
            "priority": 1,
            "justification": "Addresses highest-cost pain point (lost leads) and quote generation bottleneck. Immediate revenue impact expected."
          },
          {
            "recommendation": "Automate billing process with Xero",
            "priority": 2,
            "justification": "Quick win with low complexity. Eliminates 8-12 hours monthly overhead and reduces errors."
          },
          {
            "recommendation": "Set up analytics dashboard (GA4 + Looker Studio)",
            "priority": 3,
            "justification": "Free solution that provides critical visibility into lead sources and marketing ROI. Informs all future optimization."
          }
        ],
        "implementationRoadmap": [
          {
            "phase": "Phase 1: Quick Wins",
            "timeline": "0-30 days",
            "focus": "Deploy high-impact, low-complexity solutions",
            "actions": [
              {
                "action": "Set up Google Analytics 4 and Looker Studio dashboard",
                "timeline": "3-5 days",
                "priority": "high",
                "effort": "low",
                "impact": "high",
                "quickWin": true
              },
              {
                "action": "Implement Xero for automated billing and invoicing",
                "timeline": "1-2 weeks",
                "priority": "high",
                "effort": "low",
                "impact": "high",
                "quickWin": true
              },
              {
                "action": "Create quote templates in current system",
                "timeline": "2-3 days",
                "priority": "medium",
                "effort": "low",
                "impact": "medium",
                "quickWin": true
              }
            ]
          },
          {
            "phase": "Phase 2: Core Automation",
            "timeline": "30-90 days",
            "focus": "Implement CRM and sales automation",
            "actions": [
              {
                "action": "Deploy Pipedrive CRM with quote automation",
                "timeline": "2-3 weeks",
                "priority": "high",
                "effort": "medium",
                "impact": "high",
                "dependencies": ["Team training", "Data migration"]
              },
              {
                "action": "Set up automated lead follow-up sequences",
                "timeline": "1 week",
                "priority": "high",
                "effort": "medium",
                "impact": "high",
                "dependencies": ["CRM deployment"]
              }
            ]
          }
        ],
        "nextSteps": {
          "immediate": [
            "Book demo with Pipedrive sales team",
            "Sign up for Xero 30-day trial",
            "Install Google Analytics 4 on website",
            "Audit current customer data for CRM migration"
          ],
          "week1": [
            "Complete Xero onboarding and bank connection",
            "Set up basic GA4 conversion tracking",
            "Define quote template requirements",
            "Schedule team training for new tools"
          ],
          "month1": [
            "Finalize CRM selection (Pipedrive vs HubSpot)",
            "Migrate top 100 customers to new billing system",
            "Build first Looker Studio dashboard",
            "Document new quote generation process",
            "Set up automated email sequences",
            "Train team on CRM best practices",
            "Review first month analytics insights"
          ]
        }
      }
    }
  }'::jsonb,
  '2025-10-09 12:20:15+00',
  '2025-10-09 12:22:00+00'
)
ON CONFLICT (id) DO UPDATE SET
  report_status = EXCLUDED.report_status,
  final_report = EXCLUDED.final_report;

-- Note: For the other 2 seed examples (Taha Fashion and Smith Plumbing),
-- you can run similar INSERT statements using the data from assessment-seed-data.ts
-- The structure is identical, just swap out the IDs and JSON data
