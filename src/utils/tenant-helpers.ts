import { NextApiRequest } from 'next';
import { IncomingMessage } from 'http';
import { tenantService, TenantContext } from '@/services/tenant';

export async function getTenantFromRequest(req: NextApiRequest | IncomingMessage): Promise<TenantContext | null> {
  const subdomain = req.headers['x-tenant-subdomain'] as string | undefined;

  if (!subdomain) {
    return null;
  }

  // Handle both NextApiRequest and IncomingMessage types
  let userEmail: string | undefined;
  if ('body' in req && 'query' in req) {
    // NextApiRequest
    userEmail = req.body?.user_email || req.query?.user_email as string | undefined;
  } else {
    // IncomingMessage - no body/query available
    userEmail = undefined;
  }

  const context = await tenantService.getTenantContext(subdomain, userEmail);
  return context;
}

export function extractSubdomainFromHost(host: string): string | null {
  if (!host) return null;

  const cleanHost = host.replace(':3000', '').replace(':3001', '');

  const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'deployai.studio';
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const subdomain = cleanHost.replace(`.${baseDomain}`, '');
    if (subdomain && subdomain !== cleanHost && subdomain !== 'www') {
      return subdomain;
    }
  } else {
    const parts = cleanHost.split('.');
    if (parts.length > 1 && parts[0] !== 'www' && parts[0] !== 'localhost') {
      return parts[0];
    }
  }

  return null;
}

export async function requireTenantContext(
  req: NextApiRequest
): Promise<TenantContext> {
  const context = await getTenantFromRequest(req);

  if (!context) {
    throw new Error('Tenant context required');
  }

  if (!context.canUseAssessment) {
    throw new Error('Assessment limit reached');
  }

  return context;
}

export function addTenantIdToData<T extends Record<string, any>>(
  data: T,
  tenantId: string | undefined
): T {
  if (!tenantId) {
    return data;
  }

  return {
    ...data,
    tenant_id: tenantId,
  };
}