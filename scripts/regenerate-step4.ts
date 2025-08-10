#!/usr/bin/env tsx
/**
 * Script to regenerate Step 4 (final report) for an existing ai_reports record
 * Usage: npx tsx scripts/regenerate-step4.ts
 */

import dotenv from 'dotenv';
import path from 'path';

// Load environment variables FIRST before any other imports
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Now import supabase after env vars are loaded
import { supabaseAdmin } from '../src/lib/supabase';

const REPORT_ID = '91bf8fc4-1919-46c6-9472-b013c277564b';
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001';

async function regenerateStep4() {
  console.log('🚀 Starting Step 4 regeneration for report:', REPORT_ID);
  
  const supabase = supabaseAdmin();
  
  try {
    // 1. Fetch the existing report data
    console.log('📊 Fetching existing report data...');
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
    
    // 2. Call Step 4 API endpoint
    console.log('\n🤖 Calling Step 4 API with GPT-5...');
    console.log('  - Model:', process.env.WRITE_UP_MODEL || 'claude-4');
    
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
      throw new Error(`Step 4 API failed: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('✅ Step 4 generation complete!');
    
    // 3. Fetch the updated report to verify
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
        console.log('  Title:', summary.title);
        console.log('  Tagline:', summary.tagline);
        console.log('  Key Points:', summary.keyPoints?.length || 0, 'items');
      }
    }
    
    console.log('\n✨ Step 4 regeneration complete!');
    console.log(`View report at: ${BASE_URL}/report/${REPORT_ID}`);
    
  } catch (error) {
    console.error('\n❌ Error regenerating Step 4:', error);
    process.exit(1);
  }
}

// Run the script
regenerateStep4().catch(console.error);