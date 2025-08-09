import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateStep1Prompt } from '@/prompts/step1-problem-analysis';
import { cleanAndParseJSON } from '@/utils/clean-json';
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

    // Check which columns exist in the database
    const { data: reportCheck, error: checkError } = await supabase
      .from('ai_reports')
      .select('*')
      .eq('id', reportId)
      .single();

    if (checkError || !reportCheck) {
      console.error('Report not found:', reportId, checkError);
      return res.status(404).json({ error: 'Report not found' });
    }

    console.log('Report columns available:', Object.keys(reportCheck));

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY!,
    });

    // Generate prompt
    const prompt = generateStep1Prompt(quizData.responses);

    // Call Claude
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
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
      problemAnalysis = cleanAndParseJSON(content);
      console.log('Step 1 - Successfully parsed problem analysis');
      console.log('Problem analysis structure:', Object.keys(problemAnalysis));
    } catch (parseError) {
      console.error('Failed to parse AI response in Step 1');
      console.error('Raw content:', content);
      throw new Error('Invalid AI response format in Step 1');
    }

    // Determine which column name to use based on what exists
    const hasNewColumns = 'stage1_problem_analysis' in reportCheck;
    const hasOldColumns = 'stage1_analysis' in reportCheck;
    
    console.log('Has new columns (stage1_problem_analysis):', hasNewColumns);
    console.log('Has old columns (stage1_analysis):', hasOldColumns);

    let updateData: any = {
      report_status: 'stage1_complete',
      updated_at: new Date().toISOString()
    };

    // Use the correct column name based on what exists
    if (hasNewColumns) {
      updateData.stage1_problem_analysis = problemAnalysis;
      console.log('Using new column name: stage1_problem_analysis');
    } else if (hasOldColumns) {
      updateData.stage1_analysis = problemAnalysis;
      console.log('Using old column name: stage1_analysis');
    } else {
      console.error('ERROR: No recognized stage1 column found in database!');
      console.error('Available columns:', Object.keys(reportCheck));
      throw new Error('Database schema mismatch - no stage1 column found');
    }

    // Update report with Step 1 analysis
    const { data: updatedReport, error: updateError } = await supabase
      .from('ai_reports')
      .update(updateData)
      .eq('id', reportId)
      .select('*')
      .single();

    if (updateError) {
      console.error('Error updating report:', updateError);
      console.error('Attempted update data:', updateData);
      throw updateError;
    }

    // Verify the update worked
    const savedColumn = hasNewColumns ? 'stage1_problem_analysis' : 'stage1_analysis';
    console.log('Update successful!');
    console.log(`Data saved to ${savedColumn}:`, updatedReport[savedColumn] ? 'YES' : 'NO');
    
    if (!updatedReport[savedColumn]) {
      console.error('WARNING: Data was not saved to database!');
      console.error('Full updated report:', updatedReport);
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
      message: 'Step 1 analysis complete',
      savedTo: savedColumn,
      dataSaved: !!updatedReport[savedColumn]
    });

  } catch (error) {
    console.error('Error in step 1 analysis:', error);
    res.status(500).json({ 
      error: 'Failed to analyze problems',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}