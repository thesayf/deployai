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
    const { tenantId, email, planId, successUrl, cancelUrl } = req.body;

    console.log('[TRIAL] 🚀 Creating trial session');
    console.log('[TRIAL] Request body:', { tenantId, email, planId, hasSuccessUrl: !!successUrl, hasCancelUrl: !!cancelUrl });

    if (!tenantId || !email || !successUrl || !cancelUrl) {
      console.log('[TRIAL] ❌ Missing required fields');
      return res.status(400).json({
        error: 'tenantId, email, successUrl, and cancelUrl are required'
      });
    }

    // Validate planId
    const validPlans = ['starter', 'professional', 'scale'];
    const selectedPlan = planId && validPlans.includes(planId) ? planId : 'starter';

    if (planId && !validPlans.includes(planId)) {
      console.warn(`[TRIAL] Invalid planId "${planId}" provided, defaulting to starter`);
    }

    // Create Supabase client with service role for API route (bypass RLS)
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
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
    console.log('[TRIAL] 🔍 Looking up tenant:', tenantId);
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', tenantId)
      .single();

    if (tenantError || !tenant) {
      console.error('[TRIAL] ❌ Tenant not found:', tenantError);
      return res.status(404).json({ error: 'Tenant not found' });
    }

    console.log('[TRIAL] ✅ Found tenant:', tenant.subdomain);

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
        })
        .eq('id', tenantId);

      if (updateError) {
        console.error('[TRIAL] Failed to update tenant with customer ID:', updateError);
        // Continue anyway - webhook will sync later
      }
    } else {
      console.log(`[TRIAL] Using existing customer: ${customerId}`);
    }

    // Step 3: Get price ID for selected plan
    const priceIdMap: Record<string, string> = {
      starter: process.env.STRIPE_PRICE_STARTER_ID!,
      professional: process.env.STRIPE_PRICE_PROFESSIONAL_ID!,
      scale: process.env.STRIPE_PRICE_SCALE_ID!,
    };

    const selectedPriceId = priceIdMap[selectedPlan];

    console.log(`[TRIAL] Selected plan: ${selectedPlan}`);
    console.log(`[TRIAL] Price ID from env: ${selectedPriceId}`);
    console.log(`[TRIAL] All price IDs:`, {
      starter: process.env.STRIPE_PRICE_STARTER_ID,
      professional: process.env.STRIPE_PRICE_PROFESSIONAL_ID,
      scale: process.env.STRIPE_PRICE_SCALE_ID
    });

    if (!selectedPriceId || selectedPriceId.includes('your') || selectedPriceId === 'undefined') {
      console.error('[TRIAL] ❌ Price ID not configured properly');
      return res.status(500).json({
        error: `${selectedPlan} plan price ID not configured. Please set STRIPE_PRICE_${selectedPlan.toUpperCase()}_ID environment variable.`,
        debug: {
          plan: selectedPlan,
          priceId: selectedPriceId,
          envVarName: `STRIPE_PRICE_${selectedPlan.toUpperCase()}_ID`
        }
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
          price: selectedPriceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          tenant_id: tenantId,
          subdomain: tenant.subdomain,
          plan: selectedPlan,
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
        plan: selectedPlan,
      },
    });

    console.log(`[TRIAL] Checkout session created: ${session.id}`);

    return res.status(200).json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });

  } catch (error: any) {
    console.error('[TRIAL] 💥 ERROR:', error);
    console.error('[TRIAL] Error message:', error.message);
    console.error('[TRIAL] Error stack:', error.stack);
    console.error('[TRIAL] Error type:', error.type);
    console.error('[TRIAL] Error code:', error.code);
    return res.status(500).json({
      error: 'Failed to create trial session',
      details: error.message,
      type: error.type,
      code: error.code
    });
  }
}