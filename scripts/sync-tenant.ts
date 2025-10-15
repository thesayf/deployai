#!/usr/bin/env tsx

/**
 * Manual sync script to sync a tenant's Stripe subscription data
 * Usage: npx tsx scripts/sync-tenant.ts <customer_id>
 */

import { syncStripeDataToSupabase } from '../src/lib/stripe/sync';

const customerId = process.argv[2];

if (!customerId) {
  console.error('Usage: npx tsx scripts/sync-tenant.ts <stripe_customer_id>');
  process.exit(1);
}

console.log(`\n🔄 Syncing Stripe data for customer: ${customerId}\n`);

// Pass true for isWebhook to use service role client (no request context needed)
syncStripeDataToSupabase(customerId, true)
  .then(() => {
    console.log('\n✅ Sync completed successfully!\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Sync failed:', error);
    process.exit(1);
  });
