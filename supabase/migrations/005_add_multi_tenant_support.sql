-- Phase 1: Multi-tenant Foundation
-- Add tenant support to deployAI platform

-- Create tenants table
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subdomain VARCHAR(255) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  custom_title VARCHAR(255),
  custom_logo_url TEXT,
  stripe_customer_id VARCHAR(255) UNIQUE,
  subscription_tier VARCHAR(50) CHECK (subscription_tier IN ('starter', 'professional', 'scale')),
  subscription_status VARCHAR(50) DEFAULT 'active',
  assessments_used INTEGER DEFAULT 0,
  assessments_limit INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create tenant members table for user-tenant relationships
CREATE TABLE IF NOT EXISTS tenant_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_email VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  UNIQUE(tenant_id, user_email)
);

-- Create tenant invitations table
CREATE TABLE IF NOT EXISTS tenant_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  token VARCHAR(255) UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc', now() + interval '7 days'),
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Add tenant_id to existing tables
ALTER TABLE quiz_responses
ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;

ALTER TABLE ai_reports
ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;

ALTER TABLE mvp_planner_responses
ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;

ALTER TABLE mvp_planner_reports
ADD COLUMN IF NOT EXISTS tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain ON tenants(subdomain);
CREATE INDEX IF NOT EXISTS idx_tenants_stripe_customer_id ON tenants(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_tenant_members_tenant_id ON tenant_members(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_members_user_email ON tenant_members(user_email);
CREATE INDEX IF NOT EXISTS idx_tenant_invitations_token ON tenant_invitations(token);
CREATE INDEX IF NOT EXISTS idx_tenant_invitations_tenant_id ON tenant_invitations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_tenant_id ON quiz_responses(tenant_id);
CREATE INDEX IF NOT EXISTS idx_ai_reports_tenant_id ON ai_reports(tenant_id);
CREATE INDEX IF NOT EXISTS idx_mvp_planner_responses_tenant_id ON mvp_planner_responses(tenant_id);
CREATE INDEX IF NOT EXISTS idx_mvp_planner_reports_tenant_id ON mvp_planner_reports(tenant_id);

-- Enable Row Level Security (RLS) on tenant tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_invitations ENABLE ROW LEVEL SECURITY;

-- Note: We'll enable RLS on existing tables after testing to avoid breaking current functionality
-- ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE ai_reports ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE mvp_planner_responses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE mvp_planner_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tenants table
CREATE POLICY "Tenant admins can view their tenant" ON tenants
  FOR SELECT USING (
    id IN (
      SELECT tenant_id FROM tenant_members
      WHERE user_email = current_setting('app.user_email', true)
      AND role = 'admin'
    )
  );

CREATE POLICY "Tenant admins can update their tenant" ON tenants
  FOR UPDATE USING (
    id IN (
      SELECT tenant_id FROM tenant_members
      WHERE user_email = current_setting('app.user_email', true)
      AND role = 'admin'
    )
  );

-- Create RLS policies for tenant_members table
CREATE POLICY "Members can view their tenant members" ON tenant_members
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM tenant_members
      WHERE user_email = current_setting('app.user_email', true)
    )
  );

CREATE POLICY "Admins can manage tenant members" ON tenant_members
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM tenant_members
      WHERE user_email = current_setting('app.user_email', true)
      AND role = 'admin'
    )
  );

-- Create RLS policies for tenant_invitations
CREATE POLICY "Admins can manage invitations" ON tenant_invitations
  FOR ALL USING (
    tenant_id IN (
      SELECT tenant_id FROM tenant_members
      WHERE user_email = current_setting('app.user_email', true)
      AND role = 'admin'
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();