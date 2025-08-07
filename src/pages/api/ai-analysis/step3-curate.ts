import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateStep3Prompt } from '@/prompts/step3-tool-curation';
import { ProblemAnalysis, ToolResearch } from '@/types/ai-analysis-new';
import { cleanAndParseJSON } from '@/utils/clean-json';
import Anthropic from '@anthropic-ai/sdk';

interface CurateRequest {
  quizResponseId: string;
  reportId: string;
  problemAnalysis: ProblemAnalysis;
  toolResearch: ToolResearch;
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
    const { quizResponseId, reportId, problemAnalysis, toolResearch } = req.body as CurateRequest;

    const supabase = supabaseAdmin();

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    // Generate prompt
    const prompt = generateStep3Prompt(problemAnalysis, toolResearch);

    // Call Claude
    const response = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4000,
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
    let curatedTools;
    
    try {
      curatedTools = cleanAndParseJSON(content);
      console.log('Step 3 - Successfully parsed curated tools');
    } catch (parseError) {
      console.error('Failed to parse AI response in Step 3');
      console.error('Response content:', content);
      throw new Error('Invalid AI response format in Step 3');
    }

    // Update report with Step 3 curation
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({
        stage3_tool_selection: curatedTools,
        report_status: 'stage3_complete',
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Error updating report:', updateError);
      throw updateError;
    }

    // Trigger Step 4 (Report Generation)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.host}`;
    
    fetch(`${baseUrl}/api/ai-analysis/step4-generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key',
      },
      body: JSON.stringify({
        quizResponseId,
        reportId,
        problemAnalysis,
        curatedTools
      }),
    }).catch(error => {
      console.error('Failed to trigger step 4:', error);
    });

    res.status(200).json({ 
      success: true, 
      message: 'Step 3 curation complete'
    });

  } catch (error) {
    console.error('Error in step 3 curation:', error);
    res.status(500).json({ 
      error: 'Failed to curate tools',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}