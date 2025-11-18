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

  console.log('[OAuth Signup] 🚀 Starting OAuth signup completion');
  console.log('[OAuth Signup] Request body:', { email, companyName, subdomain });

  if (!email || !companyName || !subdomain) {
    console.log('[OAuth Signup] ❌ Validation failed: Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate subdomain format
  if (subdomain.length < 3) {
    console.log('[OAuth Signup] ❌ Validation failed: Subdomain too short');
    return res.status(400).json({ error: 'Subdomain must be at least 3 characters' });
  }

  if (!/^[a-z0-9]+$/.test(subdomain)) {
    console.log('[OAuth Signup] ❌ Validation failed: Invalid subdomain format');
    return res.status(400).json({ error: 'Subdomain can only contain lowercase letters and numbers' });
  }

  console.log('[OAuth Signup] ✅ Validation passed');

  try {
    console.log('[OAuth Signup] 🔍 Starting tenant creation for:', { email, companyName, subdomain });

    // Check if subdomain is already taken
    const { data: existingTenant, error: checkError } = await supabase
      .from('tenants')
      .select('id')
      .eq('subdomain', subdomain)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is what we want
      console.error('[OAuth Signup] Error checking subdomain:', checkError);
      return res.status(500).json({
        error: 'Database error while checking subdomain',
        details: checkError.message
      });
    }

    if (existingTenant) {
      console.log('[OAuth Signup] ❌ Subdomain already taken:', subdomain);
      return res.status(409).json({ error: 'Subdomain already taken' });
    }

    console.log('[OAuth Signup] ✅ Subdomain available');
    console.log('[OAuth Signup] 👤 Looking up authenticated user...');

    // Get the authenticated user's ID by email (using service role)
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();

    if (userError) {
      console.error('[OAuth Signup] ❌ Error listing users:', userError);
      return res.status(500).json({
        error: 'Failed to lookup user',
        details: userError.message
      });
    }

    console.log('[OAuth Signup] Total users in system:', users?.users.length);
    const user = users?.users.find(u => u.email === email);

    if (!user) {
      console.error('[OAuth Signup] ❌ Could not find user with email:', email);
      console.error('[OAuth Signup] Available users:', users?.users.map(u => u.email));
      return res.status(401).json({ error: 'User not found' });
    }

    console.log('[OAuth Signup] ✅ Found user:', user.id);
    console.log('[OAuth Signup] User metadata:', user.user_metadata);

    // Create tenant with trial details
    console.log('[OAuth Signup] 🏢 Preparing tenant data');
    const now = new Date();
    const trialEnd = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days from now

    const tenantData = {
      subdomain,
      company_name: companyName,
      contact_email: email, // Column renamed from 'email' to 'contact_email' in migration 009
      billing_email: email, // Also set billing email to same value
      owner_id: user.id,
      subscription_status: 'trialing',
      subscription_tier: 'starter',
      assessments_limit: 25,
      assessments_used: 0,
      trial_end_date: trialEnd.toISOString(),
    };

    console.log('[OAuth Signup] 🏢 Creating tenant with data:', tenantData);

    // Create tenant
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert(tenantData)
      .select()
      .single();

    if (tenantError || !tenant) {
      console.error('[OAuth Signup] ❌ Failed to create tenant:', tenantError);
      console.error('[OAuth Signup] Error details:', {
        message: tenantError?.message,
        details: tenantError?.details,
        hint: tenantError?.hint,
        code: tenantError?.code,
      });
      return res.status(500).json({
        error: 'Failed to create tenant',
        details: tenantError?.message || 'Unknown error',
        hint: tenantError?.hint || null,
        code: tenantError?.code || null
      });
    }

    console.log('[OAuth Signup] ✅ Tenant created successfully:', tenant.id);

    // Create tenant member (admin)
    console.log('[OAuth Signup] 👥 Creating tenant member relationship');
    const { error: memberError } = await supabase
      .from('tenant_members')
      .insert({
        tenant_id: tenant.id,
        user_email: email,
        role: 'admin',
      });

    if (memberError) {
      console.error('[OAuth Signup] ⚠️ Failed to create tenant member:', memberError);
      // Don't fail the request - tenant was created
    } else {
      console.log('[OAuth Signup] ✅ Tenant member created');
    }

    console.log(`[OAuth Signup] 🎉 Created tenant ${subdomain} for ${email}`);

    // Send welcome email (async, don't wait for it)
    console.log('[OAuth Signup] 📧 Sending welcome email asynchronously');
    const { sendWelcomeEmail } = await import('@/lib/email/email-service');
    sendWelcomeEmail({
      email,
      firstName: user.user_metadata?.full_name?.split(' ')[0],
      companyName,
      subdomain,
    }).then((result) => {
      if (result.success) {
        console.log('[OAuth Signup] ✅ Welcome email sent successfully');
      } else {
        console.error('[OAuth Signup] ❌ Failed to send welcome email:', result.error);
      }
    }).catch((err) => {
      console.error('[OAuth Signup] ❌ Welcome email exception:', err);
    });

    // Redirect to billing/select-plan
    console.log('[OAuth Signup] ✅ Returning success response with redirect to billing');
    return res.status(200).json({
      success: true,
      redirectUrl: `/${subdomain}/admin/billing/select-plan`,
    });
  } catch (error: any) {
    console.error('[OAuth Signup] 💥 UNEXPECTED ERROR:', error);
    console.error('[OAuth Signup] Error stack:', error.stack);
    return res.status(500).json({ error: error.message || 'Signup failed' });
  }
}
