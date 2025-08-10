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
  console.log('[STEP3] Handler called. Method:', req.method);
  
  if (req.method !== 'POST') {
    console.error('[STEP3] ERROR - Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify internal API key for security
  const apiKey = req.headers['x-api-key'];
  console.log('[STEP3] API Key check - Received:', apiKey ? 'Present' : 'Missing');
  
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    console.error('[STEP3] ERROR - Unauthorized. Key mismatch');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('[STEP3] Authentication passed');

  try {
    const { quizResponseId, reportId, problemAnalysis, toolResearch } = req.body as CurateRequest;
    
    console.log('[STEP3] Starting curation for:');
    console.log('[STEP3] Report ID:', reportId);
    console.log('[STEP3] Quiz Response ID:', quizResponseId);
    console.log('[STEP3] ProblemAnalysis received:', !!problemAnalysis);
    console.log('[STEP3] ToolResearch received:', !!toolResearch);
    console.log('[STEP3] Recommended solutions count:', toolResearch?.recommendedSolutions?.length);

    const supabase = supabaseAdmin();

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    // Generate prompt
    const prompt = generateStep3Prompt(problemAnalysis, toolResearch);
    console.log('[STEP3] Prompt generated. Length:', prompt.length);

    // Call Claude
    console.log('[STEP3] Calling Claude API...');
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
<<<<<<< HEAD
      max_tokens: 15000,  // Increased to prevent truncation
=======
      max_tokens: 4000,
>>>>>>> origin/main
      temperature: 0.2,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract JSON from response
    console.log('[STEP3] Claude API response received');
    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    console.log('[STEP3] Response content length:', content.length);
    
    let curatedTools;
    
    try {
      console.log('[STEP3] Attempting to parse JSON response...');
      curatedTools = cleanAndParseJSON(content);
      console.log('[STEP3] SUCCESS - Parsed curated tools');
      console.log('[STEP3] Selected tools count:', curatedTools.selectedTools?.length);
      console.log('[STEP3] Executive summary:', curatedTools.executiveSummary?.estimatedAnnualOpportunity);
    } catch (parseError) {
      console.error('[STEP3] ERROR - Failed to parse AI response');
      console.error('[STEP3] Parse error:', parseError instanceof Error ? parseError.message : parseError);
      console.error('[STEP3] Response content preview:', content.substring(0, 500));
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
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `http://${req.headers.host}`;
    const step4Url = `${baseUrl}/api/ai-analysis/step4-generate`;
    
    console.log('[STEP3->STEP4] Starting Step 4 trigger');
    console.log('[STEP3->STEP4] URL:', step4Url);
    
    fetch(step4Url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key-12345',
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
    console.error('[STEP3] CRITICAL ERROR in step 3 curation');
    if (error instanceof Error) {
      console.error('[STEP3] Error type:', error.name);
      console.error('[STEP3] Error message:', error.message);
      console.error('[STEP3] Error stack:', error.stack);
    } else {
      console.error('[STEP3] Unknown error:', error);
    }
    
    res.status(500).json({ 
      error: 'Failed to curate tools',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}