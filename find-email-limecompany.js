const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://lebhbkemohrhcqgcjaxf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYmhia2Vtb2hyaGNxZ2NqYXhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzM3NTI4OSwiZXhwIjoyMDc4OTUxMjg5fQ.BAGZ9uRM3xc4n0ZXl8SP59Et8OYGQvMDYIx3U22qSSA'
);

async function findEmail(subdomain) {
  const { data: member } = await supabase
    .from('tenant_members')
    .select('user_email, tenant_id')
    .eq('tenant_id', (await supabase.from('tenants').select('id').eq('subdomain', subdomain).single()).data.id)
    .single();

  console.log(`\n📧 Login Details for ${subdomain}:`);
  console.log('   Email:', member.user_email);
  console.log('   URL: https://deployai.studio/' + subdomain + '/admin/login');
}

findEmail('limecompany').catch(console.error);
