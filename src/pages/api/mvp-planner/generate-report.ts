import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { generateAIContent } from '@/lib/anthropic';
import { 
  MVP_PLANNER_SYSTEM_PROMPT, 
  MVP_PLANNER_USER_PROMPT,
  MVP_PLANNER_JSON_SCHEMA 
} from '@/prompts/mvp-planner-prompt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow internal calls
  const internalKey = req.headers['x-internal-api-key'];
  if (internalKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { reportId } = req.body;

    if (!reportId) {
      return res.status(400).json({ error: 'Missing reportId' });
    }

    const supabase = supabaseAdmin();

    // Get report and associated quiz response
    const { data: report, error: reportError } = await supabase
      .from('mvp_planner_reports')
      .select(`
        id,
        mvp_planner_response_id,
        mvp_planner_responses (
          user_email,
          user_first_name,
          project_name,
          responses
        )
      `)
      .eq('id', reportId)
      .single();

    if (reportError || !report) {
      console.error('Error fetching report:', reportError);
      return res.status(404).json({ error: 'Report not found' });
    }

    const quizResponse = report.mvp_planner_responses;
    if (!quizResponse) {
      return res.status(404).json({ error: 'Quiz response not found' });
    }

    // Update status to generating
    await supabase
      .from('mvp_planner_reports')
      .update({ report_status: 'generating' })
      .eq('id', reportId);

    // Generate AI content
    console.log('Generating MVP plan for:', quizResponse.project_name);
    
    const userPrompt = MVP_PLANNER_USER_PROMPT(
      quizResponse.responses,
      {
        projectName: quizResponse.project_name,
        firstName: quizResponse.user_first_name,
        email: quizResponse.user_email
      }
    );

    const aiResponse = await generateAIContent(
      MVP_PLANNER_SYSTEM_PROMPT,
      userPrompt,
      8000 // Max tokens
    );

    // Parse and validate the JSON response
    let reportContent;
    try {
      // Clean the response - remove any markdown formatting
      const cleanedResponse = aiResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      reportContent = JSON.parse(cleanedResponse);
      
      // Basic validation
      if (!reportContent.summary || !reportContent.investment || !reportContent.techStack) {
        throw new Error('Invalid report structure');
      }
      
      // Ensure development cost is at least $10,000
      if (reportContent.investment.developmentCost < 10000) {
        reportContent.investment.developmentCost = 10000;
      }
      
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('Raw AI response:', aiResponse);
      
      // Update report with error
      await supabase
        .from('mvp_planner_reports')
        .update({
          report_status: 'failed',
          report_content: JSON.stringify({
            error: 'Failed to parse AI response',
            rawResponse: aiResponse
          })
        })
        .eq('id', reportId);
      
      return res.status(500).json({ error: 'Failed to generate report' });
    }

    // Save the report content
    const { error: updateError } = await supabase
      .from('mvp_planner_reports')
      .update({
        report_content: JSON.stringify(reportContent),
        report_status: 'completed'
      })
      .eq('id', reportId);

    if (updateError) {
      console.error('Error updating report:', updateError);
      return res.status(500).json({ error: 'Failed to save report' });
    }

    // Send email notification
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/mvp-planner/send-report-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-internal-api-key': process.env.INTERNAL_API_KEY!,
        },
        body: JSON.stringify({
          email: quizResponse.user_email,
          firstName: quizResponse.user_first_name,
          projectName: quizResponse.project_name,
          reportId: report.id,
          accessToken: report.access_token
        }),
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the whole process if email fails
    }

    res.status(200).json({ 
      success: true, 
      message: 'Report generated successfully' 
    });

  } catch (error) {
    console.error('Error in generate-report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Increase timeout for AI generation
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
    responseLimit: '4mb',
  },
  maxDuration: 60, // 60 seconds timeout
};