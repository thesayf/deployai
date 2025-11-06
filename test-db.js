const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function test() {
  console.log('Testing Supabase connection...\n');

  // Test 1: Check connection
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .limit(5);

  if (error) {
    console.error('❌ Error connecting to Supabase:');
    console.error(error.message);
    console.log('\nCheck:');
    console.log('1. NEXT_PUBLIC_SUPABASE_URL is correct');
    console.log('2. SUPABASE_SERVICE_ROLE_KEY is correct');
    console.log('3. Migrations have been applied (tenants table exists)');
    process.exit(1);
  }

  console.log('✅ Connected to Supabase!');
  console.log('✅ tenants table exists');
  console.log(`   Found ${data?.length || 0} tenant(s)\n`);

  if (data && data.length > 0) {
    console.log('Sample tenant data:');
    data.forEach(tenant => {
      console.log(`  - ${tenant.subdomain}: ${tenant.company_name} (${tenant.subscription_tier})`);
    });
    console.log('');
  }

  // Test 2: Check other important tables
  const tablesToCheck = ['quiz_responses', 'ai_reports', 'tenant_members'];

  for (const table of tablesToCheck) {
    const { data: tableData, error: tableError } = await supabase.from(table).select('count', { count: 'exact', head: true });
    if (tableError) {
      console.log(`⚠️  Table '${table}' might not exist (${tableError.message})`);
    } else {
      console.log(`✅ Table '${table}' exists`);
    }
  }

  console.log('\n✅ Database is ready!');
  console.log('\n📝 Next step: Run "npm install" then "npm run dev"');
}

test().catch(console.error);
