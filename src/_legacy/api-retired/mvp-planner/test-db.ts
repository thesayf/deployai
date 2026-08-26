import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const supabase = supabaseAdmin();
    
    // Test 1: Check if table exists
    const { data: tables, error: tablesError } = await supabase
      .from('mvp_planner_responses')
      .select('*')
      .limit(1);
    
    if (tablesError) {
      console.error('Table check error:', {
        message: tablesError.message,
        code: tablesError.code,
        details: tablesError.details,
        hint: tablesError.hint
      });
      
      return res.status(200).json({
        success: false,
        error: 'Table does not exist or access denied',
        details: tablesError.message,
        hint: tablesError.hint || 'Run the migration: 003_create_mvp_planner_tables.sql'
      });
    }
    
    // Test 2: Try to count rows
    const { count, error: countError } = await supabase
      .from('mvp_planner_responses')
      .select('*', { count: 'exact', head: true });
    
    return res.status(200).json({
      success: true,
      message: 'Database connection successful',
      tableExists: true,
      rowCount: count || 0
    });
    
  } catch (error) {
    console.error('Database test error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to test database connection',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}