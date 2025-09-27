import { NextApiRequest, NextApiResponse } from 'next';
import { validateAdminSession } from '@/lib/supabase-auth';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: any;
  session?: any;
}

export const requireAuth = (
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) => {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '') ||
                    req.cookies?.admin_session_token ||
                    null;

      if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const session = await validateAdminSession(token);

      if (!session) {
        return res.status(401).json({ error: 'Invalid or expired session' });
      }

      req.user = session.user;
      req.session = session;

      return handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ error: 'Authentication error' });
    }
  };
};

export const requireTenantAccess = (
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) => {
  return requireAuth(async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const tenantSubdomain = req.headers['x-tenant-subdomain'] as string;

    if (!tenantSubdomain) {
      return res.status(400).json({ error: 'Tenant subdomain required' });
    }

    if (req.session?.tenant_subdomain !== tenantSubdomain) {
      return res.status(403).json({ error: 'Access denied to this tenant' });
    }

    return handler(req, res);
  });
};