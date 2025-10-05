-- =====================================================================
-- Migration: Add Stripe Billing Fields for 14-Day Trial Model
-- =====================================================================
-- Description: Adds comprehensive billing fields to tenants table to support
-- Stripe subscriptions with 14-day free trials and usage tracking
-- =====================================================================

-- Add billing-related columns to tenants table
ALTER TABLE tenants
  -- Stripe customer ID is now properly handled (already exists from migration 005)
  -- We'll just update constraints if needed

  -- Add new billing columns if they don't exist
  ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255),
  ADD COLUMN IF NOT EXISTS subscription_status VARCHAR(50) DEFAULT 'trialing',
  ADD COLUMN IF NOT EXISTS price_id VARCHAR(255),
  ADD COLUMN IF NOT EXISTS trial_end_date TIMESTAMP WITH TIME ZONE DEFAULT (timezone('utc', now()) + INTERVAL '14 days'),
  ADD COLUMN IF NOT EXISTS current_period_start TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS current_period_end TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS cancel_at_period_end BOOLEAN DEFAULT FALSE,

  -- Usage tracking
  ADD COLUMN IF NOT EXISTS assessments_used INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS assessments_limit INTEGER DEFAULT 5,
  ADD COLUMN IF NOT EXISTS bonus_assessments INTEGER DEFAULT 0,

  -- Payment method info (for display purposes)
  ADD COLUMN IF NOT EXISTS payment_method_brand VARCHAR(50),
  ADD COLUMN IF NOT EXISTS payment_method_last4 VARCHAR(4),

  -- Billing metadata
  ADD COLUMN IF NOT EXISTS last_sync_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS stripe_sync_error TEXT;

-- Update existing columns if needed (handle potential conflicts)
DO $$
BEGIN
  -- Update subscription_tier column if it exists with wrong constraints
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tenants'
    AND column_name = 'subscription_tier'
  ) THEN
    ALTER TABLE tenants DROP CONSTRAINT IF EXISTS tenants_subscription_tier_check;
  END IF;

  -- Ensure subscription_tier column has correct constraint
  ALTER TABLE tenants
    ALTER COLUMN subscription_tier TYPE VARCHAR(50),
    ADD CONSTRAINT tenants_subscription_tier_check
    CHECK (subscription_tier IN ('starter', 'professional', 'scale'));

  -- Ensure subscription_status column has correct constraint
  ALTER TABLE tenants DROP CONSTRAINT IF EXISTS tenants_subscription_status_check;
  ALTER TABLE tenants
    ADD CONSTRAINT tenants_subscription_status_check
    CHECK (subscription_status IN (
      'trialing', 'active', 'canceled', 'incomplete',
      'incomplete_expired', 'past_due', 'unpaid', 'paused'
    ));
END $$;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_tenants_stripe_subscription_id
  ON tenants(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_tenants_subscription_status
  ON tenants(subscription_status);
CREATE INDEX IF NOT EXISTS idx_tenants_trial_end_date
  ON tenants(trial_end_date);

-- Add constraints to ensure data integrity
ALTER TABLE tenants
  ADD CONSTRAINT check_assessments_positive
    CHECK (assessments_used >= 0 AND bonus_assessments >= 0);

-- Create function for atomic usage increment
CREATE OR REPLACE FUNCTION increment_assessment_usage(p_tenant_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_can_use BOOLEAN;
  v_limit INTEGER;
  v_used INTEGER;
  v_bonus INTEGER;
BEGIN
  -- Lock the row for update
  SELECT
    assessments_limit,
    assessments_used,
    bonus_assessments
  INTO
    v_limit,
    v_used,
    v_bonus
  FROM tenants
  WHERE id = p_tenant_id
  FOR UPDATE;

  -- Check if tenant exists
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Tenant not found: %', p_tenant_id;
  END IF;

  -- First check if we have bonus assessments
  IF v_bonus > 0 THEN
    UPDATE tenants
    SET bonus_assessments = bonus_assessments - 1
    WHERE id = p_tenant_id;
    RETURN TRUE;
  END IF;

  -- Check if under limit or unlimited (NULL limit means unlimited)
  IF v_limit IS NULL OR v_used < v_limit THEN
    UPDATE tenants
    SET assessments_used = assessments_used + 1
    WHERE id = p_tenant_id;
    RETURN TRUE;
  END IF;

  -- Over limit
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Create function to reset usage (called on billing renewal)
CREATE OR REPLACE FUNCTION reset_assessment_usage(p_tenant_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE tenants
  SET
    assessments_used = 0,
    last_sync_at = timezone('utc', now())
  WHERE id = p_tenant_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to check if tenant can create assessment
CREATE OR REPLACE FUNCTION can_create_assessment(p_tenant_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_status VARCHAR(50);
  v_limit INTEGER;
  v_used INTEGER;
  v_bonus INTEGER;
BEGIN
  SELECT
    subscription_status,
    assessments_limit,
    assessments_used,
    bonus_assessments
  INTO
    v_status,
    v_limit,
    v_used,
    v_bonus
  FROM tenants
  WHERE id = p_tenant_id;

  -- Check if tenant exists
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;

  -- Check subscription status (allow trialing and active)
  IF v_status NOT IN ('trialing', 'active') THEN
    RETURN FALSE;
  END IF;

  -- Check bonus assessments first
  IF v_bonus > 0 THEN
    RETURN TRUE;
  END IF;

  -- Check regular limit (NULL means unlimited)
  IF v_limit IS NULL OR v_used < v_limit THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- Create view for billing dashboard data
CREATE OR REPLACE VIEW billing_status AS
SELECT
  t.id,
  t.subdomain,
  t.company_name,
  t.stripe_customer_id,
  t.stripe_subscription_id,
  t.subscription_status,
  t.subscription_tier,
  t.trial_end_date,
  t.current_period_start,
  t.current_period_end,
  t.cancel_at_period_end,
  t.assessments_used,
  t.assessments_limit,
  t.bonus_assessments,
  -- Calculate total available assessments
  COALESCE(t.bonus_assessments, 0) +
    CASE
      WHEN t.assessments_limit IS NULL THEN 999999 -- Unlimited shown as large number
      ELSE GREATEST(0, t.assessments_limit - t.assessments_used)
    END AS assessments_available,
  -- Calculate if at limit
  CASE
    WHEN t.bonus_assessments > 0 THEN FALSE
    WHEN t.assessments_limit IS NULL THEN FALSE
    WHEN t.assessments_used >= t.assessments_limit THEN TRUE
    ELSE FALSE
  END AS at_limit,
  -- Calculate days remaining in trial
  CASE
    WHEN t.subscription_status = 'trialing' THEN
      GREATEST(0, EXTRACT(DAY FROM (t.trial_end_date - timezone('utc', now()))))::INTEGER
    ELSE NULL
  END AS trial_days_remaining,
  t.payment_method_brand,
  t.payment_method_last4
FROM tenants t;

-- Add RLS policies for billing functions
ALTER FUNCTION increment_assessment_usage SECURITY DEFINER;
ALTER FUNCTION reset_assessment_usage SECURITY DEFINER;
ALTER FUNCTION can_create_assessment SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION increment_assessment_usage TO authenticated;
GRANT EXECUTE ON FUNCTION can_create_assessment TO authenticated;
-- reset_assessment_usage should only be called by service role (webhooks)

-- Add comment documentation
COMMENT ON COLUMN tenants.stripe_subscription_id IS 'Stripe subscription ID for the current subscription';
COMMENT ON COLUMN tenants.subscription_status IS 'Current subscription status from Stripe';
COMMENT ON COLUMN tenants.trial_end_date IS 'When the 14-day trial period ends';
COMMENT ON COLUMN tenants.assessments_used IS 'Number of assessments used in current billing period';
COMMENT ON COLUMN tenants.assessments_limit IS 'Maximum assessments allowed per billing period (NULL = unlimited)';
COMMENT ON COLUMN tenants.bonus_assessments IS 'One-time purchased assessments that dont count against subscription limit';
COMMENT ON FUNCTION increment_assessment_usage IS 'Atomically increment assessment usage, using bonus first';
COMMENT ON FUNCTION can_create_assessment IS 'Check if tenant can create a new assessment based on limits';

-- Migration complete message
DO $$
BEGIN
  RAISE NOTICE 'Stripe billing fields migration completed successfully';
  RAISE NOTICE 'Remember to:';
  RAISE NOTICE '1. Run supabase db push to apply migration';
  RAISE NOTICE '2. Test usage increment function with sample data';
  RAISE NOTICE '3. Verify billing_status view returns correct data';
END $$;