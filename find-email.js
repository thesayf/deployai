const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://lebhbkemohrhcqgcjaxf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYmhia2Vtb2hyaGNxZ2NqYXhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzM3NTI4OSwiZXhwIjoyMDc4OTUxMjg5fQ.BAGZ9uRM3xc4n0ZXl8SP59Et8OYGQvMDYIx3U22qSSA'
);

async function findEmail(subdomain) {
  const { data, error } = await supabase
    .from('tenant_members')
    .select('user_email, tenants(subdomain)')
    .eq('tenants.subdomain', subdomain);

  if (error) {
    console.error('Error:', error);
    return;
  }

  if (data && data.length > 0) {
    console.log(`Email for ${subdomain}:`, data[0].user_email);
  } else {
    console.log('No email found for', subdomain);
  }
}

findEmail('applecompany4').catch(console.error);
