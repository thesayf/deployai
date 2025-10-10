-- Assign all existing assessments (with NULL tenant_id) to Social Finance Limited tenant
-- This migration connects existing test assessments to allow viewing the new detail page components

-- Update quiz_responses to assign them to Social Finance tenant
UPDATE quiz_responses
SET tenant_id = '91578a15-9c62-4e64-a73d-b3974c232824'
WHERE tenant_id IS NULL;

-- Update the tenant's assessments_used count to reflect actual number
UPDATE tenants
SET assessments_used = (
  SELECT COUNT(*)
  FROM quiz_responses
  WHERE tenant_id = '91578a15-9c62-4e64-a73d-b3974c232824'
)
WHERE id = '91578a15-9c62-4e64-a73d-b3974c232824';
