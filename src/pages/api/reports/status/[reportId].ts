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

    // Check which stages have actual data (not just exist but have content)
    const stage1_populated = !!report.stage1_problem_analysis && 
                            Object.keys(report.stage1_problem_analysis).length > 0;
    const stage2_populated = !!report.stage2_tool_research && 
                            Object.keys(report.stage2_tool_research).length > 0;
    const stage3_populated = !!report.stage3_tool_selection && 
                            Object.keys(report.stage3_tool_selection).length > 0;
    const stage4_populated = !!report.stage4_report_content && 
                            Object.keys(report.stage4_report_content).length > 0;
    
    // Prepare response with field presence data
    const response: any = {
      reportId: report.id,
      status: report.report_status,
      
      // Field presence - this is what the frontend will use for real progress
      stage1_populated,
      stage2_populated,
      stage3_populated,
      stage4_populated,
      
      // Completion status
      completed: report.report_status === 'completed',
      
      // Access token for viewing report
      accessToken: report.access_token,
      
      // Additional metadata
      emailSent: !!report.email_sent_at,
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