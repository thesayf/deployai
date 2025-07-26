import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { reportId } = req.query;

  if (!reportId || typeof reportId !== 'string') {
    return res.status(400).json({ error: 'Report ID is required' });
  }

  try {
    const { data, error } = await supabase
      .from('ai_reports')
      .select('id, report_status, failed_at_stage, error_message, created_at, updated_at')
      .eq('id', reportId)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Calculate progress based on status
    let progress = 0;
    let statusMessage = 'Initializing...';

    switch (data.report_status) {
      case 'generating':
        progress = 10;
        statusMessage = 'Starting AI analysis...';
        break;
      case 'stage1_complete':
        progress = 25;
        statusMessage = 'Business intelligence analysis complete. Researching market solutions...';
        break;
      case 'stage2_complete':
        progress = 50;
        statusMessage = 'Market research complete. Analyzing financial impact...';
        break;
      case 'stage3_complete':
        progress = 75;
        statusMessage = 'Financial analysis complete. Creating strategic recommendations...';
        break;
      case 'completed':
        progress = 100;
        statusMessage = 'Report generation complete!';
        break;
      case 'failed':
        progress = -1;
        statusMessage = data.error_message || 'Report generation failed';
        break;
      default:
        progress = 5;
        statusMessage = 'Processing...';
    }

    res.status(200).json({
      id: data.id,
      status: data.report_status,
      progress,
      message: statusMessage,
      failedAtStage: data.failed_at_stage,
      errorMessage: data.error_message,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    });

  } catch (error) {
    console.error('Error checking report status:', error);
    res.status(500).json({ error: 'Failed to check report status' });
  }
}