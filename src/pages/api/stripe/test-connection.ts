import type { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe';

// Test endpoint to verify Stripe connection
// This should be removed before production deployment

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[STRIPE TEST] 🔍 Testing Stripe connection...');
    console.log('[STRIPE TEST] Stripe secret key (first 12 chars):', process.env.STRIPE_SECRET_KEY?.substring(0, 12));
    console.log('[STRIPE TEST] Key mode:', process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 'LIVE' : 'TEST');

    // Test 1: Get account details
    const account = await stripe.accounts.retrieve();
    console.log('[STRIPE TEST] ✅ Connected to Stripe account:', account.id);

    // Test 2: Check price IDs
    const priceIds = {
      starter: process.env.STRIPE_PRICE_STARTER_ID,
      professional: process.env.STRIPE_PRICE_PROFESSIONAL_ID,
      scale: process.env.STRIPE_PRICE_SCALE_ID,
    };

    console.log('[STRIPE TEST] Price IDs configured:', priceIds);

    // Test 3: Try to retrieve each price
    const priceTests: any = {};
    for (const [plan, priceId] of Object.entries(priceIds)) {
      if (priceId && priceId !== 'undefined') {
        try {
          const price = await stripe.prices.retrieve(priceId);
          priceTests[plan] = {
            valid: true,
            id: price.id,
            amount: price.unit_amount,
            currency: price.currency,
            active: price.active,
            mode: price.livemode ? 'live' : 'test'
          };
          console.log(`[STRIPE TEST] ✅ ${plan} price valid:`, priceTests[plan]);
        } catch (err: any) {
          priceTests[plan] = {
            valid: false,
            error: err.message,
            type: err.type,
            code: err.code
          };
          console.error(`[STRIPE TEST] ❌ ${plan} price error:`, err.message);
        }
      } else {
        priceTests[plan] = {
          valid: false,
          error: 'Price ID not configured or undefined'
        };
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Stripe connection successful!',
      account: {
        id: account.id,
        business_profile: account.business_profile?.name,
        charges_enabled: account.charges_enabled,
        details_submitted: account.details_submitted,
        country: account.country,
      },
      keyInfo: {
        keyMode: process.env.STRIPE_SECRET_KEY?.startsWith('sk_live_') ? 'live' : 'test',
        keyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 12),
      },
      prices: priceTests,
    });
  } catch (error: any) {
    console.error('[STRIPE TEST] 💥 ERROR:', error);
    console.error('[STRIPE TEST] Error type:', error.type);
    console.error('[STRIPE TEST] Error code:', error.code);
    console.error('[STRIPE TEST] Error message:', error.message);
    console.error('[STRIPE TEST] Error stack:', error.stack);

    return res.status(500).json({
      success: false,
      error: 'Failed to connect to Stripe',
      message: error.message || 'Unknown error',
      type: error.type,
      code: error.code,
      hint: 'Check your STRIPE_SECRET_KEY environment variable',
    });
  }
}