-- Add unique constraint to prevent duplicate ai_reports for the same quiz_response_id
ALTER TABLE ai_reports
ADD CONSTRAINT ai_reports_quiz_response_id_unique UNIQUE (quiz_response_id);

-- This will prevent duplicate entries at the database level
-- If a duplicate insert is attempted, it will fail with a unique constraint violation