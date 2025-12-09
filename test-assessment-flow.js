#!/usr/bin/env node
/**
 * Assessment Flow Test Script
 *
 * Tests the full assessment submission and report generation pipeline.
 * Run with: node test-assessment-flow.js [--prod] [--tenant=subdomain]
 *
 * Options:
 *   --prod     Use production URL (consultkit.ai) instead of localhost
 *   --tenant   Specify tenant subdomain (default: nexusdigital)
 *   --watch    Keep polling for report completion
 *   --verbose  Show detailed logs
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Parse command line args
const args = process.argv.slice(2);
const isProd = args.includes('--prod');
const isWatch = args.includes('--watch');
const isVerbose = args.includes('--verbose');
const tenantArg = args.find(a => a.startsWith('--tenant='));
const tenant = tenantArg ? tenantArg.split('=')[1] : 'deployai';

const BASE_URL = isProd
  ? `https://www.consultkit.ai`
  : `http://localhost:${process.env.PORT || 3000}`;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Realistic test data templates
const TEST_COMPANIES = [
  {
    firstName: 'Michael',
    lastName: 'Chen',
    email: `test.${Date.now()}@example.com`,
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
    email: `test.${Date.now() + 1}@example.com`,
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
    email: `test.${Date.now() + 2}@example.com`,
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

// Get random test company
function getRandomTestCompany() {
  const template = TEST_COMPANIES[Math.floor(Math.random() * TEST_COMPANIES.length)];
  return {
    ...template,
    email: `test.${Date.now()}@example.com`,
    company: template.company + ` (Test ${Date.now().toString().slice(-4)})`
  };
}

async function log(message, data = null) {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  if (data && isVerbose) {
    console.log(`[${timestamp}] ${message}`, JSON.stringify(data, null, 2));
  } else {
    console.log(`[${timestamp}] ${message}`);
  }
}

async function startQuiz(testData) {
  log('Starting quiz...');

  const response = await fetch(`${BASE_URL}/api/quiz/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-tenant-subdomain': tenant
    },
    body: JSON.stringify({
      email: testData.email,
      firstName: testData.firstName,
      lastName: testData.lastName,
      company: testData.company
    })
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(`Failed to start quiz: ${result.error || response.statusText}`);
  }

  log(`Quiz started with ID: ${result.quizId}`);
  return result.quizId;
}

async function submitQuiz(quizId, testData) {
  log('Submitting quiz responses...');

  const finalResponses = {
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
  };

  const response = await fetch(`${BASE_URL}/api/quiz/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-tenant-subdomain': tenant
    },
    body: JSON.stringify({ quizId, finalResponses })
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(`Failed to submit quiz: ${result.error || response.statusText}`);
  }

  log(`Quiz submitted! Report ID: ${result.reportId}`);
  return result.reportId;
}

async function checkReportStatus(reportId) {
  const { data, error } = await supabase
    .from('ai_reports')
    .select('id, report_status, error_message, stage1_problem_analysis, stage2_tool_research, stage3_tool_selection, stage4_report_content, updated_at')
    .eq('id', reportId)
    .single();

  if (error) {
    throw new Error(`Failed to fetch report: ${error.message}`);
  }

  return {
    status: data.report_status,
    error: data.error_message,
    stages: {
      stage1: !!data.stage1_problem_analysis,
      stage2: !!data.stage2_tool_research,
      stage3: !!data.stage3_tool_selection,
      stage4: !!data.stage4_report_content
    },
    updatedAt: data.updated_at
  };
}

async function pollReportCompletion(reportId, maxWaitMs = 180000) {
  const startTime = Date.now();
  let lastStatus = '';
  let lastProgress = '';

  while (Date.now() - startTime < maxWaitMs) {
    const report = await checkReportStatus(reportId);

    // Build progress string
    const progress = Object.entries(report.stages)
      .map(([stage, done]) => done ? '✓' : '○')
      .join(' ');

    if (report.status !== lastStatus || progress !== lastProgress) {
      log(`Status: ${report.status} | Stages: ${progress} (1 2 3 4)`);
      lastStatus = report.status;
      lastProgress = progress;
    }

    if (report.status === 'completed') {
      return { success: true, report };
    }

    if (report.status === 'failed') {
      return { success: false, error: report.error, report };
    }

    // Wait 3 seconds before next poll
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  return { success: false, error: 'Timeout waiting for report completion' };
}

async function getRecentLogs() {
  log('Fetching recent logs...');

  try {
    const { execSync } = require('child_process');
    const logs = execSync('vercel logs www.consultkit.ai --since=5m 2>&1 | head -50', { encoding: 'utf8' });
    return logs;
  } catch (e) {
    return 'Could not fetch logs: ' + e.message;
  }
}

async function runTest() {
  console.log('\n========================================');
  console.log('  ASSESSMENT FLOW TEST');
  console.log('========================================');
  console.log(`Environment: ${isProd ? 'PRODUCTION' : 'LOCAL'}`);
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Tenant: ${tenant}`);
  console.log(`Watch mode: ${isWatch ? 'ON' : 'OFF'}`);
  console.log('========================================\n');

  const testData = getRandomTestCompany();
  log(`Test company: ${testData.company}`);
  log(`Test email: ${testData.email}`);

  try {
    // Step 1: Start quiz
    const quizId = await startQuiz(testData);

    // Step 2: Submit quiz
    const reportId = await submitQuiz(quizId, testData);

    // Step 3: Poll for completion (if watch mode)
    if (isWatch) {
      console.log('\n--- Watching for report completion (max 3 min) ---\n');
      const result = await pollReportCompletion(reportId);

      if (result.success) {
        console.log('\n========================================');
        console.log('  ✅ TEST PASSED - Report completed!');
        console.log('========================================');
        console.log(`Report ID: ${reportId}`);
        console.log(`View: ${BASE_URL}/${tenant}/admin/assessments/${quizId}`);
      } else {
        console.log('\n========================================');
        console.log('  ❌ TEST FAILED');
        console.log('========================================');
        console.log(`Error: ${result.error}`);
        console.log(`Report status: ${result.report?.status}`);

        // Get logs
        console.log('\n--- Recent Vercel Logs ---');
        const logs = await getRecentLogs();
        console.log(logs);
      }
    } else {
      console.log('\n========================================');
      console.log('  ✅ QUIZ SUBMITTED');
      console.log('========================================');
      console.log(`Quiz ID: ${quizId}`);
      console.log(`Report ID: ${reportId}`);
      console.log(`\nTo watch progress, run:`);
      console.log(`  node test-assessment-flow.js --watch --prod`);
      console.log(`\nOr check manually:`);
      console.log(`  ${BASE_URL}/${tenant}/admin/assessments/${quizId}`);
    }

    // Return IDs for scripting
    return { quizId, reportId, testData };

  } catch (error) {
    console.log('\n========================================');
    console.log('  ❌ TEST ERROR');
    console.log('========================================');
    console.error(error.message);

    if (isProd) {
      console.log('\n--- Recent Vercel Logs ---');
      const logs = await getRecentLogs();
      console.log(logs);
    }

    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runTest().catch(console.error);
}

module.exports = { runTest, getRandomTestCompany, checkReportStatus };
