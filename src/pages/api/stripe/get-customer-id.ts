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
    const { tenantSubdomain } = req.body;

    if (!tenantSubdomain) {
      return res.status(400).json({ error: 'tenantSubdomain is required' });
    }

    // Use service role client - we're just fetching tenant data (no RLS needed for this lookup)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get tenant with stripe customer ID
    const { data: tenant, error } = await supabase
      .from('tenants')
      .select('stripe_customer_id')
      .eq('subdomain', tenantSubdomain)
      .single();

    if (error || !tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    if (!tenant.stripe_customer_id) {
      return res.status(404).json({ error: 'No Stripe customer found for this tenant' });
    }

    return res.status(200).json({
      customerId: tenant.stripe_customer_id,
    });
  } catch (error: any) {
    console.error('[GET_CUSTOMER_ID ERROR]:', error);
    return res.status(500).json({
      error: 'Failed to get customer ID',
      details: error.message,
    });
  }
}
