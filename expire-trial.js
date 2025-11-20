const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://lebhbkemohrhcqgcjaxf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYmhia2Vtb2hyaGNxZ2NqYXhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzM3NTI4OSwiZXhwIjoyMDc4OTUxMjg5fQ.BAGZ9uRM3xc4n0ZXl8SP59Et8OYGQvMDYIx3U22qSSA'
);

async function expireTrial(subdomain) {
  console.log('🔍 Finding tenant:', subdomain);

  // Get current tenant data
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
  console.log('  Stripe Customer ID:', tenant.stripe_customer_id);
  console.log('  Stripe Subscription ID:', tenant.stripe_subscription_id);

  // Set trial end to yesterday
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  console.log('\n🔄 Setting trial end date to:', yesterday.toISOString());

  const { data: updated, error: updateError } = await supabase
    .from('tenants')
    .update({
      trial_end_date: yesterday.toISOString(),
      subscription_status: 'trialing' // Keep as trialing - Stripe would normally change this
    })
    .eq('subdomain', subdomain)
    .select()
    .single();

  if (updateError) {
    console.error('❌ Update failed:', updateError);
    return;
  }

  console.log('\n✅ Trial expired successfully!');
  console.log('\n🧪 Now test:');
  console.log('  1. Try logging into:', `https://deployai.studio/${subdomain}/admin/login`);
  console.log('  2. What happens? Can you access the dashboard?');
  console.log('  3. Do you see any messages about trial expiring?');
  console.log('  4. Are you redirected to billing/payment?');
  console.log('\n📝 Note: This only changes the database, not Stripe.');
  console.log('   Stripe still thinks the trial is active.');
  console.log('   This tests your UI/access control logic.');
}

const subdomain = process.argv[2] || 'applecompany4';
expireTrial(subdomain).catch(console.error);
