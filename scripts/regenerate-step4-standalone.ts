#!/usr/bin/env tsx
/**
 * Standalone script to regenerate Step 4 for an existing report
 * Usage: npx tsx scripts/regenerate-step4-standalone.ts
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const REPORT_ID = '91bf8fc4-1919-46c6-9472-b013c277564b';
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

// Create Supabase client directly
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function regenerateStep4() {
  console.log('🚀 Starting Step 4 regeneration for report:', REPORT_ID);
  console.log('🤖 Using model:', process.env.WRITE_UP_MODEL || 'claude-4');
  
  try {
    // 1. Fetch the existing report data
    console.log('\n📊 Fetching existing report data...');
    const { data: report, error: fetchError } = await supabase
      .from('ai_reports')
      .select('*')
      .eq('id', REPORT_ID)
      .single();
    
    if (fetchError || !report) {
      throw new Error(`Failed to fetch report: ${fetchError?.message}`);
    }
    
    console.log('✅ Report found');
    console.log('  - Company:', report.company_name);
    console.log('  - Status:', report.report_status);
    console.log('  - Has Step 1:', !!report.stage1_problem_analysis);
    console.log('  - Has Step 2:', !!report.stage2_tool_research);
    console.log('  - Has Step 3:', !!report.stage3_tool_selection);
    
    // Check if we have all required steps
    if (!report.stage1_problem_analysis || !report.stage3_tool_selection) {
      throw new Error('Report is missing Step 1 or Step 3 data. Cannot regenerate Step 4.');
    }
    
    // 2. Update status to processing
    console.log('\n🔄 Updating report status to processing...');
    await supabase
      .from('ai_reports')
      .update({ report_status: 'generating' })
      .eq('id', REPORT_ID);
    
    // 3. Call Step 4 API endpoint
    console.log('\n🤖 Calling Step 4 API with', process.env.WRITE_UP_MODEL || 'claude-4', '...');
    
    const response = await fetch(`${BASE_URL}/api/ai-analysis/step4-generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key',
      },
      body: JSON.stringify({
        quizResponseId: report.quiz_response_id,
        reportId: REPORT_ID,
        problemAnalysis: report.stage1_problem_analysis,
        curatedTools: report.stage3_tool_selection,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Step 4 API failed:', response.status);
      console.error('Error details:', errorText);
      throw new Error(`Step 4 API failed: ${response.status}`);
    }
    
    console.log('✅ Step 4 API call successful!');
    
    // 4. Wait a moment for database to update
    console.log('\n⏳ Waiting for database update...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 5. Fetch the updated report to verify
    console.log('\n📝 Verifying updated report...');
    const { data: updatedReport, error: verifyError } = await supabase
      .from('ai_reports')
      .select('report_status, stage4_report_content, final_report')
      .eq('id', REPORT_ID)
      .single();
    
    if (verifyError || !updatedReport) {
      console.error('⚠️ Could not verify update:', verifyError?.message);
    } else {
      console.log('✅ Report updated successfully!');
      console.log('  - Status:', updatedReport.report_status);
      console.log('  - Has Step 4:', !!updatedReport.stage4_report_content);
      console.log('  - Has Final Report:', !!updatedReport.final_report);
      
      // Show a preview of the executive summary if available
      if (updatedReport.final_report?.executiveSummary) {
        console.log('\n📄 Executive Summary Preview:');
        const summary = updatedReport.final_report.executiveSummary;
        console.log('  - Title:', summary.title || 'N/A');
        console.log('  - Tagline:', summary.tagline || 'N/A');
        console.log('  - Key Points:', summary.keyPoints?.length || 0, 'items');
        
        if (summary.keyPoints && summary.keyPoints.length > 0) {
          console.log('\n  First key point:');
          const firstPoint = summary.keyPoints[0];
          console.log('    -', firstPoint.title || firstPoint);
        }
      }
    }
    
    console.log('\n✨ Step 4 regeneration complete!');
    console.log(`\n🔗 View report at: ${BASE_URL}/report/${REPORT_ID}`);
    
  } catch (error) {
    console.error('\n❌ Error regenerating Step 4:', error);
    
    // Try to update status back to previous state
    await supabase
      .from('ai_reports')
      .update({ report_status: 'completed' })
      .eq('id', REPORT_ID);
    
    process.exit(1);
  }
}

// Check required environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('  - NEXT_PUBLIC_SUPABASE_URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.error('  - SUPABASE_SERVICE_ROLE_KEY:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  console.error('  - OPENAI_API_KEY:', !!process.env.OPENAI_API_KEY);
  console.error('  - WRITE_UP_MODEL:', process.env.WRITE_UP_MODEL || 'not set (will use claude-4)');
  process.exit(1);
}

// Run the script
regenerateStep4().catch(console.error);