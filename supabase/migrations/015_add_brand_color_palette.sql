-- Add support for multiple brand colors stored as JSONB
-- This allows tenants to define a full color palette instead of just one color

ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS brand_colors JSONB DEFAULT '{
  "primary": "#635BFF",
  "secondary": "#00D4FF",
  "accent": "#FFB800",
  "neutral": "#F6F9FC"
}'::jsonb;

COMMENT ON COLUMN tenants.brand_colors IS 'Brand color palette with primary, secondary, accent, and neutral colors';

-- Keep brand_color for backward compatibility, but it will be deprecated
-- The landing page will prefer brand_colors if set, fallback to brand_color
