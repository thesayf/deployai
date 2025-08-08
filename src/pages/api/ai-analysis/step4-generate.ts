import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateStep4Prompt } from '@/prompts/step4-report-generation';
import { ProblemAnalysis, CuratedTools } from '@/types/ai-analysis-new';
import { cleanAndParseJSON } from '@/utils/clean-json';
import Anthropic from '@anthropic-ai/sdk';

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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify internal API key for security
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { quizResponseId, reportId, problemAnalysis, curatedTools } = req.body as GenerateRequest;

    const supabase = supabaseAdmin();

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    // Generate prompt
    const prompt = generateStep4Prompt(problemAnalysis, curatedTools);

    // Call Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      temperature: 0.3,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract JSON from response
    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    let finalReport;
    
    try {
      finalReport = cleanAndParseJSON(content);
      console.log('Step 4 - Successfully parsed final report');
      console.log('Final report structure:', Object.keys(finalReport));
    } catch (parseError) {
      console.error('Failed to parse AI response in Step 4');
      console.error('Response content:', content);
      throw new Error('Invalid AI response format in Step 4');
    }

    // Update report with final report and mark as completed
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({
        stage4_report_content: finalReport,
        final_report: finalReport,
        report_status: 'report_generated',
        report_generated_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Error updating report:', updateError);
      throw updateError;
    }

    // Send email notification to user with report link
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.host}`;
    
    try {
      const emailResponse = await fetch(`${baseUrl}/api/reports/send-report-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key',
        },
        body: JSON.stringify({
          reportId
        }),
      });

      if (!emailResponse.ok) {
        console.error('Failed to send report email:', await emailResponse.text());
        // Don't fail the whole process if email fails
      } else {
        console.log('Report email sent successfully');
      }
    } catch (emailError) {
      console.error('Error sending report email:', emailError);
      // Continue anyway - report is still generated
    }

    res.status(200).json({ 
      success: true, 
      message: 'Report generation complete',
      reportId
    });

  } catch (error) {
    console.error('Error in step 4 generation:', error);
    
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