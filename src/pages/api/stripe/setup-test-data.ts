import type { NextApiRequest, NextApiResponse } from 'next';
import { stripe, SUBSCRIPTION_TIERS } from '@/lib/stripe';

// Test endpoint to create test data in Stripe
// This should be removed before production deployment

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ error: 'Not found' });
  }

  const { action } = req.body;

  try {
    if (action === 'create-products') {
      console.log('[TEST SETUP] Creating Stripe products and prices...');

      const results = [];

      // Create each subscription tier
      for (const [tierKey, tierInfo] of Object.entries(SUBSCRIPTION_TIERS)) {
        // Create product
        const product = await stripe.products.create({
          id: `prod_ai_assessment_${tierKey}`,
          name: `AI Assessment Platform - ${tierInfo.name}`,
          description: `${tierInfo.name} tier: ${tierInfo.assessments ? `${tierInfo.assessments} assessments` : 'Unlimited assessments'} per month`,
          metadata: {
            tier: tierKey,
            assessments_limit: tierInfo.assessments?.toString() || 'unlimited'
          }
        });

        // Create price with trial
        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: tierInfo.price * 100, // Convert to cents
          currency: 'usd',
          recurring: {
            interval: 'month',
            trial_period_days: 14
          },
          metadata: {
            tier: tierKey,
            assessments_limit: tierInfo.assessments?.toString() || 'unlimited'
          }
        });

        results.push({
          tier: tierKey,
          product_id: product.id,
          price_id: price.id,
          amount: tierInfo.price,
          assessments: tierInfo.assessments
        });

        console.log(`[TEST SETUP] Created ${tierKey}: product_id=${product.id}, price_id=${price.id}`);
      }

      // Create single assessment product
      const singleProduct = await stripe.products.create({
        id: 'prod_ai_assessment_single',
        name: 'Single AI Assessment',
        description: 'One-time purchase of a single assessment',
        metadata: {
          type: 'one_time',
          assessments_count: '1'
        }
      });

      const singlePrice = await stripe.prices.create({
        product: singleProduct.id,
        unit_amount: 9900, // $99.00
        currency: 'usd',
        metadata: {
          type: 'one_time',
          assessments_count: '1'
        }
      });

      results.push({
        tier: 'single',
        product_id: singleProduct.id,
        price_id: singlePrice.id,
        amount: 99,
        assessments: 1
      });

      return res.status(200).json({
        success: true,
        message: 'Test products and prices created successfully',
        results,
        env_variables: {
          STRIPE_PRICE_STARTER_ID: results.find(r => r.tier === 'starter')?.price_id,
          STRIPE_PRICE_PROFESSIONAL_ID: results.find(r => r.tier === 'professional')?.price_id,
          STRIPE_PRICE_SCALE_ID: results.find(r => r.tier === 'scale')?.price_id,
          STRIPE_PRICE_SINGLE_ID: results.find(r => r.tier === 'single')?.price_id,
        }
      });
    }

    if (action === 'create-test-customer') {
      console.log('[TEST SETUP] Creating test customer...');

      const customer = await stripe.customers.create({
        email: 'test@example.com',
        name: 'Test Customer',
        metadata: {
          tenant_id: '4374b310-7141-4db3-89ce-d474f5a0da98', // Your test tenant ID
          subdomain: 'testconsultant',
          source: 'test_setup'
        }
      });

      return res.status(200).json({
        success: true,
        message: 'Test customer created',
        customer_id: customer.id,
        customer
      });
    }

    return res.status(400).json({
      error: 'Invalid action',
      available_actions: ['create-products', 'create-test-customer']
    });

  } catch (error: any) {
    console.error('[TEST SETUP ERROR]', error);
    return res.status(500).json({
      success: false,
      error: 'Setup failed',
      message: error.message || 'Unknown error',
      type: error.type || 'unknown'
    });
  }
}