/**
 * Environment utilities for handling URLs and configuration
 */

/**
 * Get the base URL for the application
 * Handles local development, preview deployments, and production
 */
export function getBaseUrl(request?: { headers: { host?: string } }): string {
  // 1. Check for explicitly configured production URL
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // 2. Check for Vercel URL (preview deployments)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 3. Check for request host header (server-side)
  if (request?.headers?.host) {
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    return `${protocol}://${request.headers.host}`;
  }

  // 4. Client-side: use window.location
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // 5. Fallback to localhost
  return 'http://localhost:3000';
}

/**
 * Get the API endpoint URL
 */
export function getApiUrl(path: string, request?: { headers: { host?: string } }): string {
  const baseUrl = getBaseUrl(request);
  return `${baseUrl}/api${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Check if we're in production environment
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Check if we're running on Vercel
 */
export function isVercel(): boolean {
  return !!process.env.VERCEL;
}

/**
 * Get the internal API key for server-to-server communication
 */
export function getInternalApiKey(): string {
  const key = process.env.INTERNAL_API_KEY;
  if (!key && isProduction()) {
    console.error('[ENVIRONMENT] Warning: INTERNAL_API_KEY not set in production');
  }
  return key || 'dev-key-12345';
}