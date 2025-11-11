-- Add branding columns to tenants table for white-label customization

ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS logo_url TEXT,
ADD COLUMN IF NOT EXISTS brand_color VARCHAR(7) DEFAULT '#FF6B35',
ADD COLUMN IF NOT EXISTS tagline TEXT;

-- Add comments to document the columns
COMMENT ON COLUMN tenants.logo_url IS 'URL to tenant logo image for white-label branding';
COMMENT ON COLUMN tenants.brand_color IS 'Primary brand color as hex code (e.g., #FF6B35) for buttons and accents';
COMMENT ON COLUMN tenants.tagline IS 'Optional custom tagline for assessment landing page hero';

-- Create index for faster queries when fetching tenant branding
CREATE INDEX IF NOT EXISTS idx_tenants_subdomain_branding
ON tenants(subdomain)
INCLUDE (company_name, logo_url, brand_color, tagline);
