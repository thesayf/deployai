-- Add fields for final report generation and structured report data
-- This migration adds support for the new AI-driven report generation with structured content

-- Add final report content field
ALTER TABLE ai_reports 
ADD COLUMN IF NOT EXISTS final_report JSONB,          -- Final structured report data
ADD COLUMN IF NOT EXISTS report_html TEXT,            -- Generated HTML report
ADD COLUMN IF NOT EXISTS report_variant TEXT DEFAULT 'executive' CHECK (
    report_variant IN ('executive', 'narrative', 'datasheet')
);

-- Add metadata fields for report generation
ALTER TABLE ai_reports
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS industry_context TEXT,
ADD COLUMN IF NOT EXISTS report_generated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS report_accessed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS access_count INTEGER DEFAULT 0;

-- The final_report JSONB will store the structured data matching our TypeScript interface:
-- {
--   "problemSummary": {
--     "industryProfile": "string (max 15 words)",
--     "topProblems": ["string (max 10 words)", ...],
--     "monthlyOpportunity": "string"
--   },
--   "solutions": [
--     {
--       "category": "string (max 5 words)",
--       "outcome": "string (max 12 words)",
--       "timeline": "string",
--       "caseStudy": "string (max 20 words)"
--     }
--   ],
--   "measurableImprovements": [
--     {
--       "metric": "string",
--       "currentState": "string",
--       "projectedState": "string",
--       "improvement": "string"
--     }
--   ],
--   "actionPlan": {
--     "roiProjection": "string",
--     "readinessLevel": "string",
--     "ctaText": "string (max 10 words)",
--     "urgency": "string (max 10 words)"
--   }
-- }

-- Create index for final report data
CREATE INDEX IF NOT EXISTS idx_ai_reports_final_report ON ai_reports USING gin(final_report);

-- Create index for report access tracking
CREATE INDEX IF NOT EXISTS idx_ai_reports_report_generated_at ON ai_reports(report_generated_at);
CREATE INDEX IF NOT EXISTS idx_ai_reports_company_name ON ai_reports(company_name);

-- Update report_status to include 'report_generated' status
ALTER TABLE ai_reports 
DROP CONSTRAINT IF EXISTS ai_reports_report_status_check;

ALTER TABLE ai_reports 
ADD CONSTRAINT ai_reports_report_status_check 
CHECK (report_status IN (
    'pending', 
    'generating', 
    'stage1_complete', 
    'stage2_complete', 
    'stage3_complete', 
    'stage4_complete',
    'report_generated',  -- New status for when final report is created
    'completed', 
    'failed'
));

-- Function to update access tracking when report is viewed
CREATE OR REPLACE FUNCTION update_report_access()
RETURNS TRIGGER AS $$
BEGIN
    NEW.report_accessed_at = NOW();
    NEW.access_count = COALESCE(OLD.access_count, 0) + 1;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Note: Trigger should be created in application logic when report is accessed
-- Example: UPDATE ai_reports SET access_count = access_count + 1 WHERE access_token = ?