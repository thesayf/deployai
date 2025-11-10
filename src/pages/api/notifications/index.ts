import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { getTenantFromRequest } from '@/utils/tenant-helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get tenant context (admin only)
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext || !tenantContext.member) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const supabase = supabaseAdmin();

    // Get query parameters
    const unreadOnly = req.query.unread === 'true';
    const limit = parseInt(req.query.limit as string) || 20;

    // Build query
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('tenant_id', tenantContext.tenant.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Filter by unread if requested
    if (unreadOnly) {
      query = query.eq('read', false);
    }

    const { data: notifications, error } = await query;

    if (error) {
      console.error('Error fetching notifications:', error);
      return res.status(500).json({ error: 'Failed to fetch notifications' });
    }

    // Get unread count
    const { count: unreadCount, error: countError } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantContext.tenant.id)
      .eq('read', false);

    if (countError) {
      console.error('Error counting unread notifications:', countError);
    }

    res.status(200).json({
      notifications: notifications || [],
      unreadCount: unreadCount || 0,
    });
  } catch (error) {
    console.error('Error in notifications API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
