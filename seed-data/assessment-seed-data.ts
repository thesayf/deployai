/**
 * Seed Data for Assessment Detail Page Testing
 *
 * This file contains realistic AI analysis data structures to populate
 * the assessment detail page for Social Finance Limited tenant.
 *
 * Based on actual quiz responses from production database.
 */

export const SOCIAL_FINANCE_TENANT_ID = '91578a15-9c62-4e64-a73d-b3974c232824';

// Example 1: Business SME Utility Broker (This AI Now)
export const assessmentSeedData1 = {
  // Quiz Response Data
  id: '2ddf3b8a-6b40-4d7f-b894-f3a5767e7188',
  tenant_id: SOCIAL_FINANCE_TENANT_ID,
  user_email: 'kyle.davey@example.com',
  user_first_name: 'Kyle',
  user_last_name: 'Davey',
  user_company: 'This AI Now',
  industry: 'Business SME Utility, Telecoms, Internet and Energy brokerage',
  company_size: 'micro',
  created_at: '2025-10-09T12:14:50.452712Z',
  completed_at: '2025-10-09T12:20:15.000000Z',
  updated_at: '2025-10-09T12:20:15.000000Z',
  responses: {
    industry: 'Business SME Utility, Telecoms, Internet and Energy brokerage',
    timeline: 'within-month',
    moneyLeaks: ['missed-opportunities', 'inefficient-pricing', 'wasted-marketing', 'slow-processes'],
    companySize: 'micro',
    monthlyBudget: '500-2000',
    currentSystems: 'mostly-manual',
    desiredOutcome: ['focus-strategy', 'work-life-balance'],
    systemsReality: 'Use VAT ANNA for accounts. Have website custom chatbot with AI. No receptionist. Using an AI to manage social media content. Need more sales enquiries.',
    teamCapability: 'moderately-comfortable',
    repetitiveTasks: ['data-entry', 'invoice-billing', 'document-creation', 'quality-checking', 'lead-followup', 'competitor-monitoring'],
    efficiencyRating: 'gaps',
    idealSystemVision: 'More customers enquire online, we have more spare time for sales, sending quotes can be time consuming, doing the bill run can also be time consuming.',
    businessChallenges: ['cant-track-issues', 'too-much-manual-work', 'operational-chaos', 'cant-track-performance'],
    weeklyTimeBreakdown: {
      'data-entry': '10-20hrs',
      'lead-followup': '5-10hrs',
      'invoice-billing': '1-5hrs',
      'quality-checking': '5-10hrs',
      'document-creation': '5-10hrs',
      'competitor-monitoring': '5-10hrs'
    },
    monthlyCostBreakdown: {
      'cant-track-issues': '$1-2.5k',
      'operational-chaos': '$500-1k',
      'too-much-manual-work': '$500-1k',
      'cant-track-performance': '$1-2.5k'
    }
  },

  // AI Report Data
  report: {
    id: 'rep_001',
    quiz_response_id: '2ddf3b8a-6b40-4d7f-b894-f3a5767e7188',
    report_status: 'completed',
    access_token: 'demo-token-001',
    email_sent_at: '2025-10-09T12:22:00.000000Z',
    created_at: '2025-10-09T12:20:15.000000Z',
    updated_at: '2025-10-09T12:22:00.000000Z',

    final_report: {
      // Stage 1: Problem Analysis
      stage1: {
        scores: {
          automationPotential: 8,
          dataRichness: 7,
          processMaturity: 6,
          aiReadiness: 7,
          scalabilityOpportunity: 8
        },
        industryProfile: 'SME utility brokerage with high customer interaction volume, quote generation, and pricing complexity. Heavy reliance on manual processes for lead follow-up and billing.',
        painPoints: [
          {
            problem: 'Manual quote generation taking 45+ minutes per customer',
            severity: 'critical',
            cost: 'high',
            aiSuitability: 'excellent'
          },
          {
            problem: 'Lead follow-up delays causing 30% prospect drop-off',
            severity: 'high',
            cost: 'high',
            aiSuitability: 'excellent'
          },
          {
            problem: 'Billing run consuming 8-12 hours monthly with errors',
            severity: 'high',
            cost: 'medium',
            aiSuitability: 'good'
          },
          {
            problem: 'Unable to track which marketing channels drive quality leads',
            severity: 'medium',
            cost: 'medium',
            aiSuitability: 'excellent'
          },
          {
            problem: 'Manual competitor price monitoring taking 5-10 hours weekly',
            severity: 'medium',
            cost: 'medium',
            aiSuitability: 'good'
          }
        ],
        businessImpact: 'Critical revenue leakage from slow quote turnaround and lost leads. High operational burden preventing focus on strategic growth activities.',
        monthlyOpportunity: '$4,500 - $8,000 / month'
      },

      // Stage 2: Market Intelligence
      stage2: {
        marketIntelligence: {
          recommendedSolutions: [
            {
              category: 'Quote Automation & CRM',
              tools: [
                {
                  name: 'Pipedrive',
                  vendor: 'Pipedrive Inc.',
                  description: 'Sales CRM with workflow automation and quote generation. Integrates with email, calendar, and billing systems to streamline sales processes.',
                  industryFit: 'Excellent fit for service-based SMEs',
                  solvesPainPoints: ['Manual quote generation', 'Lead follow-up delays', 'Cannot track performance'],
                  pricing: {
                    model: 'month',
                    cost: 99,
                    currency: 'USD',
                    perUser: true,
                    additionalCosts: 'Implementation: $500-1,000'
                  },
                  roi: {
                    metric: 'time savings',
                    value: 320,
                    unit: '%',
                    timeframe: '3 months'
                  },
                  implementation: {
                    complexity: 'medium',
                    timeToValue: '2-3 weeks',
                    integrationRequired: ['Email', 'Calendar', 'VAT ANNA'],
                    trainingRequired: 'moderate'
                  },
                  confidence: 'high'
                },
                {
                  name: 'HubSpot Sales Hub',
                  vendor: 'HubSpot',
                  description: 'Comprehensive sales automation platform with quote builder, email tracking, and automated follow-up sequences.',
                  solvesPainPoints: ['Lead follow-up delays', 'Manual quote generation', 'Marketing channel tracking'],
                  pricing: {
                    model: 'month',
                    cost: 90,
                    currency: 'USD',
                    perUser: true
                  },
                  roi: {
                    metric: 'lead conversion',
                    value: 45,
                    unit: '%',
                    timeframe: '6 months'
                  },
                  implementation: {
                    complexity: 'medium',
                    timeToValue: '3-4 weeks',
                    integrationRequired: ['Email', 'Website', 'Calendar'],
                    trainingRequired: 'moderate'
                  },
                  confidence: 'high'
                }
              ]
            },
            {
              category: 'Billing Automation',
              tools: [
                {
                  name: 'Xero',
                  vendor: 'Xero Limited',
                  description: 'Cloud accounting software with automated billing, invoicing, and reconciliation. Reduces manual data entry and billing errors.',
                  solvesPainPoints: ['Billing run errors', 'Manual data entry', 'Invoice billing time'],
                  pricing: {
                    model: 'month',
                    cost: 35,
                    currency: 'USD',
                    perUser: false
                  },
                  roi: {
                    metric: 'time savings',
                    value: 85,
                    unit: '%',
                    timeframe: '1 month'
                  },
                  implementation: {
                    complexity: 'low',
                    timeToValue: '1-2 weeks',
                    integrationRequired: ['Bank accounts', 'VAT ANNA', 'CRM'],
                    trainingRequired: 'minimal'
                  },
                  confidence: 'high'
                },
                {
                  name: 'Chargebee',
                  vendor: 'Chargebee Inc.',
                  description: 'Subscription billing and revenue management platform. Automates recurring billing, dunning, and revenue recognition.',
                  solvesPainPoints: ['Billing run time', 'Invoice billing', 'Operational chaos'],
                  pricing: {
                    model: 'month',
                    cost: 249,
                    currency: 'USD',
                    perUser: false,
                    additionalCosts: '0.75% of revenue processed'
                  },
                  roi: {
                    metric: 'time savings',
                    value: 90,
                    unit: '%',
                    timeframe: '2 months'
                  },
                  implementation: {
                    complexity: 'medium',
                    timeToValue: '2-4 weeks',
                    integrationRequired: ['Payment gateway', 'CRM', 'Accounting'],
                    trainingRequired: 'moderate'
                  },
                  confidence: 'medium'
                }
              ]
            },
            {
              category: 'Lead Intelligence & Analytics',
              tools: [
                {
                  name: 'Google Analytics 4 + Looker Studio',
                  vendor: 'Google',
                  description: 'Free analytics suite with custom dashboards. Track lead sources, conversion rates, and marketing ROI in real-time.',
                  solvesPainPoints: ['Cannot track performance', 'Marketing channel attribution', 'Competitor monitoring'],
                  pricing: {
                    model: 'month',
                    cost: 0,
                    currency: 'USD',
                    perUser: false,
                    additionalCosts: 'Setup consulting: $500-1,500'
                  },
                  roi: {
                    metric: 'marketing efficiency',
                    value: 60,
                    unit: '%',
                    timeframe: '3 months'
                  },
                  implementation: {
                    complexity: 'low',
                    timeToValue: '1 week',
                    integrationRequired: ['Website', 'CRM', 'Ad platforms'],
                    trainingRequired: 'minimal'
                  },
                  confidence: 'high'
                },
                {
                  name: 'Databox',
                  vendor: 'Databox',
                  description: 'Business analytics platform that consolidates KPIs from multiple sources into unified dashboards.',
                  solvesPainPoints: ['Performance tracking', 'Marketing attribution', 'Operational chaos'],
                  pricing: {
                    model: 'month',
                    cost: 72,
                    currency: 'USD',
                    perUser: false
                  },
                  roi: {
                    metric: 'decision speed',
                    value: 200,
                    unit: '%',
                    timeframe: '1 month'
                  },
                  implementation: {
                    complexity: 'low',
                    timeToValue: '3-5 days',
                    integrationRequired: ['CRM', 'Analytics', 'Ad platforms'],
                    trainingRequired: 'minimal'
                  },
                  confidence: 'medium'
                }
              ]
            }
          ]
        }
      },

      // Stage 3: Financial Analysis
      stage3: {
        financialAnalysis: {
          currentCosts: {
            annualWaste: 78000,
            monthlyWaste: 6500,
            breakdown: [
              { category: 'Lost leads from slow follow-up', cost: 36000, percentage: 46 },
              { category: 'Manual quote generation time', cost: 24000, percentage: 31 },
              { category: 'Billing errors and rework', cost: 12000, percentage: 15 },
              { category: 'Manual data entry overhead', cost: 6000, percentage: 8 }
            ]
          },
          scenarios: [
            {
              name: 'Conservative Scenario',
              description: 'Minimal automation adoption, basic tooling only',
              year1: {
                toolsCost: 2400,
                implementationCost: 3000,
                totalInvestment: 5400,
                projectedSavings: 31200,
                netBenefit: 25800,
                roi: 478,
                paybackMonths: 2
              },
              year3: {
                cumulativeSavings: 109200,
                totalInvestment: 8400,
                netBenefit: 100800,
                roi: 1200
              }
            },
            {
              name: 'Realistic Scenario',
              description: 'Core automation stack with CRM, billing, and analytics',
              year1: {
                toolsCost: 4800,
                implementationCost: 6000,
                totalInvestment: 10800,
                projectedSavings: 54600,
                netBenefit: 43800,
                roi: 405,
                paybackMonths: 2
              },
              year3: {
                cumulativeSavings: 187200,
                totalInvestment: 20400,
                netBenefit: 166800,
                roi: 817
              }
            },
            {
              name: 'Optimistic Scenario',
              description: 'Full automation suite with premium integrations',
              year1: {
                toolsCost: 7200,
                implementationCost: 9000,
                totalInvestment: 16200,
                projectedSavings: 70200,
                netBenefit: 54000,
                roi: 333,
                paybackMonths: 3
              },
              year3: {
                cumulativeSavings: 234000,
                totalInvestment: 30600,
                netBenefit: 203400,
                roi: 665
              }
            }
          ]
        }
      },

      // Stage 4: Strategic Recommendations
      stage4: {
        strategicRecommendations: {
          priorityRanking: [
            {
              recommendation: 'Implement CRM with quote automation (Pipedrive or HubSpot)',
              priority: 1,
              justification: 'Addresses highest-cost pain point (lost leads) and quote generation bottleneck. Immediate revenue impact expected.'
            },
            {
              recommendation: 'Automate billing process with Xero',
              priority: 2,
              justification: 'Quick win with low complexity. Eliminates 8-12 hours monthly overhead and reduces errors.'
            },
            {
              recommendation: 'Set up analytics dashboard (GA4 + Looker Studio)',
              priority: 3,
              justification: 'Free solution that provides critical visibility into lead sources and marketing ROI. Informs all future optimization.'
            },
            {
              recommendation: 'Integrate CRM with billing system',
              priority: 4,
              justification: 'Eliminates duplicate data entry and ensures seamless quote-to-cash flow.'
            },
            {
              recommendation: 'Implement automated lead nurture sequences',
              priority: 5,
              justification: 'Reduces manual follow-up burden while maintaining customer engagement.'
            }
          ],
          implementationRoadmap: [
            {
              phase: 'Phase 1: Quick Wins',
              timeline: '0-30 days',
              focus: 'Deploy high-impact, low-complexity solutions',
              actions: [
                {
                  action: 'Set up Google Analytics 4 and Looker Studio dashboard',
                  timeline: '3-5 days',
                  priority: 'high',
                  effort: 'low',
                  impact: 'high',
                  quickWin: true
                },
                {
                  action: 'Implement Xero for automated billing and invoicing',
                  timeline: '1-2 weeks',
                  priority: 'high',
                  effort: 'low',
                  impact: 'high',
                  quickWin: true
                },
                {
                  action: 'Create quote templates in current system',
                  timeline: '2-3 days',
                  priority: 'medium',
                  effort: 'low',
                  impact: 'medium',
                  quickWin: true
                }
              ]
            },
            {
              phase: 'Phase 2: Core Automation',
              timeline: '30-90 days',
              focus: 'Implement CRM and sales automation',
              actions: [
                {
                  action: 'Deploy Pipedrive CRM with quote automation',
                  timeline: '2-3 weeks',
                  priority: 'high',
                  effort: 'medium',
                  impact: 'high',
                  dependencies: ['Team training', 'Data migration']
                },
                {
                  action: 'Set up automated lead follow-up sequences',
                  timeline: '1 week',
                  priority: 'high',
                  effort: 'medium',
                  impact: 'high',
                  dependencies: ['CRM deployment']
                },
                {
                  action: 'Integrate CRM with email and calendar',
                  timeline: '3-5 days',
                  priority: 'medium',
                  effort: 'low',
                  impact: 'medium',
                  dependencies: ['CRM deployment']
                }
              ]
            },
            {
              phase: 'Phase 3: System Integration',
              timeline: '90-180 days',
              focus: 'Connect systems and optimize workflows',
              actions: [
                {
                  action: 'Integrate CRM with Xero for seamless quote-to-cash',
                  timeline: '1-2 weeks',
                  priority: 'high',
                  effort: 'medium',
                  impact: 'high',
                  dependencies: ['CRM stable', 'Xero stable']
                },
                {
                  action: 'Connect analytics to CRM for lead source tracking',
                  timeline: '3-5 days',
                  priority: 'medium',
                  effort: 'low',
                  impact: 'medium'
                },
                {
                  action: 'Build custom reports and KPI dashboards',
                  timeline: '1 week',
                  priority: 'medium',
                  effort: 'medium',
                  impact: 'medium'
                }
              ]
            },
            {
              phase: 'Phase 4: Optimization & Scale',
              timeline: '180+ days',
              focus: 'Refine processes and prepare for growth',
              actions: [
                {
                  action: 'Implement AI-powered lead scoring',
                  timeline: '2-3 weeks',
                  priority: 'low',
                  effort: 'medium',
                  impact: 'medium'
                },
                {
                  action: 'Deploy chatbot for instant quote requests',
                  timeline: '2-4 weeks',
                  priority: 'low',
                  effort: 'medium',
                  impact: 'medium'
                },
                {
                  action: 'Set up automated competitor price monitoring',
                  timeline: '1-2 weeks',
                  priority: 'low',
                  effort: 'low',
                  impact: 'low'
                }
              ]
            }
          ],
          nextSteps: {
            immediate: [
              'Book demo with Pipedrive sales team',
              'Sign up for Xero 30-day trial',
              'Install Google Analytics 4 on website',
              'Audit current customer data for CRM migration'
            ],
            week1: [
              'Complete Xero onboarding and bank connection',
              'Set up basic GA4 conversion tracking',
              'Define quote template requirements',
              'Schedule team training for new tools'
            ],
            month1: [
              'Finalize CRM selection (Pipedrive vs HubSpot)',
              'Migrate top 100 customers to new billing system',
              'Build first Looker Studio dashboard',
              'Document new quote generation process',
              'Set up automated email sequences',
              'Train team on CRM best practices',
              'Review first month analytics insights'
            ]
          }
        }
      }
    }
  }
};

// Example 2: E-commerce Clothing Retailer (Solo)
export const assessmentSeedData2 = {
  id: '944df817-3f1d-4f42-87f3-2b96b83bc555',
  tenant_id: SOCIAL_FINANCE_TENANT_ID,
  user_email: 'taha.anwar@example.com',
  user_first_name: 'Taha',
  user_last_name: 'Anwar',
  user_company: 'Taha Fashion',
  industry: 'E-commerce clothing retailer',
  company_size: 'solo',
  created_at: '2025-10-09T20:54:13.100277Z',
  completed_at: '2025-10-09T21:02:00.000000Z',
  updated_at: '2025-10-09T21:02:00.000000Z',
  responses: {
    industry: 'E-commerce clothing retailer',
    timeline: 'within-month',
    moneyLeaks: ['slow-processes'],
    companySize: 'solo',
    monthlyBudget: 'under-500',
    currentSystems: 'mostly-manual',
    desiredOutcome: ['eliminate-errors'],
    systemsReality: 'I am using manual excel sheets',
    teamCapability: 'very-comfortable',
    repetitiveTasks: ['expense-tracking'],
    efficiencyRating: 'good',
    idealSystemVision: 'automatic',
    businessChallenges: ['too-much-manual-work'],
    weeklyTimeBreakdown: {
      'expense-tracking': '20-40hrs'
    },
    monthlyCostBreakdown: {
      'too-much-manual-work': '$2.5-5k'
    }
  },

  report: {
    id: 'rep_002',
    quiz_response_id: '944df817-3f1d-4f42-87f3-2b96b83bc555',
    report_status: 'completed',
    access_token: 'demo-token-002',
    email_sent_at: '2025-10-09T21:05:00.000000Z',
    created_at: '2025-10-09T21:02:00.000000Z',
    updated_at: '2025-10-09T21:05:00.000000Z',

    final_report: {
      stage1: {
        scores: {
          automationPotential: 9,
          dataRichness: 5,
          processMaturity: 4,
          aiReadiness: 6,
          scalabilityOpportunity: 7
        },
        industryProfile: 'Solo e-commerce operator managing inventory, orders, and expenses manually. High volume of repetitive data entry with significant error risk.',
        painPoints: [
          {
            problem: 'Spending 20-40 hours weekly on manual expense tracking in Excel',
            severity: 'critical',
            cost: 'high',
            aiSuitability: 'excellent'
          },
          {
            problem: 'Manual data entry errors causing inventory discrepancies',
            severity: 'high',
            cost: 'medium',
            aiSuitability: 'excellent'
          },
          {
            problem: 'No automated expense categorization or receipt scanning',
            severity: 'medium',
            cost: 'medium',
            aiSuitability: 'excellent'
          }
        ],
        businessImpact: 'Massive time burden preventing business growth and product development. Error-prone manual processes creating financial tracking gaps.',
        monthlyOpportunity: '$2,500 - $4,000 / month'
      },

      stage2: {
        marketIntelligence: {
          recommendedSolutions: [
            {
              category: 'Expense Management',
              tools: [
                {
                  name: 'QuickBooks Self-Employed',
                  vendor: 'Intuit',
                  description: 'Automated expense tracking with receipt scanning, mileage tracking, and tax categorization. Perfect for solo entrepreneurs.',
                  solvesPainPoints: ['Manual expense tracking', 'Data entry errors', 'Receipt management'],
                  pricing: {
                    model: 'month',
                    cost: 20,
                    currency: 'USD',
                    perUser: false
                  },
                  roi: {
                    metric: 'time savings',
                    value: 85,
                    unit: '%',
                    timeframe: '1 month'
                  },
                  implementation: {
                    complexity: 'low',
                    timeToValue: '1-2 days',
                    integrationRequired: ['Bank account', 'Mobile app'],
                    trainingRequired: 'minimal'
                  },
                  confidence: 'high'
                },
                {
                  name: 'Wave Accounting',
                  vendor: 'Wave Financial',
                  description: 'Free accounting software with expense tracking, invoicing, and receipt scanning. Ideal for bootstrapped businesses.',
                  solvesPainPoints: ['Manual expense tracking', 'Excel management', 'Financial reporting'],
                  pricing: {
                    model: 'month',
                    cost: 0,
                    currency: 'USD',
                    perUser: false,
                    additionalCosts: 'Payment processing: 2.9% + $0.30 per transaction'
                  },
                  roi: {
                    metric: 'time savings',
                    value: 75,
                    unit: '%',
                    timeframe: '2 weeks'
                  },
                  implementation: {
                    complexity: 'low',
                    timeToValue: '1 day',
                    integrationRequired: ['Bank account'],
                    trainingRequired: 'minimal'
                  },
                  confidence: 'high'
                }
              ]
            }
          ]
        }
      },

      stage3: {
        financialAnalysis: {
          currentCosts: {
            annualWaste: 42000,
            monthlyWaste: 3500,
            breakdown: [
              { category: 'Time spent on manual expense tracking', cost: 36000, percentage: 86 },
              { category: 'Data entry errors and corrections', cost: 4800, percentage: 11 },
              { category: 'Missed tax deductions', cost: 1200, percentage: 3 }
            ]
          },
          scenarios: [
            {
              name: 'Conservative Scenario',
              description: 'Free tools only (Wave Accounting)',
              year1: {
                toolsCost: 0,
                implementationCost: 200,
                totalInvestment: 200,
                projectedSavings: 25200,
                netBenefit: 25000,
                roi: 12500,
                paybackMonths: 0
              },
              year3: {
                cumulativeSavings: 75600,
                totalInvestment: 200,
                netBenefit: 75400,
                roi: 37700
              }
            },
            {
              name: 'Realistic Scenario',
              description: 'QuickBooks Self-Employed for comprehensive tracking',
              year1: {
                toolsCost: 240,
                implementationCost: 300,
                totalInvestment: 540,
                projectedSavings: 31500,
                netBenefit: 30960,
                roi: 5733,
                paybackMonths: 0
              },
              year3: {
                cumulativeSavings: 94500,
                totalInvestment: 1020,
                netBenefit: 93480,
                roi: 9165
              }
            },
            {
              name: 'Optimistic Scenario',
              description: 'Premium plan with advanced automation',
              year1: {
                toolsCost: 360,
                implementationCost: 500,
                totalInvestment: 860,
                projectedSavings: 35700,
                netBenefit: 34840,
                roi: 4051,
                paybackMonths: 0
              },
              year3: {
                cumulativeSavings: 107100,
                totalInvestment: 1580,
                netBenefit: 105520,
                roi: 6678
              }
            }
          ]
        }
      },

      stage4: {
        strategicRecommendations: {
          priorityRanking: [
            {
              recommendation: 'Implement automated expense tracking (Wave or QuickBooks)',
              priority: 1,
              justification: 'Immediate 75-85% time savings. Critical for solo operator to free up time for business growth.'
            },
            {
              recommendation: 'Connect bank accounts for automatic transaction import',
              priority: 2,
              justification: 'Eliminates manual data entry and reduces errors to near zero.'
            },
            {
              recommendation: 'Use mobile app for instant receipt scanning',
              priority: 3,
              justification: 'Captures expenses in real-time, preventing lost receipts and missed deductions.'
            }
          ],
          implementationRoadmap: [
            {
              phase: 'Phase 1: Immediate Setup',
              timeline: '0-7 days',
              focus: 'Get expense automation live',
              actions: [
                {
                  action: 'Sign up for Wave Accounting (free) or QuickBooks ($20/mo)',
                  timeline: '15 minutes',
                  priority: 'high',
                  effort: 'low',
                  impact: 'high',
                  quickWin: true
                },
                {
                  action: 'Connect bank accounts for automatic transaction sync',
                  timeline: '30 minutes',
                  priority: 'high',
                  effort: 'low',
                  impact: 'high',
                  quickWin: true
                },
                {
                  action: 'Download mobile app and test receipt scanning',
                  timeline: '15 minutes',
                  priority: 'high',
                  effort: 'low',
                  impact: 'high',
                  quickWin: true
                }
              ]
            },
            {
              phase: 'Phase 2: Process Migration',
              timeline: '7-14 days',
              focus: 'Transition from Excel to automated system',
              actions: [
                {
                  action: 'Import last 3 months of expenses from Excel',
                  timeline: '2-3 hours',
                  priority: 'medium',
                  effort: 'medium',
                  impact: 'medium'
                },
                {
                  action: 'Set up expense categories matching tax requirements',
                  timeline: '1 hour',
                  priority: 'medium',
                  effort: 'low',
                  impact: 'medium'
                },
                {
                  action: 'Create simple workflow for daily expense capture',
                  timeline: '30 minutes',
                  priority: 'medium',
                  effort: 'low',
                  impact: 'high'
                }
              ]
            }
          ],
          nextSteps: {
            immediate: [
              'Sign up for Wave Accounting (free)',
              'Download Wave mobile app'
            ],
            week1: [
              'Connect primary bank account',
              'Scan last 10 receipts to test mobile app',
              'Review auto-categorized transactions'
            ],
            month1: [
              'Stop using Excel for new expenses',
              'Review first monthly financial report',
              'Adjust expense categories as needed',
              'Calculate time savings vs old process'
            ]
          }
        }
      }
    }
  }
};

// Example 3: Plumbing Business
export const assessmentSeedData3 = {
  id: 'fa06141e-abcd-4d45-98a4-4a198336f04c',
  tenant_id: SOCIAL_FINANCE_TENANT_ID,
  user_email: 'john.plumber@example.com',
  user_first_name: 'John',
  user_last_name: 'Smith',
  user_company: 'Smith Plumbing Services',
  industry: 'Plumber',
  company_size: 'solo',
  created_at: '2025-10-08T11:56:03.587495Z',
  completed_at: '2025-10-08T12:08:00.000000Z',
  updated_at: '2025-10-08T12:08:00.000000Z',
  responses: {
    industry: 'Plumber',
    timeline: 'immediate',
    moneyLeaks: ['manual-errors'],
    companySize: 'solo',
    monthlyBudget: 'under-500',
    currentSystems: 'some-tools',
    desiredOutcome: ['focus-strategy', 'scale-capacity'],
    systemsReality: 'Unsure',
    teamCapability: 'prefer-simple',
    repetitiveTasks: ['scheduling', 'quality-checking'],
    efficiencyRating: 'gaps',
    idealSystemVision: 'Easily',
    businessChallenges: ['slow-responses', 'cant-track-issues', 'too-much-manual-work'],
    weeklyTimeBreakdown: {
      'scheduling': '1-5hrs',
      'quality-checking': '1-5hrs'
    },
    monthlyCostBreakdown: {
      'slow-responses': '$2.5-5k',
      'cant-track-issues': '$1-2.5k',
      'too-much-manual-work': '$1-2.5k'
    }
  },

  report: {
    id: 'rep_003',
    quiz_response_id: 'fa06141e-abcd-4d45-98a4-4a198336f04c',
    report_status: 'completed',
    access_token: 'demo-token-003',
    email_sent_at: '2025-10-08T12:10:00.000000Z',
    created_at: '2025-10-08T12:08:00.000000Z',
    updated_at: '2025-10-08T12:10:00.000000Z',

    final_report: {
      stage1: {
        scores: {
          automationPotential: 8,
          dataRichness: 6,
          processMaturity: 5,
          aiReadiness: 7,
          scalabilityOpportunity: 9
        },
        industryProfile: 'Solo service-based business with high customer interaction. Struggles with appointment scheduling, response times, and job tracking.',
        painPoints: [
          {
            problem: 'Slow response to customer inquiries losing 20-30% of potential jobs',
            severity: 'critical',
            cost: 'high',
            aiSuitability: 'excellent'
          },
          {
            problem: 'Manual scheduling creating double-bookings and gaps',
            severity: 'high',
            cost: 'medium',
            aiSuitability: 'excellent'
          },
          {
            problem: 'Cannot track job status or follow up on estimates',
            severity: 'medium',
            cost: 'medium',
            aiSuitability: 'good'
          }
        ],
        businessImpact: 'Lost revenue from slow response times and scheduling inefficiency. Growth limited by manual booking capacity.',
        monthlyOpportunity: '$4,000 - $7,500 / month'
      },

      stage2: {
        marketIntelligence: {
          recommendedSolutions: [
            {
              category: 'Field Service Management',
              tools: [
                {
                  name: 'Jobber',
                  vendor: 'Jobber Software Inc.',
                  description: 'All-in-one field service software with scheduling, quoting, invoicing, and customer communication. Built specifically for home service businesses.',
                  solvesPainPoints: ['Slow customer responses', 'Manual scheduling', 'Job tracking'],
                  pricing: {
                    model: 'month',
                    cost: 69,
                    currency: 'USD',
                    perUser: false
                  },
                  roi: {
                    metric: 'revenue increase',
                    value: 40,
                    unit: '%',
                    timeframe: '6 months'
                  },
                  implementation: {
                    complexity: 'low',
                    timeToValue: '1 week',
                    integrationRequired: ['Email', 'Calendar', 'Payment processing'],
                    trainingRequired: 'minimal'
                  },
                  confidence: 'high'
                },
                {
                  name: 'Housecall Pro',
                  vendor: 'Codefied Inc.',
                  description: 'Mobile-first service business platform with online booking, dispatch, and automated customer communications.',
                  solvesPainPoints: ['Customer response time', 'Scheduling conflicts', 'Manual work'],
                  pricing: {
                    model: 'month',
                    cost: 49,
                    currency: 'USD',
                    perUser: false
                  },
                  roi: {
                    metric: 'time savings',
                    value: 10,
                    unit: 'hours/week',
                    timeframe: '1 month'
                  },
                  implementation: {
                    complexity: 'low',
                    timeToValue: '3-5 days',
                    integrationRequired: ['Phone', 'Email', 'Payment gateway'],
                    trainingRequired: 'minimal'
                  },
                  confidence: 'high'
                }
              ]
            }
          ]
        }
      },

      stage3: {
        financialAnalysis: {
          currentCosts: {
            annualWaste: 66000,
            monthlyWaste: 5500,
            breakdown: [
              { category: 'Lost jobs from slow response', cost: 42000, percentage: 64 },
              { category: 'Scheduling inefficiency gaps', cost: 18000, percentage: 27 },
              { category: 'Missed follow-ups on estimates', cost: 6000, percentage: 9 }
            ]
          },
          scenarios: [
            {
              name: 'Conservative Scenario',
              description: 'Basic service management software',
              year1: {
                toolsCost: 588,
                implementationCost: 500,
                totalInvestment: 1088,
                projectedSavings: 26400,
                netBenefit: 25312,
                roi: 2326,
                paybackMonths: 0
              },
              year3: {
                cumulativeSavings: 79200,
                totalInvestment: 2264,
                netBenefit: 76936,
                roi: 3398
              }
            },
            {
              name: 'Realistic Scenario',
              description: 'Full-featured platform (Jobber or Housecall Pro)',
              year1: {
                toolsCost: 828,
                implementationCost: 800,
                totalInvestment: 1628,
                projectedSavings: 39600,
                netBenefit: 37972,
                roi: 2332,
                paybackMonths: 0
              },
              year3: {
                cumulativeSavings: 118800,
                totalInvestment: 3284,
                netBenefit: 115516,
                roi: 3518
              }
            },
            {
              name: 'Optimistic Scenario',
              description: 'Premium plan with marketing automation',
              year1: {
                toolsCost: 1188,
                implementationCost: 1200,
                totalInvestment: 2388,
                projectedSavings: 52800,
                netBenefit: 50412,
                roi: 2111,
                paybackMonths: 1
              },
              year3: {
                cumulativeSavings: 158400,
                totalInvestment: 4764,
                netBenefit: 153636,
                roi: 3225
              }
            }
          ]
        }
      },

      stage4: {
        strategicRecommendations: {
          priorityRanking: [
            {
              recommendation: 'Implement field service management software (Jobber or Housecall Pro)',
              priority: 1,
              justification: 'Addresses all major pain points. Automated scheduling and instant customer responses will capture lost revenue immediately.'
            },
            {
              recommendation: 'Enable online booking on website',
              priority: 2,
              justification: 'Allows customers to self-schedule 24/7, reducing phone tag and capturing after-hours leads.'
            },
            {
              recommendation: 'Set up automated estimate follow-ups',
              priority: 3,
              justification: 'Converts more estimates to jobs without manual effort.'
            }
          ],
          implementationRoadmap: [
            {
              phase: 'Phase 1: Core Setup',
              timeline: '0-7 days',
              focus: 'Get scheduling and communication automated',
              actions: [
                {
                  action: 'Sign up for Jobber or Housecall Pro',
                  timeline: '1 hour',
                  priority: 'high',
                  effort: 'low',
                  impact: 'high',
                  quickWin: true
                },
                {
                  action: 'Import existing customer list',
                  timeline: '2-3 hours',
                  priority: 'high',
                  effort: 'low',
                  impact: 'medium',
                  quickWin: true
                },
                {
                  action: 'Set up service catalog and pricing',
                  timeline: '1-2 hours',
                  priority: 'high',
                  effort: 'low',
                  impact: 'high',
                  quickWin: true
                }
              ]
            },
            {
              phase: 'Phase 2: Customer-Facing Features',
              timeline: '7-14 days',
              focus: 'Enable self-service and automation',
              actions: [
                {
                  action: 'Add online booking widget to website',
                  timeline: '30 minutes',
                  priority: 'high',
                  effort: 'low',
                  impact: 'high'
                },
                {
                  action: 'Set up automated appointment reminders',
                  timeline: '30 minutes',
                  priority: 'medium',
                  effort: 'low',
                  impact: 'medium'
                },
                {
                  action: 'Configure auto-reply for after-hours inquiries',
                  timeline: '15 minutes',
                  priority: 'medium',
                  effort: 'low',
                  impact: 'medium'
                }
              ]
            }
          ],
          nextSteps: {
            immediate: [
              'Start free trial of Jobber and Housecall Pro',
              'Watch product demo videos'
            ],
            week1: [
              'Choose platform and subscribe',
              'Import customer database',
              'Set up service types and pricing',
              'Add online booking to website'
            ],
            month1: [
              'Run all new bookings through the system',
              'Enable automated reminders',
              'Set up estimate follow-up sequences',
              'Track response time improvements',
              'Measure booking conversion rate'
            ]
          }
        }
      }
    }
  }
};
