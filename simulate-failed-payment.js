const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://lebhbkemohrhcqgcjaxf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYmhia2Vtb2hyaGNxZ2NqYXhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzM3NTI4OSwiZXhwIjoyMDc4OTUxMjg5fQ.BAGZ9uRM3xc4n0ZXl8SP59Et8OYGQvMDYIx3U22qSSA'
);

async function simulateFailedPayment(subdomain, status = 'past_due') {
  console.log('🔍 Finding tenant:', subdomain);

  const { data: tenant, error: fetchError } = await supabase
    .from('tenants')
    .select('*')
    .eq('subdomain', subdomain)
    .single();

  if (fetchError || !tenant) {
    console.error('❌ Tenant not found:', fetchError);
    return;
  }

  console.log('\n📊 Current Status:');
  console.log('  Subscription Status:', tenant.subscription_status);
  console.log('  Trial End Date:', tenant.trial_end_date);

  console.log(`\n🔄 Setting subscription_status to: ${status}`);
  console.log('   (This simulates what Stripe does when payment fails)');

  const { data: updated, error: updateError } = await supabase
    .from('tenants')
    .update({
      subscription_status: status
    })
    .eq('subdomain', subdomain)
    .select()
    .single();

  if (updateError) {
    console.error('❌ Update failed:', updateError);
    return;
  }

  console.log('\n✅ Subscription status updated!');
  console.log('\n🧪 Now test:');
  console.log(`  1. Try logging into: https://deployai.studio/${subdomain}/admin/login`);
  console.log('  2. What happens? Are you locked out?');
  console.log('  3. Can you still access assessments?');
  console.log('  4. What messages do you see?');
  console.log('\n📝 Stripe subscription statuses:');
  console.log('  - "trialing" = In trial period (has access)');
  console.log('  - "active" = Paid and has access');
  console.log('  - "past_due" = Payment failed but in grace period');
  console.log('  - "canceled" = Subscription ended (no access)');
  console.log('  - "unpaid" = Payment failed, grace period ended');
}

const subdomain = process.argv[2] || 'limecompany';
const status = process.argv[3] || 'past_due';
simulateFailedPayment(subdomain, status).catch(console.error);
