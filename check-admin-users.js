const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkAdminUsers() {
  console.log('Checking for admin users...\n');

  // Check tenant_members table for admin access
  const { data: members, error: membersError } = await supabase
    .from('tenant_members')
    .select('*, tenants(subdomain, company_name)')
    .eq('role', 'admin');

  if (membersError) {
    console.error('Error checking tenant_members:', membersError.message);
  } else if (members && members.length > 0) {
    console.log('✅ Found admin members:');
    members.forEach(member => {
      console.log(`  - Email: ${member.user_email}`);
      console.log(`    Tenant: ${member.tenants?.subdomain} (${member.tenants?.company_name})`);
      console.log('');
    });
  } else {
    console.log('⚠️  No admin members found in tenant_members table\n');
  }

  // Check if Supabase auth is set up
  const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();

  if (authError) {
    console.log('⚠️  Cannot list auth users (may need to configure Supabase Auth)');
    console.log('   Error:', authError.message, '\n');
  } else if (users && users.length > 0) {
    console.log('✅ Found Supabase Auth users:');
    users.forEach(user => {
      console.log(`  - ${user.email} (${user.id})`);
    });
  } else {
    console.log('⚠️  No Supabase Auth users found\n');
  }

  console.log('\n📝 To create an admin user:');
  console.log('1. Go to: https://supabase.com');
  console.log('2. Open your project: nwddsjghbyrerhhnciuk');
  console.log('3. Go to Authentication → Users');
  console.log('4. Click "Add user" and create an account');
  console.log('5. Then add that email to tenant_members table with role="admin"');
}

checkAdminUsers().catch(console.error);
