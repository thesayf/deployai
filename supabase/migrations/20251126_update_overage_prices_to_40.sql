-- Update the increment_tenant_usage function with new $40 flat overage price
CREATE OR REPLACE FUNCTION increment_tenant_usage(p_tenant_id UUID)
RETURNS TABLE(
  new_assessments_used INTEGER,
  new_assessments_overage INTEGER,
  is_overage BOOLEAN,
  overage_price_cents INTEGER,
  should_create_invoice_item BOOLEAN
) AS $$
DECLARE
  v_tenant RECORD;
  v_is_overage BOOLEAN := FALSE;
  v_overage_price INTEGER := 0;
  v_new_assessments_used INTEGER;
  v_new_assessments_overage INTEGER;
BEGIN
  -- Get current tenant data with lock
  SELECT * INTO v_tenant FROM tenants WHERE id = p_tenant_id FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Tenant not found: %', p_tenant_id;
  END IF;

  -- Check if this would be an overage
  IF v_tenant.assessments_limit IS NOT NULL AND
     v_tenant.assessments_used >= v_tenant.assessments_limit THEN
    v_is_overage := TRUE;
    -- Flat $40 overage price for all tiers (4000 cents)
    v_overage_price := 4000;
  END IF;

  v_new_assessments_used := v_tenant.assessments_used + 1;
  v_new_assessments_overage := CASE
    WHEN v_is_overage THEN v_tenant.assessments_overage + 1
    ELSE v_tenant.assessments_overage
  END;

  -- Update tenant
  UPDATE tenants t
  SET
    assessments_used = v_new_assessments_used,
    assessments_overage = v_new_assessments_overage,
    overage_charges_current_period = CASE
      WHEN v_is_overage THEN t.overage_charges_current_period + (v_overage_price / 100.0)
      ELSE t.overage_charges_current_period
    END,
    updated_at = NOW()
  WHERE t.id = p_tenant_id;

  RETURN QUERY SELECT
    v_new_assessments_used,
    v_new_assessments_overage,
    v_is_overage,
    v_overage_price,
    v_is_overage; -- should_create_invoice_item is true when overage
END;
$$ LANGUAGE plpgsql;
