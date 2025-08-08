import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Use service role key to bypass RLS
    const supabaseService = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Query to check RLS status and policies
    const { data: rlsStatus, error: rlsError } = await supabaseService.rpc('check_table_rls', {
      table_name: 'ai_reports'
    });

    // Alternative: Direct query to pg_policies
    const { data: policies, error: policiesError } = await supabaseService
      .from('pg_policies')
      .select('*')
      .eq('tablename', 'ai_reports');

    // Check if we can query information_schema
    const { data: columns, error: columnsError } = await supabaseService
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'ai_reports')
      .eq('table_schema', 'public');

    res.status(200).json({
      rlsStatus,
      rlsError,
      policies,
      policiesError,
      columns,
      columnsError,
      note: 'If errors appear above, we may need to create custom RPC functions'
    });

  } catch (error) {
    console.error('RLS check error:', error);
    res.status(500).json({ 
      error: 'RLS check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}