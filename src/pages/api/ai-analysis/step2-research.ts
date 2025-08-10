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
  console.log('[STEP2] Handler called. Method:', req.method);
  console.log('[STEP2] Headers:', req.headers);
  
  if (req.method !== 'POST') {
    console.error('[STEP2] ERROR - Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify internal API key for security
  const apiKey = req.headers['x-api-key'];
  console.log('[STEP2] API Key check - Received:', apiKey ? 'Present' : 'Missing');
  console.log('[STEP2] API Key check - Expected:', process.env.INTERNAL_API_KEY ? 'Set' : 'Not set');
  
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    console.error('[STEP2] ERROR - Unauthorized. Key mismatch');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('[STEP2] Authentication passed');

  try {
    const { quizResponseId, reportId, problemAnalysis } = req.body as ResearchRequest;
    
    console.log('[STEP2] Starting research for:');
    console.log('[STEP2] Report ID:', reportId);
    console.log('[STEP2] Quiz Response ID:', quizResponseId);
    console.log('[STEP2] ProblemAnalysis received:', !!problemAnalysis);
    console.log('[STEP2] Top opportunities count:', problemAnalysis?.topOpportunities?.length);

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
    console.log('[STEP2] Prompt generated. Length:', prompt.length);

    // Call Claude Sonnet 4 with web search tool enabled
    console.log('[STEP2] Calling Claude API with web search tool...');
    console.log('[STEP2] Model: claude-sonnet-4-20250514');
    console.log('[STEP2] Web search tool: web_search_20250305');
    
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 15000,  // Increased from 4000 to handle complete responses
      temperature: 0.3,
      system: "You are an AI tools expert. Use web search to find real, current AI tools and their actual pricing, features, and case studies. Search for specific tools that solve the identified business problems.",
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      tools: [{
        type: 'web_search_20250305',
        name: 'web_search',
        max_uses: 10  // Allow multiple searches to gather comprehensive data
      }]
    });
    
    console.log('[STEP2] Claude API response received');
    console.log('[STEP2] Stop reason:', response.stop_reason);
    console.log('[STEP2] Content blocks:', response.content.length);

    // Extract JSON from response - handle potential pause_turn for long searches
    let content = '';
    
    // Check if we need to handle pause_turn (long-running search)
    if (response.stop_reason === 'pause_turn') {
      console.log('[STEP2] Handling pause_turn for long-running web search...');
      
      // Continue the conversation to get complete results
      const continuation = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 15000,  // Increased to match main request
        temperature: 0.3,
        messages: [
          { role: 'user', content: prompt },
          { role: 'assistant', content: response.content }
        ],
        tools: [{
          type: 'web_search_20250305',
          name: 'web_search',
          max_uses: 10
        }]
      });
      
      // Get the final content from continuation
      const finalContent = continuation.content.find(c => c.type === 'text');
      content = finalContent ? finalContent.text : '';
    } else {
      // Normal response - extract text content
      const textContent = response.content.find(c => c.type === 'text');
      content = textContent ? textContent.text : '';
      console.log('[STEP2] Normal response - extracted text content. Length:', content.length);
    }
    
    let toolResearch;
    
    try {
      console.log('[STEP2] Attempting to parse JSON response...');
      toolResearch = cleanAndParseJSON(content);
      console.log('[STEP2] SUCCESS - Parsed tool research');
      console.log('[STEP2] Annual opportunity:', toolResearch.estimatedAnnualOpportunity);
      console.log('[STEP2] Number of solutions found:', toolResearch.recommendedSolutions?.length);
    } catch (parseError) {
      console.error('[STEP2] ERROR - Failed to parse AI response');
      console.error('[STEP2] Parse error:', parseError instanceof Error ? parseError.message : parseError);
      console.error('[STEP2] Response content preview:', content.substring(0, 500));
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
    
    console.log('[STEP2->STEP3] Starting Step 3 trigger');
    console.log('[STEP2->STEP3] URL:', step3Url);
    console.log('[STEP2->STEP3] Sending data - reportId:', reportId);
    console.log('[STEP2->STEP3] Sending data - quizResponseId:', quizResponseId);
    
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
    console.error('[STEP2] CRITICAL ERROR in step 2 research');
    if (error instanceof Error) {
      console.error('[STEP2] Error type:', error.name);
      console.error('[STEP2] Error message:', error.message);
      console.error('[STEP2] Error stack:', error.stack);
    } else {
      console.error('[STEP2] Unknown error:', error);
    }
    
    // Log specific error details
    if (error && typeof error === 'object' && 'response' in error) {
      console.error('[STEP2] API Response error:', error.response);
    }
    
    res.status(500).json({ 
      error: 'Failed to research tools',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}