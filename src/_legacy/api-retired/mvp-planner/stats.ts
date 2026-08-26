import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = supabaseAdmin();

    // Get count of completed MVP planner submissions
    const { count, error } = await supabase
      .from('mvp_planner_responses')
      .select('*', { count: 'exact', head: true })
      .not('completed_at', 'is', null);

    if (error) {
      console.error('Error fetching stats:', error);
      return res.status(500).json({ error: 'Failed to fetch stats' });
    }

    // Get this week's count
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const { count: weekCount, error: weekError } = await supabase
      .from('mvp_planner_responses')
      .select('*', { count: 'exact', head: true })
      .not('completed_at', 'is', null)
      .gte('created_at', oneWeekAgo.toISOString());

    if (weekError) {
      console.error('Error fetching weekly stats:', weekError);
    }

    res.status(200).json({
      totalCount: count || 0,
      weekCount: weekCount || 0
    });
  } catch (error) {
    console.error('Error in stats API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}