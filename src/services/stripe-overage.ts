import { stripe } from '@/lib/stripe';
import { getOveragePriceForTier } from '@/lib/overage';
import { supabase } from '@/lib/supabase';

interface CreateOverageInvoiceItemParams {
  tenantId: string;
  stripeCustomerId: string;
  tier: string;
  assessmentId?: string;
  assessmentNumber: number;
  billingPeriodStart: string;
  billingPeriodEnd: string;
}

interface OverageInvoiceItemResult {
  success: boolean;
  invoiceItemId?: string;
  error?: string;
}

/**
 * Create a Stripe invoice item for an overage assessment
 * This will be added to the customer's next invoice automatically
 */
export async function createOverageInvoiceItem(
  params: CreateOverageInvoiceItemParams
): Promise<OverageInvoiceItemResult> {
  const {
    tenantId,
    stripeCustomerId,
    tier,
    assessmentId,
    assessmentNumber,
    billingPeriodStart,
    billingPeriodEnd,
  } = params;

  try {
    const overagePriceCents = getOveragePriceForTier(tier);

    console.log('[OVERAGE] Creating invoice item:', {
      tenantId,
      stripeCustomerId,
      tier,
      overagePriceCents,
      assessmentNumber,
    });

    // Create the invoice item in Stripe
    const invoiceItem = await stripe.invoiceItems.create({
      customer: stripeCustomerId,
      amount: overagePriceCents,
      currency: 'usd',
      description: `Additional assessment overage (#${assessmentNumber})`,
      metadata: {
        tenant_id: tenantId,
        assessment_id: assessmentId || '',
        assessment_number: assessmentNumber.toString(),
        tier,
        type: 'overage',
        billing_period_start: billingPeriodStart,
        billing_period_end: billingPeriodEnd,
      },
    });

    console.log('[OVERAGE] Invoice item created successfully:', invoiceItem.id);

    // Record in our audit table for reconciliation
    const { error: dbError } = await supabase.from('overage_invoice_items').insert({
      tenant_id: tenantId,
      stripe_invoice_item_id: invoiceItem.id,
      assessment_id: assessmentId,
      assessment_number: assessmentNumber,
      amount_cents: overagePriceCents,
      billing_period_start: billingPeriodStart,
      billing_period_end: billingPeriodEnd,
    });

    if (dbError) {
      console.error('[OVERAGE] Failed to record in audit table:', dbError);
      // Don't fail the whole operation - Stripe item was created successfully
    }

    return {
      success: true,
      invoiceItemId: invoiceItem.id,
    };
  } catch (error) {
    console.error('[OVERAGE] Failed to create invoice item:', error);

    // Log error to database for monitoring
    try {
      await supabase.from('error_logs').insert({
        tenant_id: tenantId,
        error_type: 'stripe_overage_invoice_item_failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
        metadata: {
          stripeCustomerId,
          tier,
          assessmentNumber,
        },
      });
    } catch (logError) {
      console.error('[OVERAGE] Failed to log error:', logError);
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get total overage charges for current billing period from Stripe
 * This queries Stripe for all invoice items with type=overage
 */
export async function getOverageChargesForPeriod(
  stripeCustomerId: string,
  periodStart: Date
): Promise<{ totalCents: number; count: number }> {
  try {
    const invoiceItems = await stripe.invoiceItems.list({
      customer: stripeCustomerId,
      created: {
        gte: Math.floor(periodStart.getTime() / 1000),
      },
      limit: 100,
    });

    const overageItems = invoiceItems.data.filter(
      (item) => item.metadata?.type === 'overage'
    );

    const totalCents = overageItems.reduce((sum, item) => sum + item.amount, 0);

    return {
      totalCents,
      count: overageItems.length,
    };
  } catch (error) {
    console.error('[OVERAGE] Failed to get overage charges:', error);
    return { totalCents: 0, count: 0 };
  }
}

/**
 * Delete an overage invoice item (for refunds/corrections)
 */
export async function deleteOverageInvoiceItem(
  invoiceItemId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await stripe.invoiceItems.del(invoiceItemId);

    console.log('[OVERAGE] Invoice item deleted:', invoiceItemId);

    return { success: true };
  } catch (error) {
    console.error('[OVERAGE] Failed to delete invoice item:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
