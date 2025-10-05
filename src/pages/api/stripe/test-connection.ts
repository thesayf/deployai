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

  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ error: 'Not found' });
  }

  try {
    // Try to list products to verify connection
    const products = await stripe.products.list({ limit: 1 });

    // Get account details
    const account = await stripe.accounts.retrieve();

    return res.status(200).json({
      success: true,
      message: 'Stripe connection successful!',
      accountId: account.id,
      accountCountry: account.country,
      productsCount: products.data.length,
      hasProducts: products.data.length > 0,
      testMode: !process.env.STRIPE_SECRET_KEY?.startsWith('sk_live'),
    });
  } catch (error: any) {
    console.error('Stripe connection test failed:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to connect to Stripe',
      message: error.message || 'Unknown error',
      hint: 'Check your STRIPE_SECRET_KEY in .env.local',
    });
  }
}