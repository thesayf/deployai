-- Update MVP Planner tables to use project_name instead of last_name/company

-- First, add the project_name column
ALTER TABLE mvp_planner_responses
ADD COLUMN IF NOT EXISTS project_name TEXT;

-- Update existing rows if any (set project_name to company name or 'Unnamed Project')
UPDATE mvp_planner_responses
SET project_name = COALESCE(user_company, 'Unnamed Project')
WHERE project_name IS NULL;

-- Make project_name NOT NULL after setting values
ALTER TABLE mvp_planner_responses
ALTER COLUMN project_name SET NOT NULL;

-- Drop the old columns
ALTER TABLE mvp_planner_responses
DROP COLUMN IF EXISTS user_last_name,
DROP COLUMN IF EXISTS user_company;