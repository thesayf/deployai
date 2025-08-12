import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reportId } = req.query;
  
  if (!reportId || typeof reportId !== 'string') {
    return res.status(400).json({ error: 'Report ID required' });
  }

  console.log('[STATUS] Checking status for report:', reportId);

  const supabase = supabaseAdmin();

  try {
    // Fetch report status and basic info
    const { data: report, error: fetchError } = await supabase
      .from('ai_reports')
      .select(`
        id,
        report_status,
        access_token,
        created_at,
        updated_at,
        email_sent_at,
        stage1_problem_analysis,
        stage2_tool_research,
        stage3_tool_selection,
        stage4_report_content
      `)
      .eq('id', reportId)
      .single();

    if (fetchError || !report) {
      console.error('[STATUS] Report not found:', fetchError);
      return res.status(404).json({ error: 'Report not found' });
    }

    // Determine progress based on completed stages
    let progress = 0;
    let currentStage = 'pending';
    
    if (report.stage1_problem_analysis) {
      progress = 25;
      currentStage = 'analyzing';
    }
    if (report.stage2_tool_research) {
      progress = 50;
      currentStage = 'researching';
    }
    if (report.stage3_tool_selection) {
      progress = 75;
      currentStage = 'curating';
    }
    if (report.stage4_report_content) {
      progress = 90;
      currentStage = 'finalizing';
    }
    if (report.report_status === 'completed') {
      progress = 100;
      currentStage = 'completed';
    }

    // Calculate estimated time remaining
    let estimatedTimeRemaining = null;
    if (report.report_status === 'pending' || report.report_status === 'processing') {
      const elapsedSeconds = report.updated_at 
        ? Math.floor((Date.now() - new Date(report.updated_at).getTime()) / 1000)
        : 0;
      
      // Estimate 60-90 seconds total processing time
      const estimatedTotalTime = 75; // Average of 60-90 seconds
      estimatedTimeRemaining = Math.max(0, estimatedTotalTime - elapsedSeconds);
    }

    // Prepare response
    const response: any = {
      reportId: report.id,
      status: report.report_status,
      currentStage,
      progress,
      accessToken: report.access_token,
      emailSent: !!report.email_sent_at,
      estimatedTimeRemaining,
      createdAt: report.created_at,
      updatedAt: report.updated_at,
    };

    // Add report URL if completed
    if (report.report_status === 'completed' && report.access_token) {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://deployai.studio';
      response.reportUrl = `${baseUrl}/report/view/${report.access_token}`;
    }

    // Add error message if failed
    if (report.report_status === 'failed') {
      response.errorMessage = 'Report generation failed. Please try again or contact support.';
    }

    console.log('[STATUS] Returning status:', response.status, 'Progress:', response.progress);
    
    res.status(200).json(response);

  } catch (error) {
    console.error('[STATUS] Error checking report status:', error);
    res.status(500).json({ 
      error: 'Failed to check report status',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}