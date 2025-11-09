import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password, companyName, subdomain } = req.body;

    // Validation
    if (!email || !password || !companyName || !subdomain) {
      return res.status(400).json({
        error: 'All fields are required: email, password, companyName, subdomain'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (subdomain.length < 3) {
      return res.status(400).json({ error: 'Subdomain must be at least 3 characters' });
    }

    if (!/^[a-z0-9]+$/.test(subdomain)) {
      return res.status(400).json({
        error: 'Subdomain can only contain lowercase letters and numbers'
      });
    }

    // Create Supabase admin client for server-side operations
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Step 1: Check if subdomain already exists
    const { data: existingTenant } = await supabaseAdmin
      .from('tenants')
      .select('subdomain')
      .eq('subdomain', subdomain)
      .single();

    if (existingTenant) {
      return res.status(400).json({
        error: 'This subdomain is already taken. Please choose another.'
      });
    }

    // Step 2: Create user account
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm for now (development)
      user_metadata: {
        company_name: companyName,
        subdomain: subdomain
      }
    });

    if (authError) {
      console.error('Auth error:', authError);
      if (authError.message.includes('already registered')) {
        return res.status(400).json({ error: 'This email is already registered' });
      }
      return res.status(400).json({ error: authError.message });
    }

    if (!authData.user) {
      return res.status(500).json({ error: 'Failed to create user' });
    }

    console.log('[SIGNUP] User created:', authData.user.id);

    // Step 3: Create tenant
    const { data: tenantData, error: tenantError } = await supabaseAdmin
      .from('tenants')
      .insert({
        subdomain: subdomain,
        company_name: companyName,
        contact_email: email,
        billing_email: email,
        owner_id: authData.user.id,
        subscription_status: null, // No subscription until they complete Stripe checkout
        assessments_used: 0,
        assessments_limit: null,
      })
      .select()
      .single();

    if (tenantError) {
      console.error('Tenant creation error:', tenantError);

      // Rollback: delete the user if tenant creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);

      return res.status(500).json({
        error: 'Failed to create company account. Please try again.'
      });
    }

    console.log('[SIGNUP] Tenant created:', tenantData.id);

    // Step 4: Create user-tenant relationship in tenant_members
    const { error: memberError } = await supabaseAdmin
      .from('tenant_members')
      .insert({
        tenant_id: tenantData.id,
        user_email: email,
        role: 'admin'
      });

    if (memberError) {
      console.error('Tenant member creation error:', memberError);
      // Continue anyway - owner_id is set on tenant
    }

    console.log('[SIGNUP] Signup complete for:', email);

    // Step 4.5: Send welcome email (async, don't wait for it)
    const { sendWelcomeEmail } = await import('@/lib/email/email-service');
    sendWelcomeEmail({
      email,
      companyName,
      subdomain,
    }).then((result) => {
      if (result.success) {
        console.log('[SIGNUP] Welcome email sent successfully');
      } else {
        console.error('[SIGNUP] Failed to send welcome email:', result.error);
      }
    }).catch((err) => {
      console.error('[SIGNUP] Welcome email exception:', err);
    });

    // Step 5: Generate session for auto-login
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
    });

    if (sessionError || !sessionData) {
      console.error('[SIGNUP] Session generation error:', sessionError);
      // Fall back to login redirect if session generation fails
      return res.status(200).json({
        success: true,
        message: 'Account created successfully. Redirecting to login...',
        subdomain: subdomain,
        userId: authData.user.id,
        tenantId: tenantData.id,
        redirectUrl: `/${subdomain}/admin/login`,
        requiresLogin: true
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Account created successfully.',
      subdomain: subdomain,
      userId: authData.user.id,
      tenantId: tenantData.id,
      redirectUrl: `/${subdomain}/admin/billing/select-plan`,
      requiresLogin: false
    });

  } catch (error: any) {
    console.error('[SIGNUP ERROR]:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred',
      details: error.message,
    });
  }
}
