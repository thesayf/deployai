import { supabaseAdmin } from './supabase';

let tablesInitialized = false;

export async function ensureMVPPlannerTables() {
  if (tablesInitialized) return true;
  
  const supabase = supabaseAdmin();
  
  try {
    // Check if tables exist
    const { error: checkError } = await supabase
      .from('mvp_planner_responses')
      .select('id')
      .limit(1);
    
    if (!checkError) {
      tablesInitialized = true;
      return true; // Tables already exist
    }
    
    // If we get here, tables don't exist
    console.log('MVP Planner tables not found. Please run migration.');
    console.log('Visit: https://app.supabase.com/project/nwddsjghbyrerhhnciuk/sql/new');
    console.log('And run the SQL from: supabase/migrations/003_create_mvp_planner_tables.sql');
    
    return false;
  } catch (error) {
    console.error('Error checking tables:', error);
    return false;
  }
}

// Alternative: Use this in your API routes to ensure tables exist
export async function withMVPPlannerTables<T>(
  handler: () => Promise<T>
): Promise<T | { success: false; error: string }> {
  const tablesExist = await ensureMVPPlannerTables();
  
  if (!tablesExist) {
    return {
      success: false,
      error: 'Database tables not initialized. Please run the migration first.'
    } as any;
  }
  
  return handler();
}