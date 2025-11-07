import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, companyName, subdomain } = req.body;

  if (!email || !companyName || !subdomain) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate subdomain format
  if (subdomain.length < 3) {
    return res.status(400).json({ error: 'Subdomain must be at least 3 characters' });
  }

  if (!/^[a-z0-9]+$/.test(subdomain)) {
    return res.status(400).json({ error: 'Subdomain can only contain lowercase letters and numbers' });
  }

  try {
    // Check if subdomain is already taken
    const { data: existingTenant, error: checkError } = await supabase
      .from('tenants')
      .select('id')
      .eq('subdomain', subdomain)
      .single();

    if (existingTenant) {
      return res.status(409).json({ error: 'Subdomain already taken' });
    }

    // Get the authenticated user's ID by email (using service role)
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();

    const user = users?.users.find(u => u.email === email);

    if (!user) {
      console.error('Could not find user with email:', email);
      return res.status(401).json({ error: 'User not found' });
    }

    // Create tenant
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert({
        subdomain,
        company_name: companyName,
        email,
        owner_id: user.id, // Link tenant to OAuth user
        subscription_status: 'trialing', // Start with trial status
      })
      .select()
      .single();

    if (tenantError || !tenant) {
      console.error('Failed to create tenant:', tenantError);
      return res.status(500).json({ error: 'Failed to create tenant' });
    }

    // Create tenant member (admin)
    const { error: memberError } = await supabase
      .from('tenant_members')
      .insert({
        tenant_id: tenant.id,
        user_email: email,
        role: 'admin',
      });

    if (memberError) {
      console.error('Failed to create tenant member:', memberError);
      // Don't fail the request - tenant was created
    }

    console.log(`[OAuth Signup] Created tenant ${subdomain} for ${email}`);

    // Redirect to billing/select-plan
    return res.status(200).json({
      success: true,
      redirectUrl: `/${subdomain}/admin/billing/select-plan`,
    });
  } catch (error: any) {
    console.error('OAuth signup completion error:', error);
    return res.status(500).json({ error: error.message || 'Signup failed' });
  }
}
