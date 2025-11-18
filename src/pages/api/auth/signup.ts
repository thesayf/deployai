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

    console.log('[SIGNUP] 🚀 Starting signup process');
    console.log('[SIGNUP] Request body:', { email, companyName, subdomain, hasPassword: !!password });

    // Validation
    if (!email || !password || !companyName || !subdomain) {
      console.log('[SIGNUP] ❌ Validation failed: Missing required fields');
      return res.status(400).json({
        error: 'All fields are required: email, password, companyName, subdomain'
      });
    }

    if (password.length < 6) {
      console.log('[SIGNUP] ❌ Validation failed: Password too short');
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (subdomain.length < 3) {
      console.log('[SIGNUP] ❌ Validation failed: Subdomain too short');
      return res.status(400).json({ error: 'Subdomain must be at least 3 characters' });
    }

    if (!/^[a-z0-9]+$/.test(subdomain)) {
      console.log('[SIGNUP] ❌ Validation failed: Invalid subdomain format');
      return res.status(400).json({
        error: 'Subdomain can only contain lowercase letters and numbers'
      });
    }

    console.log('[SIGNUP] ✅ Validation passed');

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
    console.log('[SIGNUP] 🔍 Checking if subdomain exists:', subdomain);
    const { data: existingTenant, error: checkError } = await supabaseAdmin
      .from('tenants')
      .select('subdomain')
      .eq('subdomain', subdomain)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.log('[SIGNUP] ⚠️ Database error checking subdomain:', checkError);
    }

    if (existingTenant) {
      console.log('[SIGNUP] ❌ Subdomain already taken:', subdomain);
      return res.status(400).json({
        error: 'This subdomain is already taken. Please choose another.'
      });
    }

    console.log('[SIGNUP] ✅ Subdomain available:', subdomain);

    // Step 2: Create user account
    console.log('[SIGNUP] 👤 Creating user account in Supabase Auth');
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
      console.error('[SIGNUP] ❌ Auth error:', authError);
      console.error('[SIGNUP] Auth error details:', {
        message: authError.message,
        status: authError.status,
        name: authError.name
      });
      if (authError.message.includes('already registered')) {
        return res.status(400).json({ error: 'This email is already registered' });
      }
      return res.status(400).json({ error: authError.message });
    }

    if (!authData.user) {
      console.error('[SIGNUP] ❌ No user returned from createUser');
      return res.status(500).json({ error: 'Failed to create user' });
    }

    console.log('[SIGNUP] ✅ User created successfully:', authData.user.id);
    console.log('[SIGNUP] User email:', authData.user.email);

    // Step 3: Create tenant
    console.log('[SIGNUP] 🏢 Creating tenant record');
    const tenantInsertData = {
      subdomain: subdomain,
      company_name: companyName,
      contact_email: email,
      billing_email: email,
      owner_id: authData.user.id,
      subscription_status: null, // No subscription until they complete Stripe checkout
      assessments_used: 0,
      assessments_limit: null,
    };
    console.log('[SIGNUP] Tenant data to insert:', tenantInsertData);

    const { data: tenantData, error: tenantError } = await supabaseAdmin
      .from('tenants')
      .insert(tenantInsertData)
      .select()
      .single();

    if (tenantError) {
      console.error('[SIGNUP] ❌ Tenant creation error:', tenantError);
      console.error('[SIGNUP] Tenant error details:', {
        message: tenantError.message,
        details: tenantError.details,
        hint: tenantError.hint,
        code: tenantError.code,
      });

      // Rollback: delete the user if tenant creation fails
      console.log('[SIGNUP] 🔄 Rolling back - deleting user:', authData.user.id);
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);

      return res.status(500).json({
        error: 'Failed to create company account. Please try again.'
      });
    }

    console.log('[SIGNUP] ✅ Tenant created successfully:', tenantData.id);

    // Step 4: Create user-tenant relationship in tenant_members
    console.log('[SIGNUP] 👥 Creating tenant member relationship');
    const { error: memberError } = await supabaseAdmin
      .from('tenant_members')
      .insert({
        tenant_id: tenantData.id,
        user_email: email,
        role: 'admin'
      });

    if (memberError) {
      console.error('[SIGNUP] ⚠️ Tenant member creation error:', memberError);
      // Continue anyway - owner_id is set on tenant
    } else {
      console.log('[SIGNUP] ✅ Tenant member created');
    }

    console.log('[SIGNUP] 🎉 Signup complete for:', email);

    // Step 4.5: Send welcome email (async, don't wait for it)
    console.log('[SIGNUP] 📧 Sending welcome email asynchronously');
    const { sendWelcomeEmail } = await import('@/lib/email/email-service');
    sendWelcomeEmail({
      email,
      companyName,
      subdomain,
    }).then((result) => {
      if (result.success) {
        console.log('[SIGNUP] ✅ Welcome email sent successfully');
      } else {
        console.error('[SIGNUP] ❌ Failed to send welcome email:', result.error);
      }
    }).catch((err) => {
      console.error('[SIGNUP] ❌ Welcome email exception:', err);
    });

    // Step 5: Generate session for auto-login
    console.log('[SIGNUP] 🔑 Generating session for auto-login');
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
    });

    if (sessionError || !sessionData) {
      console.error('[SIGNUP] ⚠️ Session generation error:', sessionError);
      console.log('[SIGNUP] Falling back to manual login redirect');
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

    console.log('[SIGNUP] ✅ Session generated successfully');
    console.log('[SIGNUP] ✅ Returning success response with redirect to billing');
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
    console.error('[SIGNUP] 💥 UNEXPECTED ERROR:', error);
    console.error('[SIGNUP] Error stack:', error.stack);
    console.error('[SIGNUP] Error details:', {
      message: error.message,
      name: error.name,
      code: error.code
    });
    return res.status(500).json({
      error: 'An unexpected error occurred',
      details: error.message,
    });
  }
}
