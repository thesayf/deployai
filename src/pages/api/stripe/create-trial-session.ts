import { NextApiRequest, NextApiResponse } from 'next';
import { stripe, SUBSCRIPTION_TIERS } from '@/lib/stripe';
import { createServerClient } from '@supabase/ssr';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tenantId, email, successUrl, cancelUrl } = req.body;

    if (!tenantId || !email || !successUrl || !cancelUrl) {
      return res.status(400).json({
        error: 'tenantId, email, successUrl, and cancelUrl are required'
      });
    }

    // Create Supabase client for API route
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => {
            const cookies: { name: string; value: string }[] = [];
            if (req.headers.cookie) {
              req.headers.cookie.split(';').forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name && value) {
                  cookies.push({ name, value });
                }
              });
            }
            return cookies;
          },
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) => {
              res.setHeader('Set-Cookie', `${name}=${value}; Path=/; ${options?.httpOnly ? 'HttpOnly;' : ''} ${options?.secure ? 'Secure;' : ''}`);
            });
          },
        },
      }
    );

    // Step 1: Get tenant data
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', tenantId)
      .single();

    if (tenantError || !tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Step 2: Create or retrieve Stripe customer
    let customerId = tenant.stripe_customer_id;

    if (!customerId) {
      console.log(`[TRIAL] Creating Stripe customer for tenant: ${tenant.subdomain}`);

      const customer = await stripe.customers.create({
        email: email,
        metadata: {
          tenant_id: tenantId,
          subdomain: tenant.subdomain,
          created_by: 'trial_setup'
        }
      });

      customerId = customer.id;
      console.log(`[TRIAL] Created customer: ${customerId}`);

      // Update tenant with customer ID
      const { error: updateError } = await supabase
        .from('tenants')
        .update({
          stripe_customer_id: customerId,
          billing_email: email,
        })
        .eq('id', tenantId);

      if (updateError) {
        console.error('[TRIAL] Failed to update tenant with customer ID:', updateError);
        // Continue anyway - webhook will sync later
      }
    } else {
      console.log(`[TRIAL] Using existing customer: ${customerId}`);
    }

    // Step 3: Get Starter plan price ID
    const starterPriceId = process.env.STRIPE_PRICE_STARTER_ID || SUBSCRIPTION_TIERS.starter.priceId;

    if (!starterPriceId) {
      return res.status(500).json({
        error: 'Starter plan price ID not configured. Please set STRIPE_PRICE_STARTER_ID environment variable.'
      });
    }

    // Step 4: Create checkout session with trial
    console.log(`[TRIAL] Creating checkout session with 14-day trial`);

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: starterPriceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          tenant_id: tenantId,
          subdomain: tenant.subdomain,
          plan: 'starter',
          trial_setup: 'true'
        },
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      metadata: {
        tenant_id: tenantId,
        subdomain: tenant.subdomain,
      },
    });

    console.log(`[TRIAL] Checkout session created: ${session.id}`);

    return res.status(200).json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });

  } catch (error: any) {
    console.error('[TRIAL ERROR]:', error);
    return res.status(500).json({
      error: 'Failed to create trial session',
      details: error.message,
    });
  }
}