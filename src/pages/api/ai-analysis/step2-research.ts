import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateStep2Prompt } from '@/prompts/step2-tool-research';
import { ProblemAnalysis } from '@/types/ai-analysis-new';
import { cleanAndParseJSON } from '@/utils/clean-json';
import Anthropic from '@anthropic-ai/sdk';

interface ResearchRequest {
  quizResponseId: string;
  reportId: string;
  problemAnalysis: ProblemAnalysis;
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
    const { quizResponseId, reportId, problemAnalysis } = req.body as ResearchRequest;

    // Validate problemAnalysis structure
    if (!problemAnalysis || !problemAnalysis.businessContext || !problemAnalysis.topOpportunities) {
      console.error('Invalid problemAnalysis structure:', problemAnalysis);
      return res.status(400).json({ 
        error: 'Invalid problem analysis data',
        received: problemAnalysis ? Object.keys(problemAnalysis) : 'null'
      });
    }

    const supabase = supabaseAdmin();

    // Initialize Anthropic client - Claude Sonnet 4 with web search
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    console.log('Step 2 - Processing with business context:', problemAnalysis.businessContext);
    console.log('Step 2 - Number of opportunities:', problemAnalysis.topOpportunities.length);

    // Generate prompt
    const prompt = generateStep2Prompt(problemAnalysis);

    // Call Claude Sonnet 4 with web search capability
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', // Claude Sonnet 4 with web search
      max_tokens: 4000,
      temperature: 0.3,
      system: "You have access to web search. Use it to find real AI tools, pricing, and case studies for the business problems identified.",
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract JSON from response
    const content = response.content[0].type === 'text' ? response.content[0].text : '';
    let toolResearch;
    
    try {
      toolResearch = cleanAndParseJSON(content);
      console.log('Step 2 - Successfully parsed tool research');
    } catch (parseError) {
      console.error('Failed to parse AI response in Step 2');
      console.error('Response content:', content);
      throw new Error('Invalid AI response format in Step 2');
    }

    // Update report with Step 2 research
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({
        stage2_tool_research: toolResearch,
        report_status: 'stage2_complete',
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Error updating report:', updateError);
      throw updateError;
    }

    // Trigger Step 3 (Tool Curation)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `http://${req.headers.host}`;
    const step3Url = `${baseUrl}/api/ai-analysis/step3-curate`;
    
    console.log('Triggering Step 3 at:', step3Url);
    
    fetch(step3Url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key-12345',
      },
      body: JSON.stringify({
        quizResponseId,
        reportId,
        problemAnalysis,
        toolResearch
      }),
    }).catch(error => {
      console.error('Failed to trigger step 3:', error);
    });

    res.status(200).json({ 
      success: true, 
      message: 'Step 2 research complete'
    });

  } catch (error) {
    console.error('Error in step 2 research:', error);
    res.status(500).json({ 
      error: 'Failed to research tools',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}