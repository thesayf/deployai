-- Phase 3: Authentication for Admin Portal
-- Add proper authentication support for multi-tenant admin access

-- Create admin_users table for authenticated users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  auth_provider VARCHAR(50) DEFAULT 'email' CHECK (auth_provider IN ('email', 'google')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- Modify tenant_members to reference admin_users instead of just email
ALTER TABLE tenant_members
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE;

-- Migrate existing email-based members to use user_id
-- This will be handled in application logic during first login

-- Create sessions table for managing auth sessions
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON admin_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_tenant_members_user_id ON tenant_members(user_id);

-- Enable RLS on new tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users
CREATE POLICY "Users can view their own profile" ON admin_users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile" ON admin_users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- RLS Policies for admin_sessions
CREATE POLICY "Users can view their own sessions" ON admin_sessions
  FOR SELECT USING (user_id::text = auth.uid()::text);

CREATE POLICY "Service role can manage all sessions" ON admin_sessions
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- RLS Policies for tenant_members (update existing or create new)
DROP POLICY IF EXISTS "Tenant members can view their membership" ON tenant_members;
CREATE POLICY "Tenant members can view their membership" ON tenant_members
  FOR SELECT USING (
    user_id::text = auth.uid()::text OR
    user_email = auth.jwt()->>'email'
  );

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM admin_sessions WHERE expires_at < timezone('utc', now());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a scheduled job to clean up expired sessions (requires pg_cron extension)
-- This would be set up in Supabase dashboard or via external cron job

-- Function to get or create admin user on first login
CREATE OR REPLACE FUNCTION get_or_create_admin_user(
  p_email VARCHAR(255),
  p_name VARCHAR(255) DEFAULT NULL,
  p_avatar_url TEXT DEFAULT NULL,
  p_auth_provider VARCHAR(50) DEFAULT 'email'
)
RETURNS TABLE (
  user_id UUID,
  is_new BOOLEAN
) AS $$
DECLARE
  v_user_id UUID;
  v_is_new BOOLEAN := false;
BEGIN
  -- Try to find existing user
  SELECT id INTO v_user_id FROM admin_users WHERE email = p_email;

  -- If not found, create new user
  IF v_user_id IS NULL THEN
    INSERT INTO admin_users (email, name, avatar_url, auth_provider)
    VALUES (p_email, p_name, p_avatar_url, p_auth_provider)
    RETURNING id INTO v_user_id;

    v_is_new := true;
  ELSE
    -- Update last login
    UPDATE admin_users
    SET last_login_at = timezone('utc', now()),
        name = COALESCE(p_name, name),
        avatar_url = COALESCE(p_avatar_url, avatar_url)
    WHERE id = v_user_id;
  END IF;

  RETURN QUERY SELECT v_user_id, v_is_new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to verify tenant membership
CREATE OR REPLACE FUNCTION verify_tenant_membership(
  p_user_id UUID,
  p_tenant_subdomain VARCHAR(255)
)
RETURNS TABLE (
  has_access BOOLEAN,
  tenant_id UUID,
  user_role VARCHAR(50)
) AS $$
DECLARE
  v_tenant_id UUID;
  v_user_role VARCHAR(50);
BEGIN
  -- Get tenant ID from subdomain
  SELECT id INTO v_tenant_id FROM tenants WHERE subdomain = p_tenant_subdomain;

  IF v_tenant_id IS NULL THEN
    RETURN QUERY SELECT false::BOOLEAN, NULL::UUID, NULL::VARCHAR(50);
    RETURN;
  END IF;

  -- Check membership
  SELECT role INTO v_user_role
  FROM tenant_members
  WHERE user_id = p_user_id AND tenant_id = v_tenant_id;

  IF v_user_role IS NOT NULL THEN
    RETURN QUERY SELECT true::BOOLEAN, v_tenant_id, v_user_role;
  ELSE
    -- Also check by email for backward compatibility
    SELECT role INTO v_user_role
    FROM tenant_members tm
    JOIN admin_users au ON tm.user_email = au.email
    WHERE au.id = p_user_id AND tm.tenant_id = v_tenant_id;

    IF v_user_role IS NOT NULL THEN
      -- Migrate to user_id based membership
      UPDATE tenant_members
      SET user_id = p_user_id
      WHERE user_email = (SELECT email FROM admin_users WHERE id = p_user_id)
        AND tenant_id = v_tenant_id;

      RETURN QUERY SELECT true::BOOLEAN, v_tenant_id, v_user_role;
    ELSE
      RETURN QUERY SELECT false::BOOLEAN, v_tenant_id, NULL::VARCHAR(50);
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert demo tenant and admin user for testing
INSERT INTO tenants (subdomain, company_name, email, subscription_tier, assessments_limit)
VALUES ('testconsultant', 'Test Consultant Inc', 'admin@testconsultant.com', 'professional', 100)
ON CONFLICT (subdomain) DO NOTHING;

-- The admin user will be created on first login