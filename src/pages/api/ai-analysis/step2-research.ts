import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateStep2Prompt } from '@/prompts/step2-tool-research';
import { ProblemAnalysis } from '@/types/ai-analysis-new';
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

    const supabase = supabaseAdmin();

    // Initialize Anthropic client - Claude Sonnet 4 with web search
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    // Generate prompt
    const prompt = generateStep2Prompt(problemAnalysis);

    // Call Claude Sonnet 4 with web search capability
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022', // Claude Sonnet 4 with web search
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
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        toolResearch = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Invalid AI response format');
    }

    // Update report with Step 2 research
    const { error: updateError } = await supabase
      .from('ai_reports')
      .update({
        tool_research: toolResearch,
        updated_at: new Date().toISOString()
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Error updating report:', updateError);
      throw updateError;
    }

    // Trigger Step 3 (Tool Curation)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.host}`;
    
    fetch(`${baseUrl}/api/ai-analysis/step3-curate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY || 'dev-key',
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