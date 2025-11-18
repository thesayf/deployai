import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('[RAW STRIPE TEST] Starting raw fetch test');
    console.log('[RAW STRIPE TEST] Stripe key (first 20):', process.env.STRIPE_SECRET_KEY?.substring(0, 20));
    console.log('[RAW STRIPE TEST] Stripe key length:', process.env.STRIPE_SECRET_KEY?.length);

    // Make a raw fetch request to Stripe API
    const response = await fetch('https://api.stripe.com/v1/balance', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('[RAW STRIPE TEST] Response status:', response.status);
    console.log('[RAW STRIPE TEST] Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('[RAW STRIPE TEST] Response data:', data);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: 'Stripe API error',
        status: response.status,
        data: data,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Raw Stripe API call successful!',
      balance: data,
    });

  } catch (error: any) {
    console.error('[RAW STRIPE TEST] Error:', error);
    console.error('[RAW STRIPE TEST] Error message:', error.message);
    console.error('[RAW STRIPE TEST] Error stack:', error.stack);

    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
}
