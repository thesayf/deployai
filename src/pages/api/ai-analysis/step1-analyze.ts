import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateStep1Prompt } from '@/prompts/step1-problem-analysis';
import Anthropic from '@anthropic-ai/sdk';

interface AnalyzeRequest {
  quizResponseId: string;
  reportId: string;
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
    const { quizResponseId, reportId } = req.body as AnalyzeRequest;

    const supabase = supabaseAdmin();

    // Get quiz responses
    const { data: quizData, error: quizError } = await supabase
      .from('quiz_responses')
      .select('*')
      .eq('id', quizResponseId)
      .single();

    if (quizError || !quizData) {
      console.error('Error fetching quiz data:', quizError);
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    // Generate prompt
    const prompt = generateStep1Prompt(quizData.responses);

    // Call Claude
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1500,
      temperature: 0.2,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract JSON from response
    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    let problemAnalysis;
    
    try {
      problemAnalysis = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Invalid AI response format');
    }

    // Update report with Step 1 analysis
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({
        stage1_problem_analysis: problemAnalysis,
        report_status: 'stage1_complete',
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Error updating report:', updateError);
      throw updateError;
    }

    // Trigger Step 2 (Tool Research)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.host}`;
    
    fetch(`${baseUrl}/api/ai-analysis/step2-research`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key',
      },
      body: JSON.stringify({
        quizResponseId,
        reportId,
        problemAnalysis
      }),
    }).catch(error => {
      console.error('Failed to trigger step 2:', error);
    });

    res.status(200).json({ 
      success: true, 
      message: 'Step 1 analysis complete'
    });

  } catch (error) {
    console.error('Error in step 1 analysis:', error);
    res.status(500).json({ 
      error: 'Failed to analyze problems',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}