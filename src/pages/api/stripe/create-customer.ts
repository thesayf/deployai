import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe';
import { createClient } from '@/utils/supabase/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { tenantId, email, name } = req.body;

    if (!tenantId || !email) {
      return res.status(400).json({ error: 'tenantId and email are required' });
    }

    const supabase = await createClient();

    // Step 1: Get tenant data
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', tenantId)
      .single();

    if (tenantError || !tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }

    // Step 2: Check if customer already exists
    if (tenant.stripe_customer_id) {
      // Verify the customer still exists in Stripe
      try {
        const existingCustomer = await stripe.customers.retrieve(tenant.stripe_customer_id);
        if (existingCustomer.deleted) {
          // Customer was deleted, need to create new one
          console.log(`[CUSTOMER] Stripe customer ${tenant.stripe_customer_id} was deleted, creating new one`);
        } else {
          console.log(`[CUSTOMER] Tenant ${tenant.subdomain} already has customer: ${tenant.stripe_customer_id}`);
          return res.status(200).json({
            success: true,
            customerId: tenant.stripe_customer_id,
            existing: true
          });
        }
      } catch (error: any) {
        if (error.code === 'resource_missing') {
          console.log(`[CUSTOMER] Stripe customer ${tenant.stripe_customer_id} not found, creating new one`);
        } else {
          throw error;
        }
      }
    }

    // Step 3: Create new Stripe customer
    console.log(`[CUSTOMER] Creating new Stripe customer for tenant: ${tenant.subdomain}`);

    const customerData: any = {
      email: email,
      metadata: {
        tenant_id: tenantId,
        subdomain: tenant.subdomain,
        created_by: 'deployai_platform'
      }
    };

    if (name) {
      customerData.name = name;
    }

    const customer = await stripe.customers.create(customerData);

    console.log(`[CUSTOMER] Created Stripe customer: ${customer.id}`);

    // Step 4: Update tenant with customer ID
    const { error: updateError } = await supabase
      .from('tenants')
      .update({
        stripe_customer_id: customer.id,
        billing_email: email,
        last_sync_at: new Date().toISOString()
      })
      .eq('id', tenantId);

    if (updateError) {
      // If DB update fails, try to delete the Stripe customer to avoid orphans
      try {
        await stripe.customers.del(customer.id);
        console.log(`[CUSTOMER] Cleaned up Stripe customer ${customer.id} after DB error`);
      } catch (cleanupError) {
        console.error(`[CUSTOMER] Failed to cleanup customer ${customer.id}:`, cleanupError);
      }
      throw new Error(`Failed to update tenant: ${updateError.message}`);
    }

    console.log(`[CUSTOMER] Successfully linked customer ${customer.id} to tenant ${tenant.subdomain}`);

    return res.status(200).json({
      success: true,
      customerId: customer.id,
      existing: false
    });

  } catch (error: any) {
    console.error('[CUSTOMER ERROR]:', error);
    return res.status(500).json({
      error: 'Failed to create customer',
      details: error.message
    });
  }
}