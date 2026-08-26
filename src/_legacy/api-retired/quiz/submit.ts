import type { NextApiRequest, NextApiResponse } from 'next';
import { SubmitQuizRequest, SubmitQuizResponse, QuizResponseData } from '@/types/quiz';
import { supabaseAdmin } from '@/lib/supabase';
import quizData from '@/data/quiz-questions.json';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubmitQuizResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      reportId: '', 
      processingTime: '',
      error: 'Method not allowed' 
    });
  }

  try {
    const { quizId, finalResponses } = req.body as SubmitQuizRequest;

    // Validate required fields
    if (!quizId || !finalResponses) {
      return res.status(400).json({
        success: false,
        reportId: '',
        processingTime: '',
        error: 'Missing required fields',
      });
    }

    // Validate all required questions are answered
    const requiredQuestions = quizData.questions.filter(q => q.required);
    const missingQuestions = requiredQuestions.filter(q => {
      const response = finalResponses[q.id as keyof QuizResponseData];
      return response === undefined || response === null || response === '';
    });

    if (missingQuestions.length > 0) {
      return res.status(400).json({
        success: false,
        reportId: '',
        processingTime: '',
        error: `Please answer all required questions. Missing: ${missingQuestions.map(q => q.title).join(', ')}`,
      });
    }

    const supabase = supabaseAdmin();

    // Update quiz with final responses (no scoring)
    const { data: updatedQuiz, error: updateError } = await supabase
      .from('quiz_responses')
      .update({
        responses: finalResponses,
        industry: finalResponses.industry,
        company_size: finalResponses.companySize,
        completed_at: new Date().toISOString(),
      })
      .eq('id', quizId)
      .select()
      .single();

    if (updateError || !updatedQuiz) {
      console.error('Failed to update quiz:', updateError);
      return res.status(500).json({
        success: false,
        reportId: '',
        processingTime: '',
        error: 'Failed to submit quiz',
      });
    }

    // Check if a report already exists for this quiz
    console.log(`[SUBMIT] Checking for existing report for quiz ${quizId}...`);
    const { data: existingReport, error: existingCheckError } = await supabase
      .from('ai_reports')
      .select('id, access_token, report_status')
      .eq('quiz_response_id', quizId)
      .single();
    
    if (existingCheckError && existingCheckError.code !== 'PGRST116') {
      console.error('[SUBMIT] Error checking for existing report:', existingCheckError);
    }

    let report;
    
    if (existingReport) {
      // Report already exists, use it
      console.log(`[SUBMIT] DUPLICATE PREVENTED: Report already exists for quiz ${quizId}`);
      console.log(`[SUBMIT] Existing report ID: ${existingReport.id}`);
      console.log(`[SUBMIT] Existing report status: ${existingReport.report_status}`);
      report = existingReport;
      
      // Only return if report is already being processed or completed
      if (existingReport.report_status === 'pending' ||
          existingReport.report_status === 'generating' || 
          existingReport.report_status === 'completed') {
        console.log(`Report is already ${existingReport.report_status}, skipping duplicate trigger`);
        return res.status(200).json({
          success: true,
          reportId: existingReport.id,
          processingTime: '45-60 seconds',
        });
      }
    } else {
      // Create new AI report record with 'pending' status for async processing
      console.log(`[SUBMIT] No existing report found, creating new report for quiz ${quizId}...`);
      const { data: newReport, error: reportError } = await supabase
        .from('ai_reports')
        .insert({
          quiz_response_id: quizId,
          report_status: 'pending',  // Changed from 'generating' to 'pending' for async processing
          company_name: updatedQuiz.user_company || 'Your Organization',
          industry_context: finalResponses.industry,
        })
        .select('id, access_token')
        .single();

      if (reportError || !newReport) {
        console.error('[SUBMIT] Failed to create report:', reportError);
        return res.status(500).json({
          success: false,
          reportId: '',
          processingTime: '',
          error: 'Failed to create report',
        });
      }
      
      console.log(`[SUBMIT] NEW REPORT CREATED: ${newReport.id} for quiz ${quizId}`);
      report = newReport;
    }

    // Report is now created with 'pending' status
    // The workflow will handle updating to 'generating' when it starts processing
    console.log('[SUBMIT] Report created with status: pending');
    
    // Send confirmation email immediately
    console.log('[SUBMIT] Sending confirmation email...');
    try {
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${process.env.PORT || 3000}`}/api/quiz/send-confirmation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: quizId,
          reportId: report.id,
          userEmail: updatedQuiz.user_email || '',
          firstName: updatedQuiz.user_first_name || '',
          lastName: updatedQuiz.user_last_name || '',
          company: updatedQuiz.user_company || ''
        }),
      });
      
      if (!emailResponse.ok) {
        console.error('[SUBMIT] Failed to send confirmation email:', await emailResponse.text());
      } else {
        console.log('[SUBMIT] Confirmation email sent successfully');
      }
    } catch (emailError) {
      console.error('[SUBMIT] Error sending confirmation email:', emailError);
      // Don't fail the whole process if email fails
    }
    
    // Trigger workflow processing (via Upstash Workflow for long-running operations)
    console.log('[SUBMIT] Triggering workflow processing...');
    
    try {
      // Ensure we have a full URL with protocol
      let baseUrl = process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${process.env.PORT || 3000}`;
      
      // Add protocol if missing
      if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
        // In production, use https by default
        baseUrl = `https://${baseUrl}`;
      }
      
      // Import workflow client
      const { triggerWorkflow } = await import('@/lib/workflow/client');
      
      const workflowUrl = `${baseUrl}/api/workflow/process-pipeline`;
      console.log('[SUBMIT] Workflow URL:', workflowUrl);
      
      // Wait max 2 seconds for workflow to start, then return to show animation
      const triggerPromise = triggerWorkflow(
        workflowUrl,
        { reportId: report.id },
        `report-${report.id}` // Unique workflow run ID
      );
      
      const processResponse = await Promise.race([
        triggerPromise,
        new Promise(resolve => setTimeout(() => resolve({ timeout: true }), 2000))
      ]) as any;
      
      if (processResponse.timeout) {
        console.log('[SUBMIT] Workflow trigger initiated (timeout reached, processing continues in background)');
      } else if (processResponse.workflowRunId) {
        console.log('[SUBMIT] Workflow triggered successfully:', processResponse.workflowRunId);
      } else {
        console.error('[SUBMIT] Failed to trigger workflow');
        // Don't fail the request - cron will pick it up as backup
      }
    } catch (error) {
      console.error('[SUBMIT] Error triggering processing:', error);
      // Don't fail the request - cron will pick it up as backup
    }

    // Return immediately - don't wait for processing
    res.status(200).json({
      success: true,
      reportId: report.id,
      processingTime: '45-60 seconds',
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      success: false,
      reportId: '',
      processingTime: '',
      error: 'Failed to submit quiz',
    });
  }
}