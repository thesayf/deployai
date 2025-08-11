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
      if (existingReport.report_status === 'processing' || 
          existingReport.report_status === 'completed' ||
          existingReport.report_status === 'generating') {  // Keep for backward compatibility
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
    console.log('[SUBMIT] Report created with status: pending');
    
    // Update status to 'processing' immediately
    const { error: statusUpdateError } = await supabase
      .from('ai_reports')
      .update({ 
        report_status: 'processing',
        updated_at: new Date().toISOString()
      })
      .eq('id', report.id);
    
    if (statusUpdateError) {
      console.error('[SUBMIT] Failed to update status to processing:', statusUpdateError);
    } else {
      console.log('[SUBMIT] Updated report status to processing');
    }
    
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
    
    // Trigger processing in background (fire-and-forget)
    console.log('[SUBMIT] Triggering background report processing...');
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `http://localhost:${process.env.PORT || 3000}`;
    
    // Fire-and-forget: Don't await this
    fetch(`${baseUrl}/api/ai-analysis/process-pipeline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || '',
      },
      body: JSON.stringify({ 
        reportId: report.id 
      }),
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          console.error('[SUBMIT] Background processing failed:', text);
        });
      }
      console.log('[SUBMIT] Background processing started successfully');
    })
    .catch(error => {
      console.error('[SUBMIT] Error starting background processing:', error);
      // Cron will pick it up as backup
    });

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