-- Migration 011: Add Overage Tracking for Subscription Billing
-- Created: 2025-11-05
-- Purpose: Add columns and functions to track assessment overages and bill customers

-- ============================================================================
-- STEP 1: Add Overage Tracking Columns to Tenants Table
-- ============================================================================

-- Add overage tracking columns
ALTER TABLE tenants
  ADD COLUMN IF NOT EXISTS assessments_overage INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS overage_charges_current_period DECIMAL(10,2) DEFAULT 0.00,
  ADD COLUMN IF NOT EXISTS last_overage_notification_sent_at TIMESTAMP WITH TIME ZONE;

-- Add comments for documentation
COMMENT ON COLUMN tenants.assessments_overage IS
  'Number of assessments used beyond the plan limit in current billing period. Reset at period renewal.';

COMMENT ON COLUMN tenants.overage_charges_current_period IS
  'Total dollar amount of overage charges accumulated in current billing period. Reset at period renewal.';

COMMENT ON COLUMN tenants.last_overage_notification_sent_at IS
  'Timestamp of last overage notification email sent. Used to throttle notification frequency.';

-- Add index for queries that filter by overage status
CREATE INDEX IF NOT EXISTS idx_tenants_overage
  ON tenants(assessments_overage)
  WHERE assessments_overage > 0;

COMMENT ON INDEX idx_tenants_overage IS
  'Optimizes queries for tenants currently in overage status';


-- ============================================================================
-- STEP 2: Create Overage Invoice Items Tracking Table (Optional - for audit)
-- ============================================================================

CREATE TABLE IF NOT EXISTS overage_invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  stripe_invoice_item_id VARCHAR NOT NULL UNIQUE,
  assessment_id UUID REFERENCES quiz_responses(id) ON DELETE SET NULL,
  assessment_number INTEGER NOT NULL,
  amount_cents INTEGER NOT NULL,
  billing_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  billing_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

CREATE INDEX IF NOT EXISTS idx_overage_invoice_items_tenant
  ON overage_invoice_items(tenant_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_overage_invoice_items_period
  ON overage_invoice_items(tenant_id, billing_period_start, billing_period_end);

COMMENT ON TABLE overage_invoice_items IS
  'Audit trail of Stripe invoice items created for overage charges. Used for reconciliation and reporting.';


-- ============================================================================
-- STEP 3: Update Reset Function to Clear Overage Data
-- ============================================================================

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS reset_assessment_usage(UUID);

-- Create updated function that also resets overage data
CREATE OR REPLACE FUNCTION reset_assessment_usage(p_tenant_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE tenants
  SET
    assessments_used = 0,
    assessments_overage = 0,
    overage_charges_current_period = 0.00,
    updated_at = NOW()
  WHERE id = p_tenant_id;

  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION reset_assessment_usage(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION reset_assessment_usage(UUID) TO service_role;

COMMENT ON FUNCTION reset_assessment_usage IS
  'Resets assessment usage and overage counters at the start of a new billing period';


-- ============================================================================
-- STEP 4: Create New Increment Function with Overage Support
-- ============================================================================

CREATE OR REPLACE FUNCTION increment_assessment_usage_with_overage(
  p_tenant_id UUID
)
RETURNS TABLE(
  success BOOLEAN,
  is_overage BOOLEAN,
  overage_price_cents INTEGER,
  assessments_used INTEGER,
  assessments_overage INTEGER
) AS $$
DECLARE
  v_tenant RECORD;
  v_is_overage BOOLEAN := FALSE;
  v_overage_price INTEGER := 0;
BEGIN
  -- Get tenant data with row lock
  SELECT * INTO v_tenant
  FROM tenants
  WHERE id = p_tenant_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, FALSE, 0, 0, 0;
    RETURN;
  END IF;

  -- Check if this will be an overage
  -- Note: assessments_limit can be NULL for unlimited plans (though we don't use that anymore)
  IF v_tenant.assessments_limit IS NOT NULL AND
     v_tenant.assessments_used >= v_tenant.assessments_limit THEN
    v_is_overage := TRUE;

    -- Determine overage price based on tier (in cents)
    CASE v_tenant.subscription_tier
      WHEN 'starter' THEN v_overage_price := 400; -- $4.00
      WHEN 'professional' THEN v_overage_price := 300; -- $3.00
      WHEN 'scale' THEN v_overage_price := 200; -- $2.00
      ELSE v_overage_price := 400; -- Default to $4.00
    END CASE;
  END IF;

  -- Increment usage counters
  UPDATE tenants
  SET
    assessments_used = assessments_used + 1,
    assessments_overage = CASE
      WHEN v_is_overage THEN assessments_overage + 1
      ELSE assessments_overage
    END,
    overage_charges_current_period = CASE
      WHEN v_is_overage THEN overage_charges_current_period + (v_overage_price / 100.0)
      ELSE overage_charges_current_period
    END,
    updated_at = NOW()
  WHERE id = p_tenant_id;

  -- Return results
  RETURN QUERY SELECT
    TRUE,
    v_is_overage,
    v_overage_price,
    v_tenant.assessments_used + 1,
    CASE WHEN v_is_overage THEN v_tenant.assessments_overage + 1 ELSE v_tenant.assessments_overage END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION increment_assessment_usage_with_overage(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_assessment_usage_with_overage(UUID) TO service_role;

COMMENT ON FUNCTION increment_assessment_usage_with_overage IS
  'Increments assessment usage and tracks overages. Returns: success, is_overage flag, overage price in cents, new usage counts. Uses row-level locking to prevent race conditions.';


-- ============================================================================
-- STEP 5: Create Helper Function to Get Overage Summary
-- ============================================================================

CREATE OR REPLACE FUNCTION get_overage_summary(p_tenant_id UUID)
RETURNS TABLE(
  has_overage BOOLEAN,
  overage_count INTEGER,
  overage_charges_dollars DECIMAL(10,2),
  tier VARCHAR,
  per_overage_price_dollars DECIMAL(10,2)
) AS $$
DECLARE
  v_tenant RECORD;
  v_per_overage_price DECIMAL(10,2);
BEGIN
  SELECT
    assessments_overage,
    overage_charges_current_period,
    subscription_tier
  INTO v_tenant
  FROM tenants
  WHERE id = p_tenant_id;

  IF NOT FOUND THEN
    RETURN QUERY SELECT FALSE, 0, 0.00::DECIMAL, ''::VARCHAR, 0.00::DECIMAL;
    RETURN;
  END IF;

  -- Calculate per-overage price based on tier
  CASE v_tenant.subscription_tier
    WHEN 'starter' THEN v_per_overage_price := 4.00;
    WHEN 'professional' THEN v_per_overage_price := 3.00;
    WHEN 'scale' THEN v_per_overage_price := 2.00;
    ELSE v_per_overage_price := 4.00;
  END CASE;

  RETURN QUERY SELECT
    v_tenant.assessments_overage > 0,
    v_tenant.assessments_overage,
    v_tenant.overage_charges_current_period,
    v_tenant.subscription_tier,
    v_per_overage_price;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION get_overage_summary(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_overage_summary(UUID) TO service_role;

COMMENT ON FUNCTION get_overage_summary IS
  'Returns overage summary for a tenant including count, charges, and pricing info. Used for dashboard display.';


-- ============================================================================
-- STEP 6: Add RLS Policies for New Table
-- ============================================================================

-- Enable RLS on overage_invoice_items table
ALTER TABLE overage_invoice_items ENABLE ROW LEVEL SECURITY;

-- Policy: Tenants can view their own overage invoice items
CREATE POLICY overage_invoice_items_select_own
  ON overage_invoice_items
  FOR SELECT
  USING (
    tenant_id IN (
      SELECT tenant_id
      FROM tenant_members
      WHERE user_email = auth.email()
    )
  );

-- Policy: Service role can do everything (for background jobs)
CREATE POLICY overage_invoice_items_service_all
  ON overage_invoice_items
  FOR ALL
  USING (auth.role() = 'service_role');

COMMENT ON POLICY overage_invoice_items_select_own ON overage_invoice_items IS
  'Allows tenant members to view their own overage invoice items';

COMMENT ON POLICY overage_invoice_items_service_all ON overage_invoice_items IS
  'Allows service role full access for background billing jobs';


-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Verify the migration
DO $$
BEGIN
  RAISE NOTICE 'Migration 011 complete: Overage tracking enabled';
  RAISE NOTICE 'New columns added: assessments_overage, overage_charges_current_period, last_overage_notification_sent_at';
  RAISE NOTICE 'New table created: overage_invoice_items';
  RAISE NOTICE 'Functions created: increment_assessment_usage_with_overage, get_overage_summary';
  RAISE NOTICE 'Updated function: reset_assessment_usage';
END $$;
