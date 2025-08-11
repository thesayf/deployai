import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Accept both GET and POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get reportId from query params (GET) or body (POST)
  const reportId = req.method === 'GET' 
    ? req.query.reportId 
    : req.body?.reportId;

  if (!reportId || typeof reportId !== 'string') {
    return res.status(400).json({ error: 'Report ID is required' });
  }

  try {
    const { data, error } = await supabase
      .from('ai_reports')
      .select('id, report_status, error_message, email_sent_at, created_at, updated_at')
      .eq('id', reportId)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Calculate progress based on status
    let progress = 0;
    let statusMessage = 'Initializing...';

    // Simple status for new system
    switch (data.report_status) {
      case 'generating':
        progress = 50;
        statusMessage = 'AI is analyzing your business and researching solutions...';
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
      emailSent: !!data.email_sent_at,
      createdAt: data.created_at,
      updatedAt: data.updated_at
    });

  } catch (error) {
    console.error('Error checking report status:', error);
    res.status(500).json({ error: 'Failed to check report status' });
  }
}