import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const supabase = supabaseAdmin();

    // Get column information for ai_reports table
    const { data: columns, error } = await supabase
      .rpc('get_table_columns', { 
        table_name: 'ai_reports' 
      })
      .single();

    if (error) {
      // Try alternative approach - select a row and see what columns come back
      const { data: sampleRow, error: sampleError } = await supabase
        .from('ai_reports')
        .select('*')
        .limit(1)
        .single();

      if (sampleError && sampleError.code !== 'PGRST116') { // PGRST116 = no rows
        return res.status(500).json({ 
          error: 'Failed to get table info',
          details: sampleError 
        });
      }

      // Get column names from the sample row or empty object
      const columnNames = sampleRow ? Object.keys(sampleRow) : [];
      
      return res.status(200).json({ 
        method: 'sample_row',
        columns: columnNames,
        sampleData: sampleRow,
        note: sampleRow ? 'Columns detected from sample row' : 'No rows found in table'
      });
    }

    res.status(200).json({ 
      method: 'rpc',
      columns: columns
    });

  } catch (error) {
    console.error('Check columns error:', error);
    res.status(500).json({ 
      error: 'Failed to check columns',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}