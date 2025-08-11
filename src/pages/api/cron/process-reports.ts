import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verify cron secret for security (Vercel cron jobs)
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.log('[CRON] Unauthorized access attempt');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('[CRON] Starting report processing job at', new Date().toISOString());

  const supabase = supabaseAdmin();
  const startTime = Date.now();
  
  try {
    // Find reports that need processing
    // Status: pending (new), processing (retry), failed (retry with limit)
    const { data: pendingReports, error: fetchError } = await supabase
      .from('ai_reports')
      .select('id, report_status, created_at, updated_at')
      .in('report_status', ['pending', 'processing', 'failed'])
      .order('created_at', { ascending: true })
      .limit(5); // Process max 5 reports per cron run to stay within timeout

    if (fetchError) {
      console.error('[CRON] Failed to fetch pending reports:', fetchError);
      return res.status(500).json({ error: 'Failed to fetch reports' });
    }

    if (!pendingReports || pendingReports.length === 0) {
      console.log('[CRON] No reports to process');
      return res.status(200).json({ 
        success: true, 
        message: 'No reports to process',
        processed: 0
      });
    }

    console.log(`[CRON] Found ${pendingReports.length} reports to process`);

    const results = [];
    
    // Process each report
    for (const report of pendingReports) {
      console.log(`[CRON] Processing report ${report.id} (status: ${report.report_status})`);
      
      // Check if report is stuck (processing for more than 5 minutes)
      const isStuck = report.report_status === 'processing' && 
        report.updated_at && 
        new Date().getTime() - new Date(report.updated_at).getTime() > 5 * 60 * 1000;
      
      // Skip if failed more than 3 times (check by counting retries)
      if (report.report_status === 'failed') {
        const timeSinceFailed = report.updated_at ? 
          new Date().getTime() - new Date(report.updated_at).getTime() : 0;
        
        // Only retry failed reports after 1 minute, and max 3 times (3 hours)
        if (timeSinceFailed < 60 * 1000) {
          console.log(`[CRON] Skipping failed report ${report.id} - too recent`);
          continue;
        }
        
        if (timeSinceFailed > 3 * 60 * 60 * 1000) {
          console.log(`[CRON] Skipping failed report ${report.id} - max retries exceeded`);
          continue;
        }
      }
      
      // Skip if processing and not stuck
      if (report.report_status === 'processing' && !isStuck) {
        console.log(`[CRON] Skipping report ${report.id} - already processing`);
        continue;
      }
      
      try {
        // Call the unified pipeline processor
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${req.headers.host}`;
        const response = await fetch(`${baseUrl}/api/ai-analysis/process-pipeline`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.INTERNAL_API_KEY || '',
          },
          body: JSON.stringify({
            reportId: report.id,
            force: isStuck // Force reprocess if stuck
          }),
        });

        const result = await response.json();
        
        if (response.ok) {
          console.log(`[CRON] Successfully processed report ${report.id}`);
          results.push({ reportId: report.id, success: true });
        } else {
          console.error(`[CRON] Failed to process report ${report.id}:`, result.error);
          results.push({ reportId: report.id, success: false, error: result.error });
        }
      } catch (error) {
        console.error(`[CRON] Exception processing report ${report.id}:`, error);
        results.push({ 
          reportId: report.id, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
      
      // Add small delay between reports to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const totalTime = (Date.now() - startTime) / 1000;
    const successCount = results.filter(r => r.success).length;
    
    console.log(`[CRON] Job complete. Processed ${successCount}/${results.length} reports in ${totalTime}s`);

    res.status(200).json({ 
      success: true,
      message: `Processed ${successCount}/${results.length} reports`,
      processed: results.length,
      successful: successCount,
      results,
      duration: totalTime
    });

  } catch (error) {
    console.error('[CRON] Critical error in job:', error);
    res.status(500).json({ 
      error: 'Cron job failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}