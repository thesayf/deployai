-- Add payment method expiry fields to tenants table
-- This allows us to display card expiration date in the billing UI

ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS payment_method_exp_month INTEGER,
ADD COLUMN IF NOT EXISTS payment_method_exp_year INTEGER;

-- Add comment for documentation
COMMENT ON COLUMN tenants.payment_method_exp_month IS 'Payment method expiration month (1-12)';
COMMENT ON COLUMN tenants.payment_method_exp_year IS 'Payment method expiration year (4-digit)';
