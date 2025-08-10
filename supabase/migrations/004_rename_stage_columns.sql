-- Rename misleading stage column names to accurately reflect the 4-stage AI pipeline
-- Based on the actual pipeline:
-- Stage 1: Problem Analysis & Identification
-- Stage 2: Initial Tool Search & Research  
-- Stage 3: Final Tool Selection & Matching
-- Stage 4: Report Content Generation

-- Rename columns to be more descriptive and accurate
ALTER TABLE ai_reports 
RENAME COLUMN stage1_analysis TO stage1_problem_analysis;

ALTER TABLE ai_reports 
RENAME COLUMN stage2_market TO stage2_tool_research;

ALTER TABLE ai_reports 
RENAME COLUMN stage3_financial TO stage3_tool_selection;

ALTER TABLE ai_reports 
RENAME COLUMN stage4_strategic TO stage4_report_content;

-- Drop old indexes
DROP INDEX IF EXISTS idx_ai_reports_stage1_analysis;
DROP INDEX IF EXISTS idx_ai_reports_stage2_market;
DROP INDEX IF EXISTS idx_ai_reports_stage3_financial;
DROP INDEX IF EXISTS idx_ai_reports_stage4_strategic;

-- Create new indexes with updated names
CREATE INDEX IF NOT EXISTS idx_ai_reports_stage1_problem_analysis ON ai_reports USING gin(stage1_problem_analysis);
CREATE INDEX IF NOT EXISTS idx_ai_reports_stage2_tool_research ON ai_reports USING gin(stage2_tool_research);
CREATE INDEX IF NOT EXISTS idx_ai_reports_stage3_tool_selection ON ai_reports USING gin(stage3_tool_selection);
CREATE INDEX IF NOT EXISTS idx_ai_reports_stage4_report_content ON ai_reports USING gin(stage4_report_content);

-- Add comments to document what each stage contains
COMMENT ON COLUMN ai_reports.stage1_problem_analysis IS 'Stage 1: Problem identification and business context analysis from quiz responses';
COMMENT ON COLUMN ai_reports.stage2_tool_research IS 'Stage 2: Initial AI tool research and category identification';
COMMENT ON COLUMN ai_reports.stage3_tool_selection IS 'Stage 3: Final tool selection and matching to business needs';
COMMENT ON COLUMN ai_reports.stage4_report_content IS 'Stage 4: Generated report content with solutions and improvements';
COMMENT ON COLUMN ai_reports.final_report IS 'Final structured report data ready for display in UI';

-- Update the failed_at_stage comment to clarify stages
COMMENT ON COLUMN ai_reports.failed_at_stage IS 'Which stage failed: 1=Problem Analysis, 2=Tool Research, 3=Tool Selection, 4=Report Generation';