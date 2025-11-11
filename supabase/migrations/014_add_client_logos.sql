-- Add client logos field for social proof on assessment landing pages

ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS client_logos JSONB DEFAULT '[]';

-- Add comment to document the field
COMMENT ON COLUMN tenants.client_logos IS 'Array of client logo URLs for social proof section on assessment landing page. Format: [{"url": "https://...", "alt": "Company Name"}]';

-- Update the branding index to include client_logos
DROP INDEX IF EXISTS idx_tenants_subdomain_branding;
CREATE INDEX idx_tenants_subdomain_branding
ON tenants(subdomain)
INCLUDE (company_name, logo_url, brand_color, tagline, client_logos);
