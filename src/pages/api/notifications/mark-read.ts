import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { getTenantFromRequest } from '@/utils/tenant-helpers';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { notificationId, markAll } = req.body;

    // Get tenant context (admin only)
    const tenantContext = await getTenantFromRequest(req);

    if (!tenantContext || !tenantContext.member) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const supabase = supabaseAdmin();

    if (markAll) {
      // Mark all notifications as read for this tenant
      const { error } = await supabase
        .from('notifications')
        .update({
          read: true,
          read_at: new Date().toISOString(),
        })
        .eq('tenant_id', tenantContext.tenant.id)
        .eq('read', false);

      if (error) {
        console.error('Error marking all as read:', error);
        return res.status(500).json({ error: 'Failed to mark all as read' });
      }

      return res.status(200).json({ success: true, message: 'All notifications marked as read' });
    }

    if (!notificationId) {
      return res.status(400).json({ error: 'Notification ID required' });
    }

    // Mark single notification as read
    const { error } = await supabase
      .from('notifications')
      .update({
        read: true,
        read_at: new Date().toISOString(),
      })
      .eq('id', notificationId)
      .eq('tenant_id', tenantContext.tenant.id);

    if (error) {
      console.error('Error marking notification as read:', error);
      return res.status(500).json({ error: 'Failed to mark as read' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in mark-read API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
