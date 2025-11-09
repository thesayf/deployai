import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Helper to log errors to file
function logToFile(message: string, data: any) {
  const logPath = path.join(process.cwd(), 'oauth-debug.log');
  const timestamp = new Date().toISOString();
  const logEntry = `\n\n[${timestamp}] ${message}\n${JSON.stringify(data, null, 2)}\n`;
  fs.appendFileSync(logPath, logEntry);
}

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
    console.log('[OAuth Signup] Starting tenant creation for:', { email, companyName, subdomain });
    logToFile('Starting tenant creation', { email, companyName, subdomain });

    // Check if subdomain is already taken
    const { data: existingTenant, error: checkError } = await supabase
      .from('tenants')
      .select('id')
      .eq('subdomain', subdomain)
      .single();

    logToFile('Subdomain check result', { existingTenant, checkError });

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is what we want
      console.error('[OAuth Signup] Error checking subdomain:', checkError);
      logToFile('Subdomain check error', checkError);
      return res.status(500).json({
        error: 'Database error while checking subdomain',
        details: checkError.message
      });
    }

    if (existingTenant) {
      console.log('[OAuth Signup] Subdomain already taken:', subdomain);
      return res.status(409).json({ error: 'Subdomain already taken' });
    }

    console.log('[OAuth Signup] Subdomain available, looking up user...');
    logToFile('Looking up user', { email });

    // Get the authenticated user's ID by email (using service role)
    const { data: users, error: userError } = await supabase.auth.admin.listUsers();

    logToFile('List users result', { userCount: users?.users?.length, userError });

    if (userError) {
      console.error('[OAuth Signup] Error listing users:', userError);
      logToFile('User lookup error', userError);
      return res.status(500).json({
        error: 'Failed to lookup user',
        details: userError.message
      });
    }

    const user = users?.users.find(u => u.email === email);

    if (!user) {
      console.error('[OAuth Signup] Could not find user with email:', email);
      console.error('[OAuth Signup] Available users:', users?.users.map(u => u.email));
      logToFile('User not found', {
        searchEmail: email,
        availableEmails: users?.users.map(u => u.email)
      });
      return res.status(401).json({ error: 'User not found' });
    }

    console.log('[OAuth Signup] Found user:', user.id);
    logToFile('Found user', { userId: user.id, email: user.email });

    // Create tenant with trial details
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

    console.log('[OAuth Signup] Creating tenant with data:', tenantData);
    logToFile('Attempting tenant creation', tenantData);

    // Create tenant
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .insert(tenantData)
      .select()
      .single();

    logToFile('Tenant creation result', {
      success: !!tenant,
      tenant,
      error: tenantError
    });

    if (tenantError || !tenant) {
      console.error('[OAuth Signup] Failed to create tenant:', tenantError);
      console.error('[OAuth Signup] Error details:', {
        message: tenantError?.message,
        details: tenantError?.details,
        hint: tenantError?.hint,
        code: tenantError?.code,
      });
      logToFile('Tenant creation FAILED', {
        message: tenantError?.message,
        details: tenantError?.details,
        hint: tenantError?.hint,
        code: tenantError?.code,
        fullError: tenantError,
      });
      return res.status(500).json({
        error: 'Failed to create tenant',
        details: tenantError?.message || 'Unknown error',
        hint: tenantError?.hint || null,
        code: tenantError?.code || null
      });
    }

    console.log('[OAuth Signup] Tenant created successfully:', tenant.id);
    logToFile('Tenant created successfully', { tenantId: tenant.id });

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

    // Send welcome email (async, don't wait for it)
    const { sendWelcomeEmail } = await import('@/lib/email/email-service');
    sendWelcomeEmail({
      email,
      firstName: user.user_metadata?.full_name?.split(' ')[0],
      companyName,
      subdomain,
    }).then((result) => {
      if (result.success) {
        console.log('[OAuth Signup] Welcome email sent successfully');
      } else {
        console.error('[OAuth Signup] Failed to send welcome email:', result.error);
      }
    }).catch((err) => {
      console.error('[OAuth Signup] Welcome email exception:', err);
    });

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
