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
    return res.status(400).json({ error: 'Missing reportId parameter' });
  }

  try {
    const supabase = supabaseAdmin();

    const { data, error } = await supabase
      .from('ai_reports')
      .select(`
        id,
        report_status,
        error_message,
        stage1_problem_analysis,
        stage2_tool_research,
        stage3_tool_selection,
        stage4_report_content,
        updated_at
      `)
      .eq('id', reportId)
      .single();

    if (error) {
      console.error('[Check Progress] Database error:', error);
      return res.status(404).json({ error: 'Report not found', details: error.message });
    }

    return res.status(200).json({
      status: data.report_status,
      error: data.error_message,
      stages: {
        stage1: !!data.stage1_problem_analysis,
        stage2: !!data.stage2_tool_research,
        stage3: !!data.stage3_tool_selection,
        stage4: !!data.stage4_report_content
      },
      updatedAt: data.updated_at
    });

  } catch (error) {
    console.error('[Check Progress] Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
