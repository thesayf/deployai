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
      
      // Only trigger analysis if the report hasn't started processing yet
      if (existingReport.report_status === 'generating') {
        console.log('Report is already being generated, skipping duplicate trigger');
        return res.status(200).json({
          success: true,
          reportId: existingReport.id,
          processingTime: '45-60 seconds',
        });
      }
    } else {
      // Create new AI report record
      console.log(`[SUBMIT] No existing report found, creating new report for quiz ${quizId}...`);
      const { data: newReport, error: reportError } = await supabase
        .from('ai_reports')
        .insert({
          quiz_response_id: quizId,
          report_status: 'generating',
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

    // Only trigger AI report generation if it's a new report or hasn't started processing
    if (!existingReport || existingReport.report_status === 'pending') {
      console.log('[SUBMIT] Triggering Step 1 analysis...');
      console.log('[SUBMIT] Report status:', existingReport?.report_status || 'new');
      
      // Trigger AI report generation asynchronously (Step 1 first)
      // We'll return immediately and process in the background
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.host}`;
      console.log('[SUBMIT] Using base URL:', baseUrl);
      console.log('[SUBMIT] Step 1 endpoint:', `${baseUrl}/api/ai-analysis/step1-analyze`);
      
      fetch(`${baseUrl}/api/ai-analysis/step1-analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key',
        },
        body: JSON.stringify({
          quizResponseId: quizId,
          reportId: report.id,
        }),
      })
      .then(response => {
        console.log('[SUBMIT] Step 1 trigger response status:', response.status);
        return response.json();
      })
      .then(data => {
        console.log('[SUBMIT] Step 1 trigger response:', data);
      })
      .catch(error => {
        console.error('[SUBMIT] Failed to trigger step 1 analysis:', error);
      });
    } else {
      console.log(`[SUBMIT] Report ${report.id} already processing or completed (status: ${existingReport?.report_status}), skipping trigger`);
    }

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