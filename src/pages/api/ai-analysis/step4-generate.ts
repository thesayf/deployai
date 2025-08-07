import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateStep4Prompt } from '@/prompts/step4-report-generation';
import { ProblemAnalysis, CuratedTools } from '@/types/ai-analysis-new';
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
      model: 'claude-3-sonnet-20240229',
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
      finalReport = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Invalid AI response format');
    }

    // Update report with final report and mark as completed
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({
        final_report: finalReport,
        report_status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Error updating report:', updateError);
      throw updateError;
    }

    // Send email notification to user (if implemented)
    // This is where you would trigger email sending with the report link

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