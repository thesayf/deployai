/**
 * Upstash Workflow: Process Pipeline
 * Orchestrates the 4-stage AI pipeline using Upstash Workflow
 * This allows long-running operations beyond Vercel's 10-second limit
 */

import { serve } from "@upstash/workflow/nextjs";
import { supabaseAdmin } from '@/lib/supabase';
import { sendReportReadyEmail } from '@/lib/email/email-service';
import { ProblemAnalysis, ToolResearch, CuratedTools } from '@/types/ai-analysis-new';

interface WorkflowPayload {
  reportId: string;
  force?: boolean;
}

const { POST } = serve<WorkflowPayload>(
  async (context) => {
    const { reportId, force = false } = context.requestPayload;
    const startTime = Date.now();
    
    console.log('[Workflow] Starting pipeline for report:', reportId);
    console.log('[Workflow] Force reprocess:', force);

    // Step 1: Fetch report and quiz data (quick operation)
    const reportData = await context.run("fetch-report", async () => {
      const supabase = supabaseAdmin();
      
      const { data: report, error } = await supabase
        .from('ai_reports')
        .select(`
          *,
          quiz_responses!inner(
            id,
            responses,
            user_email,
            user_first_name,
            user_last_name,
            user_company,
            industry,
            company_size
          )
        `)
        .eq('id', reportId)
        .single();

      if (error || !report) {
        throw new Error(`Report not found: ${reportId}`);
      }

      // Extract quiz data
      const quizData = Array.isArray(report.quiz_responses) 
        ? report.quiz_responses[0] 
        : report.quiz_responses;

      if (!quizData) {
        throw new Error('No quiz data found for report');
      }

      console.log('[Workflow] Report fetched, status:', report.report_status);
      
      // Check if already completed and not forcing
      if (report.report_status === 'completed' && !force) {
        console.log('[Workflow] Report already completed, skipping');
        return { alreadyCompleted: true, report, quizData };
      }

      return { alreadyCompleted: false, report, quizData };
    });

    // Exit early if already completed
    if (reportData.alreadyCompleted) {
      return { 
        success: true, 
        message: 'Report already completed',
        status: 'completed'
      };
    }

    const { report, quizData } = reportData;
    
    // Get the base URL from the workflow context or environment
    // The workflow needs the full URL with protocol for API calls
    let baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
    
    // If no URL is set, try to use Vercel URL
    if (!baseUrl && process.env.VERCEL_URL) {
      baseUrl = `https://${process.env.VERCEL_URL}`;
    }
    
    // Fallback to localhost for development
    if (!baseUrl) {
      baseUrl = 'http://localhost:3002';
    }
    
    // Ensure protocol is included
    if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
      // In production, use https by default
      baseUrl = `https://${baseUrl}`;
    }
    
    console.log('[Workflow] Base URL for API calls:', baseUrl);
    console.log('[Workflow] Environment check - NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);
    console.log('[Workflow] Environment check - VERCEL_URL:', process.env.VERCEL_URL);

    // Stage 1: Problem Analysis (long AI operation via context.call)
    let problemAnalysis: ProblemAnalysis | null = report.stage1_problem_analysis;
    
    if (!problemAnalysis || force) {
      console.log('[Workflow] Stage 1: Analyzing problems...');
      
      const { body: stage1Response } = await context.call<{ success: boolean; data: ProblemAnalysis }>(
        "stage1-analysis",
        {
          url: `${baseUrl}/api/ai/step1`,
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            responses: quizData.responses,
            company: quizData.user_company
          }
        }
      );

      if (!stage1Response.success) {
        throw new Error('Stage 1 failed');
      }

      problemAnalysis = stage1Response.data;

      // Save Stage 1 results (quick operation)
      await context.run("save-stage1", async () => {
        const supabase = supabaseAdmin();
        const { error } = await supabase
          .from('ai_reports')
          .update({ 
            stage1_problem_analysis: problemAnalysis,
            updated_at: new Date().toISOString()
          })
          .eq('id', reportId);

        if (error) {
          throw new Error(`Failed to save Stage 1: ${error.message}`);
        }
        
        console.log('[Workflow] Stage 1 complete and saved');
      });
    }

    // Stage 2: Tool Research (long AI operation with web search)
    let toolResearch: ToolResearch | null = report.stage2_tool_research;
    
    if (!toolResearch || force) {
      console.log('[Workflow] Stage 2: Researching tools...');
      
      const { body: stage2Response } = await context.call<{ success: boolean; data: ToolResearch }>(
        "stage2-research",
        {
          url: `${baseUrl}/api/ai/step2`,
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            problemAnalysis: problemAnalysis!
          }
        }
      );

      if (!stage2Response.success) {
        throw new Error('Stage 2 failed');
      }

      toolResearch = stage2Response.data;

      // Save Stage 2 results (quick operation)
      await context.run("save-stage2", async () => {
        const supabase = supabaseAdmin();
        const { error } = await supabase
          .from('ai_reports')
          .update({ 
            stage2_tool_research: toolResearch,
            updated_at: new Date().toISOString()
          })
          .eq('id', reportId);

        if (error) {
          throw new Error(`Failed to save Stage 2: ${error.message}`);
        }
        
        console.log('[Workflow] Stage 2 complete and saved');
      });
    }

    // Stage 3: Tool Curation (long AI operation)
    let curatedTools: CuratedTools | null = report.stage3_tool_selection;
    
    if (!curatedTools || force) {
      console.log('[Workflow] Stage 3: Curating tools...');
      
      const { body: stage3Response } = await context.call<{ success: boolean; data: CuratedTools }>(
        "stage3-curation",
        {
          url: `${baseUrl}/api/ai/step3`,
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            problemAnalysis: problemAnalysis!,
            toolResearch: toolResearch!
          }
        }
      );

      if (!stage3Response.success) {
        throw new Error('Stage 3 failed');
      }

      curatedTools = stage3Response.data;

      // Save Stage 3 results (quick operation)
      await context.run("save-stage3", async () => {
        const supabase = supabaseAdmin();
        const { error } = await supabase
          .from('ai_reports')
          .update({ 
            stage3_tool_selection: curatedTools,
            updated_at: new Date().toISOString()
          })
          .eq('id', reportId);

        if (error) {
          throw new Error(`Failed to save Stage 3: ${error.message}`);
        }
        
        console.log('[Workflow] Stage 3 complete and saved');
      });
    }

    // Stage 4: Final Report Generation (long AI operation)
    let finalReport: any = report.stage4_report_content;
    
    if (!finalReport || force) {
      console.log('[Workflow] Stage 4: Generating final report...');
      
      const { body: stage4Response } = await context.call<{ success: boolean; data: any }>(
        "stage4-report",
        {
          url: `${baseUrl}/api/ai/step4`,
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            problemAnalysis: problemAnalysis!,
            curatedTools: curatedTools!,
            writeUpModel: process.env.WRITE_UP_MODEL
          }
        }
      );

      if (!stage4Response.success) {
        throw new Error('Stage 4 failed');
      }

      finalReport = stage4Response.data;

      // Save Stage 4 results and update status (quick operation)
      await context.run("save-stage4", async () => {
        const supabase = supabaseAdmin();
        
        // First save the content
        const { error: contentError } = await supabase
          .from('ai_reports')
          .update({ 
            stage4_report_content: finalReport,
            updated_at: new Date().toISOString()
          })
          .eq('id', reportId);

        if (contentError) {
          throw new Error(`Failed to save Stage 4 content: ${contentError.message}`);
        }
        
        // Then update status to completed
        const { error: statusError } = await supabase
          .from('ai_reports')
          .update({ 
            report_status: 'completed',
            updated_at: new Date().toISOString()
          })
          .eq('id', reportId);

        if (statusError) {
          console.error('[Workflow] Failed to update status:', statusError.message);
          // Don't throw - content is saved
        }
        
        console.log('[Workflow] Stage 4 complete and saved');
      });
    }

    // Send report ready email (quick operation)
    if (!report.email_sent_at || force) {
      await context.run("send-email", async () => {
        console.log('[Workflow] Sending report ready email...');
        
        const emailResult = await sendReportReadyEmail({
          reportId,
          userEmail: quizData.user_email,
          firstName: quizData.user_first_name || 'there',
          lastName: quizData.user_last_name || '',
          company: quizData.user_company,
          accessToken: report.access_token,
          req: { headers: { host: process.env.NEXT_PUBLIC_APP_URL?.replace(/https?:\/\//, '') || 'localhost:3002' } } as any
        });

        if (emailResult.success) {
          console.log('[Workflow] Email sent successfully:', emailResult.emailId);
        } else {
          console.error('[Workflow] Failed to send email:', emailResult.error);
          // Don't fail the whole workflow for email failure
        }
      });
    }

    const totalTime = (Date.now() - startTime) / 1000;
    console.log('[Workflow] Pipeline complete in', totalTime, 'seconds');

    return { 
      success: true, 
      message: 'Pipeline processing complete',
      status: 'completed',
      processingTime: totalTime
    };
  },
  {
    // Optional: Add failure handling
    failureFunction: async ({ context, failStatus, failResponse }) => {
      console.error('[Workflow] Pipeline failed:', failStatus, failResponse);
      
      // Mark report as failed in database
      const { reportId } = context.requestPayload;
      const supabase = supabaseAdmin();
      
      await supabase
        .from('ai_reports')
        .update({
          report_status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('id', reportId);
    }
  }
);

// Next.js Pages Router requires a default export
export default POST;