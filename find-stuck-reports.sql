-- Query to find stuck reports in production
-- Run this in your Supabase SQL editor

-- Find all reports stuck in 'generating' status
SELECT 
  ar.id as report_id,
  ar.report_status,
  ar.created_at,
  ar.updated_at,
  ar.access_token,
  ar.email_sent_at,
  qr.user_email,
  qr.user_company,
  -- Check which stages are complete
  CASE WHEN ar.stage1_problem_analysis IS NOT NULL THEN 'Yes' ELSE 'No' END as stage1_complete,
  CASE WHEN ar.stage2_tool_research IS NOT NULL THEN 'Yes' ELSE 'No' END as stage2_complete,
  CASE WHEN ar.stage3_tool_selection IS NOT NULL THEN 'Yes' ELSE 'No' END as stage3_complete,
  CASE WHEN ar.stage4_report_content IS NOT NULL THEN 'Yes' ELSE 'No' END as stage4_complete
FROM ai_reports ar
LEFT JOIN quiz_responses qr ON ar.quiz_response_id = qr.id
WHERE ar.report_status = 'generating'
  AND ar.created_at > NOW() - INTERVAL '7 days'  -- Last 7 days
ORDER BY ar.created_at DESC;

-- If you want to find a specific user's stuck report:
-- Add this condition to the WHERE clause:
-- AND qr.user_email = 'client@example.com'

-- To fix a stuck report that has all stages complete:
-- UPDATE ai_reports 
-- SET report_status = 'completed', updated_at = NOW()
-- WHERE id = 'your-report-id-here'
-- AND stage4_report_content IS NOT NULL;