/**
 * Add AI analysis seed data to existing assessment
 *
 * Run with: npx tsx scripts/add-seed-report-data.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const THIS_AI_NOW_ASSESSMENT_ID = '2ddf3b8a-6b40-4d7f-b894-f3a5767e7188';

const seedReportData = {
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
};

async function addSeedReportData() {
  console.log('📝 Adding AI analysis seed data to This AI Now assessment...\n');

  // First, check if ai_report already exists
  const { data: existingReport } = await supabase
    .from('ai_reports')
    .select('id')
    .eq('quiz_response_id', THIS_AI_NOW_ASSESSMENT_ID)
    .single();

  if (existingReport) {
    // Update existing report
    const { data, error } = await supabase
      .from('ai_reports')
      .update({
        report_status: 'completed',
        final_report: seedReportData,
        email_sent_at: new Date().toISOString()
      })
      .eq('quiz_response_id', THIS_AI_NOW_ASSESSMENT_ID)
      .select();

    if (error) {
      console.error('❌ Error updating report:', error);
      process.exit(1);
    }

    console.log('✅ Updated existing AI report with seed data');
  } else {
    // Create new report
    const { data, error } = await supabase
      .from('ai_reports')
      .insert({
        quiz_response_id: THIS_AI_NOW_ASSESSMENT_ID,
        report_status: 'completed',
        final_report: seedReportData,
        access_token: `demo-token-${Date.now()}`,
        email_sent_at: new Date().toISOString()
      })
      .select();

    if (error) {
      console.error('❌ Error creating report:', error);
      process.exit(1);
    }

    console.log('✅ Created new AI report with seed data');
  }

  console.log('\n📊 Seed data summary:');
  console.log(`  - ${seedReportData.stage1.painPoints.length} pain points identified`);
  console.log(`  - ${seedReportData.stage2.marketIntelligence.recommendedSolutions.reduce((acc, cat) => acc + cat.tools.length, 0)} tools recommended`);
  console.log(`  - ${seedReportData.stage3.financialAnalysis.scenarios.length} financial scenarios`);
  console.log(`  - ${seedReportData.stage4.strategicRecommendations.implementationRoadmap.length} roadmap phases`);

  console.log('\n✨ Done! Visit /socialfinancelimited/admin/assessments/2ddf3b8a-6b40-4d7f-b894-f3a5767e7188 to see it.');
}

addSeedReportData().catch(console.error);
