/**
 * Environment utilities for handling URLs and configuration
 */

/**
 * Get the base URL for the application
 * Handles local development, preview deployments, and production
 */
export function getBaseUrl(request?: { headers: { host?: string } }): string {
  // 1. In development, prioritize request host (handles any port 3000-3004)
  if (process.env.NODE_ENV !== 'production' && request?.headers?.host) {
    return `http://${request.headers.host}`;
  }

  // 2. Check for explicitly configured production URL
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // 3. Check for Vercel URL (preview deployments)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 4. Production with request host
  if (request?.headers?.host) {
    return `https://${request.headers.host}`;
  }

  // 5. Client-side: use window.location
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // 6. Fallback to localhost
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
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