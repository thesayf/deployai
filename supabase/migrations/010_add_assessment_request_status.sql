-- =====================================================================
-- Migration: Add Assessment Request Status
-- =====================================================================
-- Description: Adds request_status field to quiz_responses to support
-- manual assessment requests when tenants hit their limit
-- =====================================================================

-- Add request_status column to quiz_responses
ALTER TABLE quiz_responses
  ADD COLUMN IF NOT EXISTS request_status VARCHAR(20)
  CHECK (request_status IN ('requested', 'approved', 'completed'))
  DEFAULT NULL;

-- Add notes field for admin follow-up and communication
ALTER TABLE quiz_responses
  ADD COLUMN IF NOT EXISTS admin_notes TEXT;

-- Create index for efficient filtering by request status
CREATE INDEX IF NOT EXISTS idx_quiz_responses_request_status
  ON quiz_responses(request_status);

-- Add index for tenant + request_status queries (common admin view)
CREATE INDEX IF NOT EXISTS idx_quiz_responses_tenant_request_status
  ON quiz_responses(tenant_id, request_status)
  WHERE request_status IS NOT NULL;

-- Add column documentation
COMMENT ON COLUMN quiz_responses.request_status IS
  'Status for manually requested assessments: requested (user submitted form), approved (admin granted access), completed (assessment finished). NULL means normal flow.';

COMMENT ON COLUMN quiz_responses.admin_notes IS
  'Internal notes for admin team regarding request approval or follow-up';

-- Migration complete message
DO $$
BEGIN
  RAISE NOTICE 'Assessment request status migration completed successfully';
  RAISE NOTICE 'New columns: request_status, admin_notes';
  RAISE NOTICE 'New indexes: idx_quiz_responses_request_status, idx_quiz_responses_tenant_request_status';
END $$;
