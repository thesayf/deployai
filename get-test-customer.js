const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://lebhbkemohrhcqgcjaxf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYmhia2Vtb2hyaGNxZ2NqYXhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzM3NTI4OSwiZXhwIjoyMDc4OTUxMjg5fQ.BAGZ9uRM3xc4n0ZXl8SP59Et8OYGQvMDYIx3U22qSSA'
);

async function getTestCustomer() {
  const { data: tenants, error } = await supabase
    .from('tenants')
    .select('subdomain, stripe_customer_id, stripe_subscription_id, subscription_status, trial_end_date')
    .eq('subscription_status', 'trialing')
    .not('stripe_subscription_id', 'is', null)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('\n📋 Available Test Accounts (currently in trial):');
  console.log('='.repeat(80));

  tenants.forEach((tenant, i) => {
    console.log(`\n${i + 1}. ${tenant.subdomain}`);
    console.log(`   Customer ID: ${tenant.stripe_customer_id}`);
    console.log(`   Subscription ID: ${tenant.stripe_subscription_id}`);
    console.log(`   Trial Ends: ${tenant.trial_end_date}`);
  });

  if (tenants.length > 0) {
    console.log('\n\n🎯 Use this for testing:');
    console.log('   Customer ID:', tenants[0].stripe_customer_id);
    console.log('   Subscription ID:', tenants[0].stripe_subscription_id);
  }
}

getTestCustomer().catch(console.error);
