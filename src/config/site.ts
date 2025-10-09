/**
 * Site Configuration
 * Domain-agnostic configuration for multi-tenant deployment
 */

export const siteConfig = {
  // Domain configuration
  domain: process.env.NEXT_PUBLIC_DOMAIN || 'deployai.studio',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'DeployAI',

  // Contact information
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@deployai.studio',
  salesEmail: process.env.NEXT_PUBLIC_SALES_EMAIL || 'hello@deployai.studio',

  // Trial configuration
  trialDays: 14,
  trialAssessments: 5,

  // Social links
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL,
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
    github: process.env.NEXT_PUBLIC_GITHUB_URL,
  },
} as const;

/**
 * Get full tenant URL
 * @param subdomain - Tenant subdomain
 * @returns Full tenant URL
 */
export const getTenantUrl = (subdomain: string): string => {
  // Check if we're in development
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${process.env.PORT || 3000}/${subdomain}`;
  }

  return `https://${subdomain}.${siteConfig.domain}`;
};

/**
 * Get tenant admin URL
 * @param subdomain - Tenant subdomain
 * @returns Full admin URL
 */
export const getTenantAdminUrl = (subdomain: string): string => {
  return `${getTenantUrl(subdomain)}/admin`;
};

/**
 * Format subdomain preview
 * @param subdomain - Tenant subdomain
 * @returns Formatted subdomain preview text
 */
export const formatSubdomainPreview = (subdomain: string): string => {
  return `${subdomain || 'yourcompany'}.${siteConfig.domain}`;
};

/**
 * Validate subdomain format
 * @param subdomain - Subdomain to validate
 * @returns True if valid
 */
export const isValidSubdomain = (subdomain: string): boolean => {
  if (!subdomain || subdomain.length < 3) return false;
  if (!/^[a-z0-9]+$/.test(subdomain)) return false;

  // Reserved subdomains
  const reserved = ['www', 'app', 'api', 'admin', 'dashboard', 'portal', 'billing'];
  if (reserved.includes(subdomain.toLowerCase())) return false;

  return true;
};
