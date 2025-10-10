/**
 * Script to connect existing test assessments to Social Finance Limited tenant
 *
 * Run with: npx tsx scripts/connect-assessments-to-tenant.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const SOCIAL_FINANCE_TENANT_ID = '91578a15-9c62-4e64-a73d-b3974c232824';

const ASSESSMENT_IDS = [
  '944df817-3f1d-4f42-87f3-2b96b83bc555', // Taha Fashion
  '2ddf3b8a-6b40-4d7f-b894-f3a5767e7188', // This AI Now
  'fa06141e-abcd-4d45-98a4-4a198336f04c', // Smith Plumbing
];

async function connectAssessments() {
  console.log('🔗 Connecting assessments to Social Finance Limited tenant...\n');

  // Update quiz_responses to set tenant_id
  const { data, error } = await supabase
    .from('quiz_responses')
    .update({ tenant_id: SOCIAL_FINANCE_TENANT_ID })
    .in('id', ASSESSMENT_IDS)
    .select('id, user_email, user_company, tenant_id');

  if (error) {
    console.error('❌ Error updating assessments:', error);
    process.exit(1);
  }

  console.log('✅ Successfully connected assessments:\n');
  data?.forEach((assessment) => {
    console.log(`  - ${assessment.user_company} (${assessment.user_email})`);
    console.log(`    ID: ${assessment.id}`);
    console.log(`    Tenant ID: ${assessment.tenant_id}\n`);
  });

  console.log(`\n✨ Done! Visit /socialfinancelimited/admin/assessments to see them.`);
}

connectAssessments().catch(console.error);
