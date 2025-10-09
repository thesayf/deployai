-- Add owner_id and billing_email to tenants table
ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS billing_email VARCHAR(255);

-- Update existing email column name for clarity
ALTER TABLE tenants RENAME COLUMN email TO contact_email;

-- Create index for owner_id lookups
CREATE INDEX IF NOT EXISTS idx_tenants_owner_id ON tenants(owner_id);

-- Update RLS policy to allow owners to view their tenant
DROP POLICY IF EXISTS "Tenant admins can view their tenant" ON tenants;
CREATE POLICY "Tenant owners and admins can view their tenant" ON tenants
  FOR SELECT USING (
    owner_id = auth.uid() OR
    id IN (
      SELECT tenant_id FROM tenant_members
      WHERE user_email = auth.email()
      AND role = 'admin'
    )
  );

-- Update RLS policy to allow owners to update their tenant
DROP POLICY IF EXISTS "Tenant admins can update their tenant" ON tenants;
CREATE POLICY "Tenant owners and admins can update their tenant" ON tenants
  FOR UPDATE USING (
    owner_id = auth.uid() OR
    id IN (
      SELECT tenant_id FROM tenant_members
      WHERE user_email = auth.email()
      AND role = 'admin'
    )
  );
