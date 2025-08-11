import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateStep4Prompt } from '@/prompts/step4-report-generation';
import { sendReportReadyEmail } from '@/lib/email/email-service';
import { ProblemAnalysis, CuratedTools } from '@/types/ai-analysis-new';
import { cleanAndParseJSON } from '@/utils/clean-json';
import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

interface GenerateRequest {
  quizResponseId: string;
  reportId: string;
  problemAnalysis: ProblemAnalysis;
  curatedTools: CuratedTools;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('[STEP4] Handler called. Method:', req.method);
  
  if (req.method !== 'POST') {
    console.error('[STEP4] ERROR - Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify internal API key for security
  const apiKey = req.headers['x-api-key'];
  console.log('[STEP4] API Key check - Received:', apiKey ? 'Present' : 'Missing');
  
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    console.error('[STEP4] ERROR - Unauthorized. Key mismatch');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('[STEP4] Authentication passed');

  const startTime = Date.now();
  console.log('[STEP4] Function start time:', new Date().toISOString());
  
  // Set timeout warnings for different Vercel plan limits
  const timeout9s = setTimeout(() => {
    console.error('[STEP4] ⚠️ WARNING: 9 seconds elapsed - Hobby plan timeout in 1 second!');
  }, 9000);
  
  const timeout50s = setTimeout(() => {
    console.error('[STEP4] ⚠️ WARNING: 50 seconds elapsed - Pro plan timeout in 10 seconds!');
  }, 50000);
  
  try {
    const { quizResponseId, reportId, problemAnalysis, curatedTools } = req.body as GenerateRequest;
    
    console.log('[STEP4] Starting report generation for:');
    console.log('[STEP4] Report ID:', reportId);
    console.log('[STEP4] Quiz Response ID:', quizResponseId);
    console.log('[STEP4] Elapsed time:', (Date.now() - startTime) / 1000, 'seconds');
    console.log('[STEP4] ProblemAnalysis received:', !!problemAnalysis);
    console.log('[STEP4] CuratedTools received:', !!curatedTools);
    console.log('[STEP4] Selected tools count:', curatedTools?.selectedTools?.length);

    const supabase = supabaseAdmin();

    // Determine which model to use
    const modelChoice = process.env.WRITE_UP_MODEL || 'claude-4';
    console.log('[STEP4] Using model:', modelChoice);

    // Generate prompt
    const prompt = generateStep4Prompt(problemAnalysis, curatedTools);
    console.log('[STEP4] Prompt generated. Length:', prompt.length);

    let content = '';

    if (modelChoice === 'gpt-5') {
      // Initialize OpenAI client
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
      });

      console.log('[STEP4] Calling GPT-5 API (full model)...');
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-5', // Full GPT-5 model for maximum performance
          messages: [
            {
              role: 'system',
              content: 'You are an AI business consultant creating professional reports. You must return only valid JSON without any explanations or markdown. The output must be a JSON object.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          // temperature: 1, // GPT-5 only supports default temperature of 1
          max_completion_tokens: 25000, // GPT-5 uses max_completion_tokens instead of max_tokens
          response_format: { type: "json_object" }, // Ensures JSON response
          // GPT-5 specific parameters
          reasoning_effort: "medium", // Options: minimal, low, medium, high
          verbosity: "medium" // Options: low, medium, high
        } as any); // Using 'as any' since TypeScript types might not be updated yet for GPT-5

        console.log('[STEP4] GPT-5 API response received');
        console.log('[STEP4] Finish reason:', response.choices[0].finish_reason);
        console.log('[STEP4] Model used:', response.model);
        content = response.choices[0].message.content || '';
      } catch (error) {
        console.error('[STEP4] GPT-5 API error:', error);
        throw error;
      }
    } else {
      // Use Claude (default)
      const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY!,
      });

      console.log('[STEP4] Calling Claude API...');
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 15000,  // Increased to prevent truncation
        temperature: 0.3,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      console.log('[STEP4] Claude API response received');
      content = response.content[0].type === 'text' ? response.content[0].text : '';
    }
    console.log('[STEP4] Response content length:', content.length);
    
    let finalReport;
    
    try {
      console.log('[STEP4] Attempting to parse JSON response...');
      finalReport = cleanAndParseJSON(content);
      console.log('[STEP4] SUCCESS - Parsed final report');
      console.log('[STEP4] Final report structure:', Object.keys(finalReport));
      console.log('[STEP4] Recommendations count:', finalReport.recommendedSolutions?.length);
    } catch (parseError) {
      console.error('[STEP4] ERROR - Failed to parse AI response');
      console.error('[STEP4] Parse error:', parseError instanceof Error ? parseError.message : parseError);
      console.error('[STEP4] Response content preview:', content.substring(0, 500));
      throw new Error('Invalid AI response format in Step 4');
    }

    // Update report with final report and mark as completed
    console.log('[STEP4] About to update report with final content...');
    console.log('[STEP4] Report ID:', reportId);
    console.log('[STEP4] Post-AI elapsed time:', (Date.now() - startTime) / 1000, 'seconds');
    const emailTimestamp = new Date().toISOString();
    console.log('[STEP4] email_sent_at timestamp:', emailTimestamp);
    
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({
        stage4_report_content: finalReport,
        report_status: 'completed',
        email_sent_at: emailTimestamp,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('[STEP4] ❌ Error updating report:', updateError);
      console.error('[STEP4] Update error details:', JSON.stringify(updateError));
      throw updateError;
    }
    
    console.log('[STEP4] ✅ Report update completed successfully');
    console.log('[STEP4] Updated: stage4_report_content, report_status, email_sent_at, updated_at');

    // Get ALL the data we need in ONE query - report info AND user info
    console.log('[STEP4] Starting email preparation...');
    console.log('[STEP4] Getting report and user data for email...');
    const { data: reportWithUser, error: fetchError } = await supabase
      .from('ai_reports')
      .select(`
        access_token,
        quiz_responses!inner(
          user_email,
          user_first_name,
          user_last_name,
          user_company
        )
      `)
      .eq('id', reportId)
      .single();

    console.log('[STEP4] Fetch complete. Data returned:', !!reportWithUser);
    console.log('[STEP4] Fetch error:', fetchError ? JSON.stringify(fetchError) : 'none');
    
    if (fetchError || !reportWithUser) {
      console.error('[STEP4] ERROR - Failed to fetch data for email:', fetchError);
      console.error('[STEP4] Query failed - no email will be sent');
    } else {
      console.log('[STEP4] Quiz responses found:', !!reportWithUser.quiz_responses);
      // Extract user data (Supabase returns joined data as an object or array)
      const userData = Array.isArray(reportWithUser.quiz_responses) 
        ? reportWithUser.quiz_responses[0] 
        : reportWithUser.quiz_responses;
      
      const userEmail = userData?.user_email;
      console.log('[STEP4] Extracted user email:', userEmail || 'NONE');
      
      if (!userEmail) {
        console.error('[STEP4] ERROR - No email address found');
        console.error('[STEP4] User data structure:', JSON.stringify(userData));
      } else {
        // Send the email - SIMPLE
        console.log('[STEP4] About to call sendReportReadyEmail...');
        console.log('[STEP4] Email params:', {
          reportId,
          userEmail,
          firstName: userData.user_first_name || 'there',
          lastName: userData.user_last_name || '',
          company: userData.user_company,
          hasAccessToken: !!reportWithUser.access_token
        });
        
        const emailResult = await sendReportReadyEmail({
          reportId,
          userEmail,
          firstName: userData.user_first_name || 'there',
          lastName: userData.user_last_name || '',
          company: userData.user_company,
          accessToken: reportWithUser.access_token,
          req
        });

        console.log('[STEP4] Email send attempt complete');
        console.log('[STEP4] Email result:', JSON.stringify(emailResult));
        
        if (!emailResult.success) {
          console.error('[STEP4] ERROR - Email failed:', emailResult.error);
        } else {
          console.log('[STEP4] SUCCESS - Email sent! ID:', emailResult.emailId);
        }
      }
    }

    console.log('[STEP4] Function completing, returning success response');
    console.log('[STEP4] Total elapsed time:', (Date.now() - startTime) / 1000, 'seconds');
    
    // Clear timeout warnings
    clearTimeout(timeout9s);
    clearTimeout(timeout50s);
    
    res.status(200).json({ 
      success: true, 
      message: 'Report generation complete',
      reportId
    });

  } catch (error) {
    console.error('[STEP4] CRITICAL ERROR in step 4 generation');
    if (error instanceof Error) {
      console.error('[STEP4] Error type:', error.name);
      console.error('[STEP4] Error message:', error.message);
      console.error('[STEP4] Error stack:', error.stack);
    } else {
      console.error('[STEP4] Unknown error:', error);
    }
    
    // Mark report as failed
    const supabase = supabaseAdmin();
    await supabase
      .from('ai_reports')
      .update({
        report_status: 'failed',
        updated_at: new Date().toISOString()
      })
      .eq('id', req.body.reportId);

    res.status(500).json({ 
      error: 'Failed to generate report',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}