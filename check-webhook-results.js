const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://lebhbkemohrhcqgcjaxf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYmhia2Vtb2hyaGNxZ2NqYXhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzM3NTI4OSwiZXhwIjoyMDc4OTUxMjg5fQ.BAGZ9uRM3xc4n0ZXl8SP59Et8OYGQvMDYIx3U22qSSA'
);

async function checkWebhookResults(customerId) {
  console.log('🔍 Checking webhook sync results for:', customerId);

  const { data: tenant, error } = await supabase
    .from('tenants')
    .select('subdomain, subscription_status, stripe_subscription_id, last_sync_at, stripe_sync_error, trial_end_date, current_period_start, current_period_end')
    .eq('stripe_customer_id', customerId)
    .single();

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log('\n📊 Current Status:');
  console.log('  Subdomain:', tenant.subdomain);
  console.log('  Subscription Status:', tenant.subscription_status);
  console.log('  Last Sync:', tenant.last_sync_at);
  console.log('  Sync Error:', tenant.stripe_sync_error || 'None');
  console.log('  Trial Ends:', tenant.trial_end_date);
  console.log('  Current Period:', tenant.current_period_start, 'to', tenant.current_period_end);

  // Check if sync happened recently (within last 5 minutes)
  if (tenant.last_sync_at) {
    const syncAge = (Date.now() - new Date(tenant.last_sync_at).getTime()) / 1000;
    console.log('\n⏱️  Last sync was', Math.round(syncAge), 'seconds ago');

    if (syncAge < 300) {
      console.log('✅ Webhook sync is working! (synced within last 5 minutes)');
    } else {
      console.log('⚠️  Last sync was more than 5 minutes ago');
    }
  } else {
    console.log('\n⚠️  No sync has happened yet');
  }
}

const customerId = process.argv[2] || 'cus_TSTOVFV6nxjXAk';
checkWebhookResults(customerId).catch(console.error);
