import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@/utils/supabase/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { logo_url, brand_color, tagline, client_logos } = req.body;
    const subdomain = req.headers['x-tenant-subdomain'] as string;

    if (!subdomain) {
      return res.status(400).json({ error: 'Tenant subdomain required' });
    }

    // Get authenticated user from session
    const supabase = createClient(req, res);
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Auth error:', authError);
      return res.status(401).json({ error: 'Unauthorized - not authenticated' });
    }

    // Get tenant and verify user is a member
    const adminSupabase = supabaseAdmin();
    const { data: tenant, error: tenantError } = await adminSupabase
      .from('tenants')
      .select('id')
      .eq('subdomain', subdomain)
      .single();

    if (tenantError || !tenant) {
      console.error('Tenant error:', tenantError);
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Verify user is a member of this tenant
    const { data: member, error: memberError } = await adminSupabase
      .from('tenant_members')
      .select('id, role')
      .eq('tenant_id', tenant.id)
      .eq('user_email', user.email)
      .single();

    if (memberError || !member) {
      console.error('Member error:', memberError);
      return res.status(401).json({ error: 'Unauthorized - not a member of this tenant' });
    }

    // Validate brand color if provided
    if (brand_color && !/^#[0-9A-Fa-f]{6}$/.test(brand_color)) {
      return res.status(400).json({ error: 'Invalid brand color format. Use hex format like #FF6B35' });
    }

    // Validate client logos structure
    if (client_logos && !Array.isArray(client_logos)) {
      return res.status(400).json({ error: 'Client logos must be an array' });
    }

    // Update branding settings
    const { error } = await adminSupabase
      .from('tenants')
      .update({
        logo_url: logo_url || null,
        brand_color: brand_color || '#FF6B35',
        tagline: tagline || null,
        client_logos: client_logos || [],
        updated_at: new Date().toISOString(),
      })
      .eq('id', tenant.id);

    if (error) {
      console.error('Error updating branding settings:', error);
      return res.status(500).json({ error: 'Failed to update branding settings' });
    }

    res.status(200).json({ success: true, message: 'Branding settings updated successfully' });
  } catch (error) {
    console.error('Error in update-branding API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
