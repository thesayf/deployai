-- Update ai_reports table to support 4-stage AI analysis pipeline

-- Add new columns for each AI stage
ALTER TABLE ai_reports 
ADD COLUMN IF NOT EXISTS stage1_analysis JSONB,     -- Intelligence Analysis
ADD COLUMN IF NOT EXISTS stage2_market JSONB,       -- Market Intelligence
ADD COLUMN IF NOT EXISTS stage3_financial JSONB,    -- Financial Analysis
ADD COLUMN IF NOT EXISTS stage4_strategic JSONB;    -- Strategic Recommendations

-- Remove old columns that are no longer needed
ALTER TABLE ai_reports 
DROP COLUMN IF EXISTS stage1_content,
DROP COLUMN IF EXISTS stage2_content;

-- Update the report_status enum to include all stages
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
    'completed', 
    'failed'
));

-- Add indexes for JSON columns for better query performance
CREATE INDEX IF NOT EXISTS idx_ai_reports_stage1_analysis ON ai_reports USING gin(stage1_analysis);
CREATE INDEX IF NOT EXISTS idx_ai_reports_stage2_market ON ai_reports USING gin(stage2_market);
CREATE INDEX IF NOT EXISTS idx_ai_reports_stage3_financial ON ai_reports USING gin(stage3_financial);
CREATE INDEX IF NOT EXISTS idx_ai_reports_stage4_strategic ON ai_reports USING gin(stage4_strategic);

-- Add a column to track which stage failed (if any)
ALTER TABLE ai_reports 
ADD COLUMN IF NOT EXISTS failed_at_stage INTEGER CHECK (failed_at_stage >= 1 AND failed_at_stage <= 4),
ADD COLUMN IF NOT EXISTS error_message TEXT;

-- Update the updated_at trigger to ensure it works with new columns
-- (The trigger function already exists from the first migration)