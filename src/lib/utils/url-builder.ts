/**
 * URL Builder Utilities
 * Constructs tenant-specific URLs that work across all environments
 */

import { getBaseUrl } from './environment';

/**
 * Get the full assessment URL for a tenant
 * @param subdomain - Tenant subdomain
 * @param req - Optional request object for server-side
 * @returns Full assessment URL
 *
 * Examples:
 * - Dev: http://localhost:3001/socialfinancelimited/assessment
 * - Prod: https://socialfinancelimited.deployai.studio/assessment
 */
export function getTenantAssessmentUrl(subdomain: string, req?: any): string {
  const baseUrl = getBaseUrl(req);

  // In production with custom domain
  if (baseUrl.includes('deployai.studio')) {
    return `https://${subdomain}.deployai.studio/assessment`;
  }

  // In local development or other environments
  return `${baseUrl}/${subdomain}/assessment`;
}

/**
 * Get the base URL for a tenant (without specific page)
 * @param subdomain - Tenant subdomain
 * @param req - Optional request object for server-side
 * @returns Base tenant URL
 *
 * Examples:
 * - Dev: http://localhost:3001/socialfinancelimited
 * - Prod: https://socialfinancelimited.deployai.studio
 */
export function getTenantBaseUrl(subdomain: string, req?: any): string {
  const baseUrl = getBaseUrl(req);

  // In production with custom domain
  if (baseUrl.includes('deployai.studio')) {
    return `https://${subdomain}.deployai.studio`;
  }

  // In local development - tenant routing via path
  return `${baseUrl}/${subdomain}`;
}

/**
 * Get the admin dashboard URL for a tenant
 * @param subdomain - Tenant subdomain
 * @param req - Optional request object for server-side
 * @returns Admin dashboard URL
 */
export function getTenantAdminUrl(subdomain: string, req?: any): string {
  return `${getTenantBaseUrl(subdomain, req)}/admin`;
}
