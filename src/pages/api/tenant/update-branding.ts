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
    const { logo_url, brand_color, tagline, client_logos } = req.body;

    console.log('[Branding] Request received:', { logo_url, brand_color, tagline, client_logos });

    // Get tenant context (requires admin authentication)
    const tenantContext = await getTenantFromRequest(req);

    console.log('[Branding] Tenant context:', { tenantContext });

    if (!tenantContext || !tenantContext.member) {
      return res.status(401).json({ error: 'Unauthorized' });
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
    const supabase = supabaseAdmin();
    const updateData = {
      logo_url: logo_url || null,
      brand_color: brand_color || '#FF6B35',
      tagline: tagline || null,
      client_logos: client_logos || [],
      updated_at: new Date().toISOString(),
    };

    console.log('[Branding] Updating tenant:', { tenantId: tenantContext.tenant.id, updateData });

    const { error } = await supabase
      .from('tenants')
      .update(updateData)
      .eq('id', tenantContext.tenant.id);

    console.log('[Branding] Update result:', { error });

    if (error) {
      console.error('Error updating branding settings:', error);
      return res.status(500).json({ error: 'Failed to update branding settings', details: error.message });
    }

    console.log('[Branding] Success!');
    res.status(200).json({ success: true, message: 'Branding settings updated successfully' });
  } catch (error) {
    console.error('Error in update-branding API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
