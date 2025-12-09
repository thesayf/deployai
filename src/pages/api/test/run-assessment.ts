import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

// Realistic test data templates
const TEST_COMPANIES = [
  {
    firstName: 'Michael',
    lastName: 'Chen',
    company: 'Pacific Coast Plumbing',
    industry: 'Residential and commercial plumbing services',
    size: 'small',
    efficiencyRating: 'gaps',
    repetitiveTasks: ['scheduling', 'invoice-billing', 'customer-inquiries', 'document-creation'],
    weeklyTimeBreakdown: 'Scheduling appointments: 10 hours/week. Creating invoices: 5 hours/week. Answering customer calls: 15 hours/week. Writing estimates and proposals: 8 hours/week. Dispatching technicians: 6 hours/week.',
    businessChallenges: ['slow-responses', 'operational-chaos', 'cant-track-issues', 'too-much-manual-work'],
    monthlyCostBreakdown: 'Missed calls leading to lost jobs: ~$3,000/month. Scheduling conflicts causing wasted trips: ~$800/month. Late invoicing affecting cash flow: delayed by 2-3 weeks on average. Estimate errors: ~$500/month in underquotes.',
    currentSystems: 'some-tools',
    systemsReality: 'We use ServiceTitan for scheduling but the technicians find the mobile app clunky so they call the office instead. QuickBooks for accounting but invoices are created manually from job tickets. Customer calls go to a shared phone line and we lose messages. Tried Google Calendar but it doesnt sync with ServiceTitan.',
    idealSystemVision: 'Customer requests a quote online, gets automatic confirmation. Technician gets notified with all job details. Parts are automatically checked in inventory. When job completes, invoice is automatically generated and sent. Customer gets follow-up survey automatically.',
    moneyLeaks: ['missed-opportunities', 'scheduling-problems', 'manual-errors', 'slow-processes'],
    desiredOutcome: ['scale-capacity', 'autonomous-service'],
    teamCapability: 'basic-comfort',
    monthlyBudget: '500-2000',
    timeline: 'within-month'
  },
  {
    firstName: 'Sarah',
    lastName: 'Williams',
    company: 'Evergreen Financial Advisors',
    industry: 'Independent financial advisory and wealth management',
    size: 'micro',
    efficiencyRating: 'good',
    repetitiveTasks: ['email-management', 'document-creation', 'data-entry', 'compliance-requirements', 'research-tasks'],
    weeklyTimeBreakdown: 'Client emails and follow-ups: 12 hours/week. Creating financial plans and reports: 10 hours/week. Compliance documentation: 6 hours/week. Market research: 4 hours/week. CRM data entry: 3 hours/week.',
    businessChallenges: ['inconsistent-service', 'cant-track-performance', 'too-much-manual-work'],
    monthlyCostBreakdown: 'Time spent on compliance paperwork: worth ~$2,500/month of billable hours. Delayed client reports: potential client attrition risk. Manual CRM updates: ~$500/month in admin time. Research that could be automated: ~$1,000/month.',
    currentSystems: 'integrated-systems',
    systemsReality: 'We use Salesforce CRM which works well but takes time to update. Morningstar for research but copying data to client reports is manual. DocuSign for agreements. Redtail for compliance but doesnt integrate with Salesforce. Monthly newsletter goes through Mailchimp but list management is manual.',
    idealSystemVision: 'AI drafts personalized client updates based on portfolio changes. Compliance documents auto-populate from client data. Research summaries generated automatically for client meetings. Client portal with real-time portfolio views. Automatic meeting prep briefings.',
    moneyLeaks: ['slow-processes', 'wasted-marketing', 'missed-opportunities'],
    desiredOutcome: ['focus-strategy', 'real-time-insights'],
    teamCapability: 'moderately-comfortable',
    monthlyBudget: '2000-5000',
    timeline: 'within-3-months'
  },
  {
    firstName: 'David',
    lastName: 'Rodriguez',
    company: 'Metro Express Logistics',
    industry: 'Last-mile delivery and courier services',
    size: 'medium',
    efficiencyRating: 'gaps',
    repetitiveTasks: ['scheduling', 'data-entry', 'customer-inquiries', 'inventory-tracking', 'quality-checking'],
    weeklyTimeBreakdown: 'Route planning: 20 hours/week. Customer delivery updates: 25 hours/week. Driver dispatch coordination: 15 hours/week. Package tracking inquiries: 20 hours/week. Fleet maintenance scheduling: 5 hours/week.',
    businessChallenges: ['operational-chaos', 'slow-responses', 'quality-suffers', 'cant-track-performance', 'too-much-manual-work'],
    monthlyCostBreakdown: 'Inefficient routes: ~$8,000/month in excess fuel and time. Failed deliveries requiring redelivery: ~$4,000/month. Customer service calls: ~$5,000/month in staff time. Missed SLAs leading to contract penalties: ~$3,000/month. Driver idle time: ~$2,000/month.',
    currentSystems: 'some-tools',
    systemsReality: 'Using a mix of Onfleet for dispatch and Google Sheets for tracking. Customer service uses Zendesk but its not connected to delivery status. Drivers use WhatsApp to communicate which is chaotic. No real-time visibility for customers. Fleet maintenance tracked in Excel.',
    idealSystemVision: 'AI-optimized routes that update in real-time for traffic. Customers get automatic SMS updates at every stage. Drivers have a simple app that handles everything. Real-time dashboard showing all deliveries, issues, and performance. Predictive maintenance alerts for vehicles.',
    moneyLeaks: ['scheduling-problems', 'quality-issues', 'slow-processes', 'missed-opportunities'],
    desiredOutcome: ['scale-capacity', 'eliminate-errors'],
    teamCapability: 'basic-comfort',
    monthlyBudget: '5000-10000',
    timeline: 'immediate'
  }
];

function getRandomTestCompany() {
  const template = TEST_COMPANIES[Math.floor(Math.random() * TEST_COMPANIES.length)];
  const timestamp = Date.now();
  return {
    ...template,
    email: `test.${timestamp}@example.com`,
    company: `${template.company} (Test ${timestamp.toString().slice(-4)})`
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = supabaseAdmin();

    // Get tenant context from header
    const tenantSubdomain = req.headers['x-tenant-subdomain'] as string;

    if (!tenantSubdomain) {
      return res.status(400).json({ error: 'Missing tenant subdomain' });
    }

    // Get tenant from database
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('id, subdomain, company_name')
      .eq('subdomain', tenantSubdomain)
      .single();

    if (tenantError || !tenant) {
      return res.status(404).json({ error: `Tenant not found: ${tenantSubdomain}` });
    }

    console.log(`[Test Assessment] Starting for tenant: ${tenant.company_name} (${tenant.subdomain})`);

    // Get random test company data
    const testData = getRandomTestCompany();

    console.log(`[Test Assessment] Test company: ${testData.company}, Email: ${testData.email}`);

    // Step 1: Create quiz response (bypass all billing checks for tests)
    const { data: quizData, error: quizError } = await supabase
      .from('quiz_responses')
      .insert({
        tenant_id: tenant.id,
        user_email: testData.email,
        user_first_name: testData.firstName,
        user_last_name: testData.lastName,
        user_company: testData.company,
        industry: testData.industry,
        company_size: testData.size,
        responses: {
          industry: testData.industry,
          efficiencyRating: testData.efficiencyRating,
          companySize: testData.size,
          repetitiveTasks: testData.repetitiveTasks,
          weeklyTimeBreakdown: testData.weeklyTimeBreakdown,
          businessChallenges: testData.businessChallenges,
          monthlyCostBreakdown: testData.monthlyCostBreakdown,
          currentSystems: testData.currentSystems,
          systemsReality: testData.systemsReality,
          idealSystemVision: testData.idealSystemVision,
          moneyLeaks: testData.moneyLeaks,
          desiredOutcome: testData.desiredOutcome,
          teamCapability: testData.teamCapability,
          monthlyBudget: testData.monthlyBudget,
          timeline: testData.timeline
        },
        started_at: new Date().toISOString(),
        completed_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (quizError) {
      console.error('[Test Assessment] Quiz creation failed:', quizError);
      return res.status(500).json({ error: 'Failed to create quiz', details: quizError.message });
    }

    console.log(`[Test Assessment] Quiz created: ${quizData.id}`);

    // Step 2: Create ai_report entry directly (bypass billing)
    const { data: reportData, error: reportError } = await supabase
      .from('ai_reports')
      .insert({
        tenant_id: tenant.id,
        quiz_response_id: quizData.id,
        report_status: 'pending',
        company_name: testData.company,
        industry_context: testData.industry
      })
      .select('id')
      .single();

    if (reportError) {
      console.error('[Test Assessment] Report creation failed:', reportError);
      return res.status(500).json({ error: 'Failed to create report', details: reportError.message });
    }

    console.log(`[Test Assessment] Report created: ${reportData.id}`);

    // Step 3: Trigger the workflow DIRECTLY (bypass submit endpoint and billing checks)
    try {
      const { triggerWorkflow } = await import('@/lib/workflow/client');

      let baseUrl = process.env.NEXT_PUBLIC_APP_URL ||
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        baseUrl = `https://${baseUrl}`;
      }

      const workflowUrl = `${baseUrl}/api/workflow/process-pipeline`;
      console.log(`[Test Assessment] Triggering workflow: ${workflowUrl}`);

      const triggerResult = await triggerWorkflow(
        workflowUrl,
        { reportId: reportData.id },
        `test-report-${reportData.id}`
      );

      console.log(`[Test Assessment] Workflow triggered:`, triggerResult);
    } catch (workflowError) {
      console.error('[Test Assessment] Workflow trigger failed:', workflowError);
      // Don't fail - the cron backup will pick it up
    }

    console.log(`[Test Assessment] Successfully created! Quiz: ${quizData.id}, Report: ${reportData.id}`);

    return res.status(200).json({
      success: true,
      quizId: quizData.id,
      reportId: reportData.id,
      testCompany: testData.company,
      testEmail: testData.email,
      redirectUrl: `/${tenantSubdomain}/admin/assessments/${quizData.id}`
    });

  } catch (error) {
    console.error('[Test Assessment] Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
